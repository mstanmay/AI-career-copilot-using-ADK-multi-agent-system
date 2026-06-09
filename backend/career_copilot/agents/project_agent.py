from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt

project_agent = LlmAgent(
    name="project_agent",
    model="gemini-2.5-flash",
    description="Recommends portfolio projects that address skill gaps and impress hiring managers.",
    instruction=load_prompt("project"),
    output_key="project_recommendations",
)
