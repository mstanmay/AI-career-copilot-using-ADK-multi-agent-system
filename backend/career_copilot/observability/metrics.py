"""Agent observability — traces, latency, tokens, success rates."""

import time
from datetime import datetime
from typing import Any


class AgentMetrics:
    def __init__(self):
        self.traces: list[dict] = []
        self.agent_stats: dict[str, dict] = {}

    def start_trace(self, session_id: str, agent: str, task: str = "") -> str:
        trace_id = f"{session_id}:{agent}:{int(time.time() * 1000)}"
        entry = {
            "trace_id": trace_id,
            "session_id": session_id,
            "agent": agent,
            "task": task,
            "status": "started",
            "started_at": datetime.utcnow().isoformat(),
            "finished_at": None,
            "duration_ms": 0,
            "tokens_used": 0,
            "error": None,
        }
        self.traces.append(entry)
        if len(self.traces) > 200:
            self.traces = self.traces[-200:]
        return trace_id

    def complete_trace(self, trace_id: str, tokens: int = 0, error: str | None = None) -> None:
        for t in reversed(self.traces):
            if t["trace_id"] == trace_id:
                t["status"] = "failed" if error else "completed"
                t["finished_at"] = datetime.utcnow().isoformat()
                t["tokens_used"] = tokens
                t["error"] = error
                started = datetime.fromisoformat(t["started_at"])
                finished = datetime.fromisoformat(t["finished_at"])
                t["duration_ms"] = int((finished - started).total_seconds() * 1000)

                agent = t["agent"]
                if agent not in self.agent_stats:
                    self.agent_stats[agent] = {
                        "total_runs": 0,
                        "successes": 0,
                        "failures": 0,
                        "total_tokens": 0,
                        "total_duration_ms": 0,
                        "avg_latency_ms": 0,
                    }
                stats = self.agent_stats[agent]
                stats["total_runs"] += 1
                if error:
                    stats["failures"] += 1
                else:
                    stats["successes"] += 1
                stats["total_tokens"] += tokens
                stats["total_duration_ms"] += t["duration_ms"]
                stats["avg_latency_ms"] = stats["total_duration_ms"] // max(stats["total_runs"], 1)
                break

    def get_timeline(self, session_id: str | None = None) -> list[dict]:
        traces = self.traces
        if session_id:
            traces = [t for t in traces if t["session_id"] == session_id]
        return sorted(traces, key=lambda t: t["started_at"])

    def get_dashboard(self) -> dict[str, Any]:
        total = len(self.traces)
        completed = sum(1 for t in self.traces if t["status"] == "completed")
        failed = sum(1 for t in self.traces if t["status"] == "failed")
        total_tokens = sum(t["tokens_used"] for t in self.traces)
        avg_latency = 0
        if completed:
            durations = [t["duration_ms"] for t in self.traces if t["status"] == "completed"]
            avg_latency = sum(durations) // len(durations)

        return {
            "total_traces": total,
            "success_rate": round(completed / max(total, 1) * 100, 1),
            "failure_rate": round(failed / max(total, 1) * 100, 1),
            "total_tokens": total_tokens,
            "avg_latency_ms": avg_latency,
            "agent_stats": self.agent_stats,
            "recent_traces": self.traces[-20:],
        }


metrics = AgentMetrics()
