"""Interview question generation and answer evaluation tools."""

from google.adk.tools import FunctionTool

QUESTION_BANK: dict[str, list[dict]] = {
    "Data Scientist": [
        {"question": "Explain the bias-variance tradeoff.", "category": "technical", "difficulty": "medium"},
        {"question": "How would you handle missing data in a dataset?", "category": "technical", "difficulty": "easy"},
        {"question": "Describe a data science project you are proud of.", "category": "behavioral", "difficulty": "medium"},
        {"question": "What is overfitting and how do you prevent it?", "category": "technical", "difficulty": "medium"},
        {"question": "Explain how a random forest works.", "category": "technical", "difficulty": "hard"},
    ],
    "Software Engineer": [
        {"question": "Explain the difference between REST and GraphQL.", "category": "technical", "difficulty": "medium"},
        {"question": "How do you approach debugging a production issue?", "category": "behavioral", "difficulty": "medium"},
        {"question": "What is the time complexity of binary search?", "category": "technical", "difficulty": "easy"},
    ],
    "default": [
        {"question": "Tell me about yourself and your career goals.", "category": "behavioral", "difficulty": "easy"},
        {"question": "Why do you want this role?", "category": "behavioral", "difficulty": "easy"},
        {"question": "Describe a challenge you overcame.", "category": "behavioral", "difficulty": "medium"},
    ],
}


def generate_interview_question(target_role: str = "Data Scientist", difficulty: str = "medium") -> dict:
    """Generate an interview question for a target role.

    Args:
        target_role: Career role for the interview.
        difficulty: easy, medium, or hard.

    Returns:
        Interview question with category and hints.
    """
    questions = QUESTION_BANK.get(target_role, QUESTION_BANK["default"])
    filtered = [q for q in questions if q["difficulty"] == difficulty] or questions
    import random
    q = random.choice(filtered)
    return {
        "question": q["question"],
        "category": q["category"],
        "difficulty": q["difficulty"],
        "target_role": target_role,
        "hints": ["Structure your answer with context, action, and result (STAR method)"],
    }


def evaluate_answer(question: str, answer: str, target_role: str = "Data Scientist") -> dict:
    """Evaluate an interview answer and provide feedback.

    Args:
        question: The interview question asked.
        answer: The user's answer text.
        target_role: Career role context.

    Returns:
        Score, strengths, improvements, and model answer guidance.
    """
    word_count = len(answer.split())
    has_examples = any(w in answer.lower() for w in ["example", "project", "experience", "built", "implemented"])
    has_structure = any(w in answer.lower() for w in ["first", "then", "because", "therefore", "result"])

    score = 40
    if word_count >= 50:
        score += 20
    if word_count >= 100:
        score += 10
    if has_examples:
        score += 15
    if has_structure:
        score += 15
    score = min(score, 100)

    strengths = []
    improvements = []
    if word_count >= 50:
        strengths.append("Good answer length — thorough response")
    else:
        improvements.append("Expand your answer with more detail (aim for 50+ words)")

    if has_examples:
        strengths.append("Included concrete examples")
    else:
        improvements.append("Add a specific example from your experience")

    if has_structure:
        strengths.append("Well-structured response")
    else:
        improvements.append("Use a clear structure (e.g., STAR method)")

    return {
        "score": score,
        "strengths": strengths or ["Attempted the question"],
        "improvements": improvements or ["Keep practicing — you're on the right track"],
        "model_answer": f"For '{question}', provide context, your approach, specific actions taken, and measurable results relevant to a {target_role} role.",
        "word_count": word_count,
    }


generate_interview_question_tool = FunctionTool(func=generate_interview_question)
evaluate_answer_tool = FunctionTool(func=evaluate_answer)
