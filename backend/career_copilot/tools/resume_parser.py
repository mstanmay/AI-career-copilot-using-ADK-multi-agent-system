"""Resume parsing tool for ADK agents."""

import io
from pathlib import Path

from google.adk.tools import FunctionTool
from pypdf import PdfReader


def parse_resume(file_path: str) -> dict:
    """Extract text content from a resume PDF file.

    Args:
        file_path: Path to the resume PDF file.

    Returns:
        Dictionary with extracted text and metadata.
    """
    path = Path(file_path)
    if not path.exists():
        return {"error": f"File not found: {file_path}", "text": ""}

    if path.suffix.lower() == ".pdf":
        reader = PdfReader(str(path))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
    elif path.suffix.lower() in (".txt", ".md"):
        text = path.read_text(encoding="utf-8", errors="ignore")
    else:
        return {"error": f"Unsupported format: {path.suffix}", "text": ""}

    return {
        "text": text.strip(),
        "filename": path.name,
        "char_count": len(text),
        "success": True,
    }


def parse_resume_bytes(content: bytes, filename: str = "resume.pdf") -> dict:
    """Extract text from resume bytes (for API uploads)."""
    if filename.lower().endswith(".pdf"):
        reader = PdfReader(io.BytesIO(content))
        text = "\n".join(page.extract_text() or "" for page in reader.pages)
    else:
        text = content.decode("utf-8", errors="ignore")

    return {
        "text": text.strip(),
        "filename": filename,
        "char_count": len(text),
        "success": True,
    }


parse_resume_tool = FunctionTool(func=parse_resume)
