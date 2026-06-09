from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt
from career_copilot.agents.job_match_agent import job_match_agent
from career_copilot.tools import github_analyzer_tool, parse_resume_tool
from career_copilot.workflows.career_pipeline import career_pipeline


def create_coordinator() -> LlmAgent:
    return LlmAgent(
        name="coordinator",
        model="gemini-2.5-flash",
        description="AI Career Copilot coordinator — routes requests to specialized career agents.",
        instruction=load_prompt("coordinator"),
        sub_agents=[career_pipeline, job_match_agent],
        tools=[parse_resume_tool, github_analyzer_tool],
    )
