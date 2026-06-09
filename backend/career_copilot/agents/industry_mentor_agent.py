from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt

industry_mentor_agent = LlmAgent(
    name="industry_mentor_agent",
    model="gemini-2.5-flash",
    description="Senior industry mentor providing insider career guidance and hiring manager perspective.",
    instruction=load_prompt("industry_mentor"),
    output_key="mentor_advice",
)
