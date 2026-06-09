"""ADK entry point — root_agent for career copilot."""

from dotenv import load_dotenv

from career_copilot.agents.coordinator import create_coordinator

load_dotenv()

root_agent = create_coordinator()
