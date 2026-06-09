from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt

portfolio_agent = LlmAgent(
    name="portfolio_agent",
    model="gemini-2.5-flash",
    description="Generates portfolio projects, GitHub roadmap, and website structure.",
    instruction=load_prompt("portfolio"),
    output_key="portfolio_plan",
)
