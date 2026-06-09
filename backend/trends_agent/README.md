# Google Trends Agent (ADK Codelab Prerequisite)

This agent satisfies the ADK Codelab challenge requirement.

## Setup

1. Copy `.env.example` values to `backend/trends_agent/.env`
2. Enable BigQuery API in your GCP project
3. Set up Application Default Credentials: `gcloud auth application-default login`
4. Install dependencies: `pip install -r ../requirements.txt`

## Run Locally

```bash
# From backend/ directory
adk web trends_agent
# Or CLI mode
adk run trends_agent
```

## BigQuery Data Agent UI

1. Deploy to Vertex AI Agent Engine or use `adk web`
2. Open BigQuery Data Agent UI in Google Cloud Console
3. Connect to this agent
4. Run the required query (e.g., "Show top trending search terms")
5. Verify output table and chart
6. Capture screenshot with all required elements visible

## Deploy

```bash
adk deploy agent_engine \
  --project=$GOOGLE_CLOUD_PROJECT \
  --region=us-central1 \
  --staging_bucket=gs://your-bucket \
  trends_agent
```
