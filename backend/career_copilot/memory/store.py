"""Memory layer — persists chats, goals, skills, and career interests per user."""

import json
import os
from datetime import datetime
from pathlib import Path
from typing import Any

MEMORY_DIR = Path(__file__).parent.parent.parent / "data" / "memory"
MEMORY_DIR.mkdir(parents=True, exist_ok=True)


class MemoryStore:
    """In-memory + file-backed store. Swap for Redis/MongoDB in production."""

    def __init__(self):
        self._cache: dict[str, dict] = {}
        self._redis_url = os.getenv("REDIS_URL")

    def _key(self, user_id: str) -> str:
        return f"user:{user_id}"

    def _load(self, user_id: str) -> dict:
        if user_id in self._cache:
            return self._cache[user_id]
        path = MEMORY_DIR / f"{user_id}.json"
        if path.exists():
            data = json.loads(path.read_text(encoding="utf-8"))
            self._cache[user_id] = data
            return data
        data = {
            "user_id": user_id,
            "chats": [],
            "goals": [],
            "skills": [],
            "career_interests": [],
            "profile": {},
            "created_at": datetime.utcnow().isoformat(),
        }
        self._cache[user_id] = data
        return data

    def _save(self, user_id: str) -> None:
        data = self._cache.get(user_id)
        if not data:
            return
        path = MEMORY_DIR / f"{user_id}.json"
        path.write_text(json.dumps(data, indent=2), encoding="utf-8")

    def add_chat(self, user_id: str, role: str, content: str) -> None:
        data = self._load(user_id)
        data["chats"].append({
            "role": role,
            "content": content,
            "timestamp": datetime.utcnow().isoformat(),
        })
        data["chats"] = data["chats"][-50:]
        self._save(user_id)

    def set_goal(self, user_id: str, goal: str) -> None:
        data = self._load(user_id)
        if goal not in data["goals"]:
            data["goals"].append(goal)
        self._save(user_id)

    def set_skills(self, user_id: str, skills: list[str]) -> None:
        data = self._load(user_id)
        data["skills"] = list(set(data["skills"] + skills))
        self._save(user_id)

    def add_interest(self, user_id: str, interest: str) -> None:
        data = self._load(user_id)
        if interest not in data["career_interests"]:
            data["career_interests"].append(interest)
        self._save(user_id)

    def update_profile(self, user_id: str, profile: dict[str, Any]) -> None:
        data = self._load(user_id)
        data["profile"].update(profile)
        self._save(user_id)

    def get_context(self, user_id: str) -> dict:
        return self._load(user_id)

    def get_context_prompt(self, user_id: str) -> str:
        data = self._load(user_id)
        parts = []
        if data.get("goals"):
            parts.append(f"Career goals: {', '.join(data['goals'])}")
        if data.get("skills"):
            parts.append(f"Known skills: {', '.join(data['skills'])}")
        if data.get("career_interests"):
            parts.append(f"Interests: {', '.join(data['career_interests'])}")
        profile = data.get("profile", {})
        if profile.get("target_role"):
            parts.append(f"Target role: {profile['target_role']}")
        if profile.get("learning_speed"):
            parts.append(f"Learning pace: {profile['learning_speed']}")
        if profile.get("preferred_industry"):
            parts.append(f"Industry: {profile['preferred_industry']}")
        recent = data.get("chats", [])[-5:]
        if recent:
            parts.append("Recent conversation:")
            for c in recent:
                parts.append(f"  {c['role']}: {c['content'][:200]}")
        return "\n".join(parts) if parts else ""


memory_store = MemoryStore()
