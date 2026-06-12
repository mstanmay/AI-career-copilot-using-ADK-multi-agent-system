"use client";

import { useCallback, useEffect } from "react";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Background,
  MarkerType,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Bot, FileText, Target, Map, Mic, Briefcase } from "lucide-react";

// Custom Node Component to look premium
function AgentNode({ data }: { data: any }) {
  return (
    <div className="glass-card px-4 py-2 flex items-center gap-3 min-w-[180px] hover:border-[var(--accent-blue)] transition-colors">
      <Handle type="target" position={Position.Top} className="!bg-[var(--accent-blue)]" />
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${data.color}20` }}
      >
        <data.icon size={16} style={{ color: data.color }} />
      </div>
      <div>
        <div className="text-xs font-semibold text-white">{data.label}</div>
        <div className="text-[10px] text-[var(--text-muted)]">{data.status}</div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[var(--accent-blue)]" />
    </div>
  );
}

const nodeTypes = {
  agentNode: AgentNode,
};

const initialNodes = [
  {
    id: "coordinator",
    type: "agentNode",
    position: { x: 250, y: 0 },
    data: {
      label: "Coordinator Agent",
      status: "Orchestrating flow",
      icon: Bot,
      color: "var(--accent-blue)",
    },
  },
  {
    id: "resume",
    type: "agentNode",
    position: { x: 50, y: 120 },
    data: {
      label: "Resume Agent",
      status: "Waiting...",
      icon: FileText,
      color: "var(--success)",
    },
  },
  {
    id: "skills",
    type: "agentNode",
    position: { x: 250, y: 120 },
    data: {
      label: "Skill Gap Agent",
      status: "Waiting...",
      icon: Target,
      color: "var(--accent-purple)",
    },
  },
  {
    id: "roadmap",
    type: "agentNode",
    position: { x: 450, y: 120 },
    data: {
      label: "Roadmap Agent",
      status: "Waiting...",
      icon: Map,
      color: "var(--warning)",
    },
  },
  {
    id: "interview",
    type: "agentNode",
    position: { x: 150, y: 240 },
    data: {
      label: "Interview Agent",
      status: "Waiting...",
      icon: Mic,
      color: "var(--error)",
    },
  },
  {
    id: "jobs",
    type: "agentNode",
    position: { x: 350, y: 240 },
    data: {
      label: "Job Match Agent",
      status: "Waiting...",
      icon: Briefcase,
      color: "var(--success)",
    },
  },
];

const initialEdges = [
  {
    id: "e-coord-resume",
    source: "coordinator",
    target: "resume",
    animated: true,
    style: { stroke: "var(--accent-blue)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent-blue)" },
  },
  {
    id: "e-coord-skills",
    source: "coordinator",
    target: "skills",
    animated: true,
    style: { stroke: "var(--accent-blue)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent-blue)" },
  },
  {
    id: "e-coord-roadmap",
    source: "coordinator",
    target: "roadmap",
    animated: true,
    style: { stroke: "var(--accent-blue)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--accent-blue)" },
  },
  {
    id: "e-skills-interview",
    source: "skills",
    target: "interview",
    animated: true,
    style: { stroke: "var(--border-hover)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border-hover)" },
  },
  {
    id: "e-skills-jobs",
    source: "skills",
    target: "jobs",
    animated: true,
    style: { stroke: "var(--border-hover)", strokeWidth: 2 },
    markerEnd: { type: MarkerType.ArrowClosed, color: "var(--border-hover)" },
  },
];

export function AgentFlowGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Optional: Listen to actual agent events from zustand to update node status dynamically
  
  return (
    <div className="w-full h-80 rounded-xl overflow-hidden glass-card relative bg-[var(--bg-primary)]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="var(--border-hover)" gap={16} size={1} />
      </ReactFlow>
      
      {/* Decorative gradient */}
      <div className="absolute inset-0 pointer-events-none rounded-xl" style={{ boxShadow: "inset 0 0 40px var(--bg-surface)" }} />
    </div>
  );
}
