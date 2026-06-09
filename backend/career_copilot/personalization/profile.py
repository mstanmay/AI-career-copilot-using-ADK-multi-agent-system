"""User personalization engine — adapts agent behavior per user."""

from typing import Any

from career_copilot.memory.store import memory_store

LEARNING_SPEED_MULTIPLIERS = {
    "fast": 0.7,
    "normal": 1.0,
    "thorough": 1.4,
}


class PersonalizationEngine:
    def get_profile(self, user_id: str) -> dict[str, Any]:
        ctx = memory_store.get_context(user_id)
        return ctx.get("profile", {})

    def update(self, user_id: str, **kwargs) -> dict:
        memory_store.update_profile(user_id, kwargs)
        if kwargs.get("target_role"):
            memory_store.set_goal(user_id, kwargs["target_role"])
        if kwargs.get("skills"):
            memory_store.set_skills(user_id, kwargs["skills"])
        return self.get_profile(user_id)

    def get_roadmap_duration(self, user_id: str, base_months: int = 6) -> int:
        profile = self.get_profile(user_id)
        speed = profile.get("learning_speed", "normal")
        mult = LEARNING_SPEED_MULTIPLIERS.get(speed, 1.0)
        return max(3, int(base_months * mult))

    def get_personalization_prompt(self, user_id: str) -> str:
        profile = self.get_profile(user_id)
        parts = ["User personalization context:"]
        if profile.get("target_role"):
            parts.append(f"- Career goal: {profile['target_role']}")
        if profile.get("current_skills"):
            parts.append(f"- Current skills: {', '.join(profile['current_skills'])}")
        if profile.get("preferred_industry"):
            parts.append(f"- Preferred industry: {profile['preferred_industry']}")
        if profile.get("learning_speed"):
            parts.append(f"- Learning speed: {profile['learning_speed']}")
            duration = self.get_roadmap_duration(user_id)
            parts.append(f"- Adjust roadmap to ~{duration} months")
        if profile.get("experience_level"):
            parts.append(f"- Experience: {profile['experience_level']}")
        return "\n".join(parts) if len(parts) > 1 else ""


personalization = PersonalizationEngine()
