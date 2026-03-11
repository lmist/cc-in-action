"use client";

import { Loader2, FilePlus, FileCode, Eye, Trash2, FileOutput } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  args: Record<string, unknown>;
  state: string;
  result?: unknown;
}

interface ToolInvocationBadgeProps {
  tool: ToolInvocation;
}

function getActionInfo(tool: ToolInvocation): { label: string; icon: React.ComponentType<{ className?: string }> } {
  const { toolName, args } = tool;
  const command = typeof args?.command === "string" ? args.command : null;
  const path = typeof args?.path === "string" ? args.path : null;

  if (!command || !path) {
    return { label: toolName, icon: FileCode };
  }

  switch (command) {
    case "create":
      return { label: `Created ${path}`, icon: FilePlus };
    case "str_replace":
    case "insert":
      return { label: `Edited ${path}`, icon: FileCode };
    case "view":
      return { label: `Viewed ${path}`, icon: Eye };
    case "delete":
      return { label: `Deleted ${path}`, icon: Trash2 };
    case "rename":
      return { label: `Renamed ${path}`, icon: FileOutput };
    default:
      return { label: toolName, icon: FileCode };
  }
}

export function ToolInvocationBadge({ tool }: ToolInvocationBadgeProps) {
  const { label, icon: Icon } = getActionInfo(tool);
  const isDone = tool.state === "result";

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-orange-50 rounded-lg text-xs font-mono font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
      {isDone ? (
        <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500 border border-black" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-black" />
      )}
      <Icon className="w-3.5 h-3.5 text-black" />
      <span className="text-black">{label}</span>
    </div>
  );
}
