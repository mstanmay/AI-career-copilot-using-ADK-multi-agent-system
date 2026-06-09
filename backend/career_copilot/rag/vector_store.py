"""RAG layer — ChromaDB vector store for resume and career documents."""

import hashlib
import os
from pathlib import Path

CHROMA_DIR = Path(__file__).parent.parent.parent / "data" / "chroma"
CHROMA_DIR.mkdir(parents=True, exist_ok=True)

_collection = None
_fallback_docs: dict[str, list[dict]] = {}


def _get_collection():
    global _collection
    if _collection is not None:
        return _collection
    try:
        import chromadb
        client = chromadb.PersistentClient(path=str(CHROMA_DIR))
        _collection = client.get_or_create_collection(
            name="career_documents",
            metadata={"hnsw:space": "cosine"},
        )
        return _collection
    except Exception:
        return None


def _simple_embed(text: str) -> list[float]:
    """Lightweight hash-based embedding fallback when no embedding API."""
    words = text.lower().split()
    vec = [0.0] * 128
    for w in words:
        h = int(hashlib.md5(w.encode()).hexdigest(), 16)
        vec[h % 128] += 1.0
    norm = sum(v * v for v in vec) ** 0.5 or 1.0
    return [v / norm for v in vec]


def _cosine(a: list[float], b: list[float]) -> float:
    return sum(x * y for x, y in zip(a, b))


def index_document(doc_id: str, text: str, metadata: dict | None = None) -> bool:
    """Index a document (resume, notes, job description)."""
    collection = _get_collection()
    meta = metadata or {}
    meta["doc_id"] = doc_id

    if collection:
        try:
            collection.upsert(
                ids=[doc_id],
                documents=[text[:8000]],
                metadatas=[meta],
            )
            return True
        except Exception:
            pass

    _fallback_docs.setdefault("default", []).append({
        "id": doc_id,
        "text": text,
        "metadata": meta,
        "embedding": _simple_embed(text),
    })
    return True


def search_documents(query: str, n_results: int = 5) -> list[dict]:
    """Search indexed documents by semantic similarity."""
    collection = _get_collection()

    if collection:
        try:
            count = collection.count()
            if count > 0:
                results = collection.query(query_texts=[query], n_results=min(n_results, count))
                docs = []
                for i, doc_id in enumerate(results["ids"][0]):
                    docs.append({
                        "id": doc_id,
                        "text": results["documents"][0][i],
                        "metadata": results["metadatas"][0][i] if results["metadatas"] else {},
                        "distance": results["distances"][0][i] if results.get("distances") else 0,
                    })
                return docs
        except Exception:
            pass

    query_emb = _simple_embed(query)
    docs = _fallback_docs.get("default", [])
    scored = sorted(
        docs,
        key=lambda d: _cosine(query_emb, d["embedding"]),
        reverse=True,
    )
    return [
        {"id": d["id"], "text": d["text"][:500], "metadata": d["metadata"], "distance": 0}
        for d in scored[:n_results]
    ]


def search_career_context(query: str) -> str:
    """Return RAG context string for agent prompts."""
    results = search_documents(query, n_results=3)
    if not results:
        return ""
    parts = ["Relevant documents from knowledge base:"]
    for r in results:
        doc_type = r.get("metadata", {}).get("type", "document")
        parts.append(f"[{doc_type}] {r['text'][:400]}")
    return "\n".join(parts)
