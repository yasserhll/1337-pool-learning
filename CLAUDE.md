# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # serveur de développement (http://localhost:3000)
npm run build    # build de production
npm run lint     # ESLint
npm run start    # démarre le build de production
```

No test suite is configured.

## Stack

- **Next.js 16.2.6** with App Router — read `node_modules/next/dist/docs/` before writing any Next.js-specific code; APIs may differ from training data
- **React 19.2.4**, **TypeScript 5**, **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **framer-motion**, **lucide-react**, **prismjs** for UI/animations/highlighting
- Path alias `@/` maps to the project root (configured in `tsconfig.json`)

## Architecture

The app is a French-language interactive course platform for the 1337/42 network Piscine C.

### Data layer — `lib/courseData.ts`

Single source of truth for all content. Exports:

- `modules: Module[]` — course modules grouped by tag (`"Shell" | "C" | "Rush"`)
- `glossary: Term[]` — technical term definitions

Each `Module` contains `Lesson[]`; each `Lesson` contains `CodeExample[]` and `Exercise[]`. Exercise types are `"mcq" | "fill" | "output" | "order"`. Adding or editing course content means editing this file only.

### Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Module grid with search, glossary preview |
| `/module/[id]` | `app/module/[id]/page.tsx` | Module detail with lesson tabs (theory / examples / exercises) |
| `/glossaire` | `app/glossaire/page.tsx` | Searchable glossary |
| `/api/exercise` | `app/api/exercise/route.ts` | GET → stats, POST → check exercise answer |

### Styling convention

All components use **inline styles** (no Tailwind utility classes, no CSS modules). The design system is dark-themed (`#0a0d12` background, `#00d4ff` cyan accent, `#39d353` green for Shell, `#ff5f56` red for Rush). Maintain this pattern when adding UI.

### Client vs Server components

All page components are `"use client"` (they use `useState`). The API route at `app/api/exercise/route.ts` is the only server-side code. `app/layout.tsx` and the API route are server components by default.

### Custom syntax highlighter

`app/module/[id]/page.tsx` contains a hand-rolled `highlight()` function that tokenizes C/shell code via regex replacements. It is intentionally simple — do not replace it with PrismJS on the client without checking bundle impact.
