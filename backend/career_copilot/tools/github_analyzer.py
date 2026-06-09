"""GitHub profile analysis tool."""

import os

import httpx
from google.adk.tools import FunctionTool


def analyze_github_profile(username: str) -> dict:
    """Analyze a GitHub profile to infer technical skills.

    Args:
        username: GitHub username to analyze.

    Returns:
        Profile data with inferred skills from repositories.
    """
    token = os.getenv("GITHUB_TOKEN", "")
    headers = {"Accept": "application/vnd.github+json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"

    base_url = "https://api.github.com"

    try:
        with httpx.Client(timeout=15.0) as client:
            user_resp = client.get(f"{base_url}/users/{username}", headers=headers)
            if user_resp.status_code == 404:
                return {"error": f"User '{username}' not found", "success": False}
            user_resp.raise_for_status()
            user = user_resp.json()

            repos_resp = client.get(
                f"{base_url}/users/{username}/repos",
                headers=headers,
                params={"sort": "updated", "per_page": 30},
            )
            repos_resp.raise_for_status()
            repos = repos_resp.json()
    except httpx.HTTPError as e:
        return {"error": str(e), "success": False}

    languages: dict[str, int] = {}
    topics: set[str] = set()

    for repo in repos:
        lang = repo.get("language")
        if lang:
            languages[lang] = languages.get(lang, 0) + 1
        for topic in repo.get("topics", []):
            topics.add(topic)

    sorted_langs = sorted(languages.items(), key=lambda x: x[1], reverse=True)
    inferred_skills = [lang for lang, _ in sorted_langs[:10]]
    inferred_skills.extend(list(topics)[:10])

    return {
        "success": True,
        "username": username,
        "name": user.get("name", ""),
        "bio": user.get("bio", ""),
        "public_repos": user.get("public_repos", 0),
        "followers": user.get("followers", 0),
        "languages": dict(sorted_langs),
        "topics": list(topics),
        "inferred_skills": list(dict.fromkeys(inferred_skills)),
        "top_repos": [
            {"name": r["name"], "language": r.get("language"), "stars": r.get("stargazers_count", 0)}
            for r in repos[:5]
        ],
    }


github_analyzer_tool = FunctionTool(func=analyze_github_profile)
