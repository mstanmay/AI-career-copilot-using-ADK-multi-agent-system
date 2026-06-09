from google.adk.agents import SequentialAgent

from career_copilot.agents.industry_mentor_agent import industry_mentor_agent
from career_copilot.agents.interview_coach_agent import interview_coach_agent
from career_copilot.agents.portfolio_agent import portfolio_agent
from career_copilot.agents.project_agent import project_agent
from career_copilot.agents.resume_agent import resume_agent
from career_copilot.agents.roadmap_agent import roadmap_agent
from career_copilot.agents.skill_gap_agent import skill_gap_agent

career_pipeline = SequentialAgent(
    name="career_pipeline",
    description=(
        "Sequential pipeline: Resume → Skill Gap → Roadmap → Projects → Interview → Portfolio → Mentor"
    ),
    sub_agents=[
        resume_agent,
        skill_gap_agent,
        roadmap_agent,
        project_agent,
        interview_coach_agent,
        portfolio_agent,
        industry_mentor_agent,
    ],
)
