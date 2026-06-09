"""Job matching tool — returns curated role recommendations."""

from google.adk.tools import FunctionTool

JOB_DATABASE = {
    "Data Scientist": [
        {
            "title": "Junior Data Scientist",
            "company": "DataFlow Inc",
            "match_percent": 82,
            "required_skills": ["Python", "SQL", "Machine Learning", "Statistics"],
            "location": "Remote",
            "apply_url": "https://example.com/jobs/junior-ds",
        },
        {
            "title": "ML Engineer",
            "company": "AI Labs",
            "match_percent": 71,
            "required_skills": ["Python", "TensorFlow", "MLOps", "Docker"],
            "location": "San Francisco, CA",
            "apply_url": "https://example.com/jobs/ml-engineer",
        },
        {
            "title": "Analytics Engineer",
            "company": "MetricsCo",
            "match_percent": 88,
            "required_skills": ["SQL", "Python", "dbt", "BigQuery"],
            "location": "New York, NY",
            "apply_url": "https://example.com/jobs/analytics-engineer",
        },
    ],
    "Software Engineer": [
        {
            "title": "Full Stack Developer",
            "company": "WebScale",
            "match_percent": 85,
            "required_skills": ["JavaScript", "React", "Node.js", "TypeScript"],
            "location": "Remote",
            "apply_url": "https://example.com/jobs/fullstack",
        },
        {
            "title": "Backend Engineer",
            "company": "CloudNative",
            "match_percent": 79,
            "required_skills": ["Python", "Go", "Kubernetes", "PostgreSQL"],
            "location": "Austin, TX",
            "apply_url": "https://example.com/jobs/backend",
        },
    ],
    "Product Manager": [
        {
            "title": "Associate Product Manager",
            "company": "ProductFirst",
            "match_percent": 76,
            "required_skills": ["Roadmapping", "User Research", "SQL", "Agile"],
            "location": "Remote",
            "apply_url": "https://example.com/jobs/apm",
        },
    ],
}


def fetch_job_listings(target_role: str, skills: list[str] | None = None) -> dict:
    """Fetch job listings matching a target role and skills.

    Args:
        target_role: The career role to match (e.g., Data Scientist).
        skills: Optional list of user's current skills for match scoring.

    Returns:
        Job listings with match percentages.
    """
    listings = JOB_DATABASE.get(target_role, [])
    if not listings:
        for role, jobs in JOB_DATABASE.items():
            if target_role.lower() in role.lower() or role.lower() in target_role.lower():
                listings = jobs
                break

    if not listings:
        listings = JOB_DATABASE["Data Scientist"]

    user_skills = set(s.lower() for s in (skills or []))
    enriched = []
    for job in listings:
        required = job["required_skills"]
        matched = [s for s in required if s.lower() in user_skills]
        missing = [s for s in required if s.lower() not in user_skills]
        match_pct = job["match_percent"]
        if user_skills:
            skill_match = len(matched) / max(len(required), 1) * 100
            match_pct = int((match_pct + skill_match) / 2)

        enriched.append({
            **job,
            "matched_skills": matched,
            "missing_skills": missing,
            "match_percent": match_pct,
        })

    enriched.sort(key=lambda x: x["match_percent"], reverse=True)
    return {"target_role": target_role, "matches": enriched, "total": len(enriched)}


fetch_job_listings_tool = FunctionTool(func=fetch_job_listings)
