from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt
from career_copilot.tools import fetch_job_listings_tool

job_match_agent = LlmAgent(
    name="job_match_agent",
    model="gemini-2.5-flash",
    description="Finds job roles matching the user's profile, skills, and career goals.",
    instruction=load_prompt("job_match"),
    tools=[fetch_job_listings_tool],
    output_key="job_matches",
)
