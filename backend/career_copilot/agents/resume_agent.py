from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt
from career_copilot.tools import parse_resume_tool

resume_agent = LlmAgent(
    name="resume_agent",
    model="gemini-2.5-flash",
    description="Analyzes resumes: scores, strengths, weaknesses, missing keywords, and suggestions.",
    instruction=load_prompt("resume"),
    tools=[parse_resume_tool],
    output_key="resume_analysis",
)
