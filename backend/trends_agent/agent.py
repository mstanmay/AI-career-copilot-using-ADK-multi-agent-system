"""Google Trends Agent — ADK Codelab prerequisite.

Deploy with: adk web backend/trends_agent
Or: adk run backend/trends_agent

Interact in BigQuery Data Agent UI to query trends data,
verify output table and chart, then capture screenshot.
"""

import os

import google.auth
from dotenv import load_dotenv
from google.adk.agents import Agent
from google.adk.tools.bigquery import BigQueryCredentialsConfig, BigQueryToolset
from google.adk.tools.bigquery.config import BigQueryToolConfig, WriteMode

load_dotenv()

PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "your-project-id")
DATASET = os.getenv("BQ_DATASET", "google_trends")
TABLE = os.getenv("BQ_TABLE", "trends_data")

application_default_credentials, _ = google.auth.default()
credentials_config = BigQueryCredentialsConfig(
    credentials=application_default_credentials
)

tool_config = BigQueryToolConfig(
    write_mode=WriteMode.ALLOWED,
    application_name="google_trends_agent",
    max_query_result_rows=100,
)

bigquery_toolset = BigQueryToolset(
    credentials_config=credentials_config,
    bigquery_tool_config=tool_config,
)

TRENDS_INSTRUCTION = f"""You are a Google Trends data analyst agent with access to BigQuery tools.

Your role:
1. Help users explore Google Trends data stored in BigQuery
2. Write and execute SQL queries to analyze search trend patterns
3. Present results clearly with insights about rising/falling trends

Data location:
- Project: {PROJECT_ID}
- Dataset: {DATASET}
- Primary table: {TABLE}

When a user asks about trends:
1. First inspect the table schema using get_table_info
2. Write appropriate SQL queries using execute_sql
3. Summarize findings with key insights
4. Suggest visualizations when relevant (time series, comparisons)

Example queries users may ask:
- "What are the top trending search terms this month?"
- "Show me the trend for 'artificial intelligence' over the past year"
- "Compare search interest for Python vs JavaScript"

Always confirm ambiguous time ranges or regions with the user.
"""

root_agent = Agent(
    model="gemini-2.5-flash",
    name="google_trends_agent",
    description=(
        "Agent that analyzes Google Trends data in BigQuery. "
        "Executes SQL queries and provides trend insights."
    ),
    instruction=TRENDS_INSTRUCTION,
    tools=[bigquery_toolset],
)
