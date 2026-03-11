# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server with Turbopack (localhost:3000)
npm run build        # Production build
npm run test         # Run all tests (vitest)
npx vitest run src/lib/__tests__/file-system.test.ts  # Run a single test file
npm run lint         # ESLint
npm run setup        # Install deps + Prisma generate + migrate
npm run db:reset     # Reset SQLite database
```

All dev/build/start scripts require `NODE_OPTIONS='--require ./node-compat.cjs'` (already configured in package.json). This polyfill removes `localStorage`/`sessionStorage` globals on the server to fix Node.js 25+ SSR compatibility.

## Architecture

**AI-powered React component generator** — users describe components in chat, Claude generates them via tool calls, and a live iframe preview updates in real-time.

### Core Flow

1. **Chat** (`src/lib/contexts/chat-context.tsx`) → sends messages + serialized file system to `/api/chat`
2. **API route** (`src/app/api/chat/route.ts`) → calls `streamText()` with Claude (or mock provider if no API key) and two tools: `str_replace_editor` (create/edit files) and `file_manager` (rename/delete)
3. **Tool execution** → modifies a `VirtualFileSystem` instance; tool results stream back to client
4. **Client** (`src/lib/contexts/file-system-context.tsx`) → applies tool calls to client-side VFS via `handleToolCall()`
5. **Preview** (`src/components/preview/PreviewFrame.tsx`) → transforms all files with Babel, generates import maps (local files → blob URLs, packages → esm.sh CDN), renders in sandboxed iframe

### Virtual File System

`src/lib/file-system.ts` — in-memory tree of `FileNode` objects (never writes to disk). Serializable to/from JSON for persistence in the database. The AI's entry point is always `/App.jsx`.

### AI Tools

- `src/lib/tools/str-replace.ts` — `str_replace_editor`: create files, string replace, insert at line
- `src/lib/tools/file-manager.ts` — `file_manager`: rename and delete files
- System prompt: `src/lib/prompts/generation.tsx`
- Provider selection: `src/lib/provider.ts` — returns Claude (`claude-haiku-4-5`) if `ANTHROPIC_API_KEY` is set, otherwise a `MockLanguageModel`

### Preview Pipeline

`src/lib/transform/jsx-transformer.ts` — uses `@babel/standalone` to compile JSX. Generates an HTML document with an ES module import map: local `@/` imports resolve to blob URLs, third-party packages resolve to esm.sh. CSS imports are extracted into `<style>` tags. The iframe uses Tailwind from CDN.

### Data & Auth

- **Database**: SQLite via Prisma (`prisma/schema.prisma`). Projects store `messages` and `data` (file system) as JSON strings.
- **Auth**: JWT sessions in HTTP-only cookies (`src/lib/auth.ts`). Server actions for sign up/in/out in `src/actions/index.ts`.
- **Middleware** (`src/middleware.ts`): protects `/api/projects/*` and `/api/filesystem/*` routes.
- **Anonymous users**: tracked via `sessionStorage` (`src/lib/anon-work-tracker.ts`).

### UI Layout

Three-panel resizable layout (`src/app/main-content.tsx`): chat on the left, preview/code editor on the right. Code view splits into file tree (`FileTree.tsx`) and Monaco editor (`CodeEditor.tsx`).

## Key Conventions

- Path alias: `@/*` maps to `src/*`
- Prisma client generated to `src/generated/prisma/`
- Tests live in `__tests__/` directories alongside source files
- UI primitives in `src/components/ui/` (Radix-based, shadcn style)
- Uses Vercel AI SDK (`ai` package) for streaming and tool call handling
- Anthropic prompt caching enabled via `providerOptions.anthropic.cacheControl`
