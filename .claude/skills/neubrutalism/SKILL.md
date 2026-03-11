---
name: neubrutalism
description: Apply a refined neubrutalist design system to React/Next.js components using Tailwind CSS. Use when the user asks for neubrutalism, neubrutalist, neo-brutalism, bold UI, chunky UI, or wants solid shadows with thick borders. Also use when styling components with a graphic, editorial, or poster-like aesthetic.
---

# Neubrutalism Design System

Apply a refined neubrutalist visual language to React components styled with Tailwind CSS. This system balances raw graphic energy with typographic finesse — bold but never crude.

## Core Principles

1. **Solid offset shadows** — never use blur-based shadows. All shadows are hard-edged offset rectangles.
2. **Thick black borders** — use `border-2 border-black` as the baseline for all interactive and container elements.
3. **Bright flat fills** — use saturated background colors from Tailwind's palette (violet, lime, orange, red, etc.) without gradients.
4. **Bold typography** — prefer `font-bold` or `font-black` with tight tracking. Labels and tags use `uppercase tracking-wide`.
5. **Press interaction** — interactive elements shift on hover/active to "press in" the shadow: `hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`.
6. **Rounded but not pill-shaped** — use `rounded-lg` or `rounded-xl`. Avoid `rounded-full` for containers (acceptable for small status dots).
7. **High contrast** — text is true black (`text-black`) on light backgrounds. Dark containers use white text.

## Shadow Scale

Use consistent shadow sizes based on element importance:

- **Small (interactive chips, tags, badges):** `shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`
- **Medium (buttons, inputs, cards):** `shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`
- **Large (modals, dialogs, hero sections):** `shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`
- **Accent shadow (special emphasis):** Replace `rgba(0,0,0,1)` with a color, e.g. `shadow-[3px_3px_0px_0px_rgba(124,58,237,1)]` for violet.

## Color Palette

Use these role-based color assignments:

| Role | Background | Usage |
|------|-----------|-------|
| Primary surfaces | `bg-white` | Cards, containers, inputs |
| Interactive default | `bg-black text-white` | Primary buttons, active user elements |
| Accent 1 | `bg-violet-100` | AI/bot elements, secondary highlights, headers |
| Accent 2 | `bg-lime-50` or `bg-lime-200` | Success states, toolbar backgrounds, send actions |
| Accent 3 | `bg-orange-50` | In-progress states, tool indicators |
| Danger | `bg-red-100` | Errors, destructive states |
| Neutral | `bg-neutral-100` | Page backgrounds, muted containers |

## Component Patterns

### Buttons

```
// Primary
className="px-4 py-2 bg-black text-white font-bold border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"

// Outline
className="px-4 py-2 bg-white text-black font-bold border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all"

// Ghost (no shadow by default, appears on hover)
className="px-4 py-2 font-bold border-2 border-transparent rounded-lg hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-neutral-100 transition-all"
```

### Inputs

```
className="w-full h-10 px-3 bg-white text-black font-medium border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] placeholder:text-neutral-400 focus:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px] transition-all outline-none"
```

### Cards / Containers

```
className="bg-white border-2 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
```

### Dialogs / Modals

```
className="bg-white border-2 border-black rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
```

### Tags / Badges

```
className="px-3 py-1 text-xs font-bold uppercase tracking-wide border-2 border-black rounded-md bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
```

### Tabs

```
// Tab list container
className="bg-neutral-100 inline-flex h-10 items-center rounded-lg p-1 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"

// Active tab trigger
className="bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-black rounded-md px-3 py-1"
```

### Avatars / Icon Containers

```
className="w-10 h-10 rounded-lg bg-violet-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
```

### Labels (form)

```
className="text-sm font-bold text-black uppercase tracking-wide"
```

### Error Messages

```
className="text-sm font-bold text-red-700 bg-red-100 border-2 border-black rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
```

### Dividers / Separators

```
// Structural borders
className="border-b-2 border-black"

// Dashed separators
className="border-t-2 border-black border-dashed"

// Resize handles
className="w-[2px] bg-black hover:bg-violet-600 transition-colors"
```

### Headers / Toolbars

```
className="h-14 flex items-center px-6 border-b-2 border-black bg-violet-100"
// title inside: className="text-lg font-black text-black tracking-tight"
```

## Layout Rules

- Page background: `bg-neutral-100`
- Panel backgrounds: `bg-white` with `border-2 border-black` between panels
- Structural dividers are `border-b-2 border-black` (never translucent)
- Resize handles: `w-[2px] bg-black` (not hairline, not gray)

## Typography Rules

- Headings: `font-black tracking-tight text-black`
- Body: `font-medium text-black`
- Labels: `font-bold uppercase tracking-wide text-sm text-black`
- Muted text: `font-medium text-neutral-500`
- Never use `text-gray-*` — use `text-neutral-*` or `text-black`

## Interaction Rules

All interactive elements follow the "press" pattern:

1. **Rest state:** element has full shadow offset
2. **Hover:** shadow shrinks, element translates toward shadow origin
3. **Active/pressed:** shadow disappears completely, element fully translated
4. **Disabled:** `opacity-50`, no shadow, no border color change

```
// Standard press interaction classes
shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]
active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
transition-all
```

## What NOT to Do

- No `shadow-sm`, `shadow-md`, `shadow-lg` — only hard offset shadows
- No gradients — flat colors only
- No `border-neutral-200` or translucent borders — use `border-black` or `border-2 border-black`
- No `rounded-full` on containers (fine for tiny status dots)
- No `font-normal` on interactive elements — minimum `font-medium`, prefer `font-bold`
- No `text-gray-*` — use `text-neutral-*` palette
- No `opacity` for borders — borders are always solid black
