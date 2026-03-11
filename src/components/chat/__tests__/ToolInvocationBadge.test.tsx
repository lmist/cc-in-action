import { describe, it, expect, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { ToolInvocationBadge } from "../ToolInvocationBadge";

function makeTool(toolName: string, args: Record<string, unknown>, state = "result") {
  return { toolName, args, state, result: state === "result" ? "ok" : undefined };
}

describe("ToolInvocationBadge", () => {
  afterEach(() => cleanup());

  it('renders "Created /App.jsx" for str_replace_editor with command=create', () => {
    render(<ToolInvocationBadge tool={makeTool("str_replace_editor", { command: "create", path: "/App.jsx" })} />);
    expect(screen.getByText("Created /App.jsx")).toBeDefined();
  });

  it('renders "Edited /App.jsx" for str_replace_editor with command=str_replace', () => {
    render(<ToolInvocationBadge tool={makeTool("str_replace_editor", { command: "str_replace", path: "/App.jsx" })} />);
    expect(screen.getByText("Edited /App.jsx")).toBeDefined();
  });

  it('renders "Edited /App.jsx" for str_replace_editor with command=insert', () => {
    render(<ToolInvocationBadge tool={makeTool("str_replace_editor", { command: "insert", path: "/App.jsx" })} />);
    expect(screen.getByText("Edited /App.jsx")).toBeDefined();
  });

  it('renders "Viewed /App.jsx" for str_replace_editor with command=view', () => {
    render(<ToolInvocationBadge tool={makeTool("str_replace_editor", { command: "view", path: "/App.jsx" })} />);
    expect(screen.getByText("Viewed /App.jsx")).toBeDefined();
  });

  it('renders "Deleted /App.jsx" for file_manager with command=delete', () => {
    render(<ToolInvocationBadge tool={makeTool("file_manager", { command: "delete", path: "/App.jsx" })} />);
    expect(screen.getByText("Deleted /App.jsx")).toBeDefined();
  });

  it('renders "Renamed /old.jsx" for file_manager with command=rename', () => {
    render(<ToolInvocationBadge tool={makeTool("file_manager", { command: "rename", path: "/old.jsx", new_path: "/new.jsx" })} />);
    expect(screen.getByText("Renamed /old.jsx")).toBeDefined();
  });

  it("shows spinner when state is not result", () => {
    const { container } = render(
      <ToolInvocationBadge tool={makeTool("str_replace_editor", { command: "create", path: "/App.jsx" }, "call")} />
    );
    expect(container.querySelector(".animate-spin")).not.toBeNull();
    expect(container.querySelector(".bg-emerald-500")).toBeNull();
  });

  it("shows green dot when state is result", () => {
    const { container } = render(
      <ToolInvocationBadge tool={makeTool("str_replace_editor", { command: "create", path: "/App.jsx" }, "result")} />
    );
    expect(container.querySelector(".bg-emerald-500")).not.toBeNull();
    expect(container.querySelector(".animate-spin")).toBeNull();
  });

  it("falls back to raw tool name when args can't be parsed", () => {
    render(<ToolInvocationBadge tool={makeTool("unknown_tool", {})} />);
    expect(screen.getByText("unknown_tool")).toBeDefined();
  });
});
