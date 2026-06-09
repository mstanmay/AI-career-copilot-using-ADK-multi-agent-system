# AI Career Copilot

A multi-agent career guidance system built with **Google ADK** and **Next.js 15**. Specialized AI agents collaborate to analyze resumes, identify skill gaps, build learning roadmaps, recommend projects, coach interviews, and match jobs.

## Architecture

```
Coordinator Agent
       ↓
Resume Agent → Skill Gap Agent → Roadmap Agent → Project Agent → Interview Coach
       ↓
Job Match Agent (parallel)
```

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | Next.js 15, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Recharts, Zustand |
| Backend | Google ADK, Gemini 2.5 Flash, FastAPI, SSE streaming |
| Tools | Resume PDF parser, GitHub API, job matching, interview Q&A |

## Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- Google Gemini API key ([get one here](https://aistudio.google.com/apikey))

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
cp ../.env.example career_copilot/.env
# Edit career_copilot/.env and set GOOGLE_API_KEY

uvicorn api.server:app --reload --port 8000
```

### 2. Frontend

```bash
cd frontend
npm install
cp ../.env.example .env.local
# Set NEXT_PUBLIC_API_URL=http://localhost:8000

npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. ADK Dev UI (optional)

```bash
cd backend
adk web career_copilot
```

### 4. Trends Agent (Codelab Prerequisite)

```bash
cd backend
adk web trends_agent
```

See [backend/trends_agent/README.md](backend/trends_agent/README.md) for BigQuery setup.

## Project Structure

```
├── frontend/          # Next.js 15 app
├── backend/
│   ├── career_copilot/   # Main ADK multi-agent system
│   ├── trends_agent/     # ADK codelab prerequisite
│   └── api/              # FastAPI bridge
├── shared/schemas/    # FE/BE type contracts
└── docker-compose.yml
```

## Demo Flow

1. Open the dashboard
2. Type: "I want to become a Data Scientist"
3. Watch agents collaborate in the sidebar (Resume → Skill Gap → Roadmap → Projects → Interview)
4. Upload a resume on `/resume`
5. View skill radar chart on `/skills`
6. Explore roadmap timeline on `/roadmap`
7. Practice interviews on `/interview` (with voice support)
8. Browse job matches on `/jobs`

## Environment Variables

See [.env.example](.env.example) for all configuration options.

## License

MIT
