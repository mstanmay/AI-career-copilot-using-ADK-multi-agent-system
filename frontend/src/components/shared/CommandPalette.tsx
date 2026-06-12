"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Bot,
  FileText,
  Target,
  Map,
  Mic,
  Briefcase,
  Shield,
  LayoutDashboard,
} from "lucide-react";
import "./CommandPalette.css";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
      className="cmdk-dialog"
    >
      <div className="cmdk-input-wrapper">
        <Search size={18} className="cmdk-search-icon" />
        <Command.Input placeholder="What do you need? (e.g. 'Analyze Resume')" />
      </div>
      
      <Command.List className="cmdk-list">
        <Command.Empty className="cmdk-empty">No results found.</Command.Empty>

        <Command.Group heading="AI Agents">
          <Command.Item onSelect={() => runCommand(() => router.push("/workspace"))}>
            <Bot size={16} />
            <span>Open AI Workspace</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/resume"))}>
            <FileText size={16} />
            <span>Analyze Resume</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/skills"))}>
            <Target size={16} />
            <span>Check Skill Gaps</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/roadmap"))}>
            <Map size={16} />
            <span>Generate Roadmap</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/interview"))}>
            <Mic size={16} />
            <span>Start Interview Practice</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/jobs"))}>
            <Briefcase size={16} />
            <span>Find Job Matches</span>
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Navigation">
          <Command.Item onSelect={() => runCommand(() => router.push("/dashboard"))}>
            <LayoutDashboard size={16} />
            <span>Dashboard</span>
          </Command.Item>
          <Command.Item onSelect={() => runCommand(() => router.push("/credentials"))}>
            <Shield size={16} />
            <span>Blockchain Credentials</span>
          </Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
