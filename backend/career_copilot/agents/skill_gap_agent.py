from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt
from career_copilot.tools import github_analyzer_tool

skill_gap_agent = LlmAgent(
    name="skill_gap_agent",
    model="gemini-2.5-flash",
    description="Compares current skills against target role requirements. Identifies gaps and priorities.",
    instruction=load_prompt("skill_gap"),
    tools=[github_analyzer_tool],
    output_key="skill_gaps",
)
