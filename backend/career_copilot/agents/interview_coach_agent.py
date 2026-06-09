from google.adk.agents import LlmAgent

from career_copilot.agents._utils import load_prompt
from career_copilot.tools import evaluate_answer_tool, generate_interview_question_tool

interview_coach_agent = LlmAgent(
    name="interview_coach_agent",
    model="gemini-2.5-flash",
    description="Generates interview questions and evaluates answers with scores and feedback.",
    instruction=load_prompt("interview"),
    tools=[generate_interview_question_tool, evaluate_answer_tool],
    output_key="interview_feedback",
)
