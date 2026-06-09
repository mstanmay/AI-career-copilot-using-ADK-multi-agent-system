from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt

roadmap_agent = LlmAgent(
    name="roadmap_agent",
    model="gemini-2.5-flash",
    description="Creates month-by-month learning roadmaps tailored to skill gaps and target role.",
    instruction=load_prompt("roadmap"),
    output_key="career_roadmap",
)
