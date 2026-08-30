# Agent Guidelines for `localise.travel`

Welcome to `localise.travel`! This document (`AGENTS.md`) is the repository guide specifically tailored for AI coding agents and autonomous pair programmers. The human-facing guide is in [README.md](file:///Users/championswimmer/Development/Personal/Vue/localise.travel/README.md).

---

## 1. Project Overview

**localise.travel** is an offline-ready Progressive Web Application (PWA) built with Vue 3 and TypeScript. It is designed for international travelers to quickly find, learn, and pronounce essential words and phrases localized across languages and contextual travel categories (e.g. greetings, dining, emergencies, transportation).

### Tech Stack
- **Framework:** [Vue 3](https://vuejs.org/) (SFCs with `<script setup lang="ts">` Composition API)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (~5.6) with strict type-checking (`vue-tsc`)
- **Package Manager / Runtime:** [Bun](https://bun.sh/) (preferred) or npm
- **Build Tool:** [Vite](https://vite.dev/) 6 with `unplugin-vue-components` & `vite-plugin-pwa`
- **UI Framework:** [Bootstrap 5.3](https://getbootstrap.com/) + [bootstrap-vue-next](https://bootstrap-vue-next.github.io/bootstrap-vue-next/) (auto-imported components)
- **Icons:** [lucide-vue-next](https://lucide.dev/) (via custom dynamic wrapper `LucideIcon.vue`) and [vue3-simple-icons](https://github.com/carlson-technologies/vue3-simple-icons)
- **State Management:** [Pinia](https://pinia.vuejs.org/) 3 + [pinia-plugin-persistedstate](https://prazdevs.github.io/pinia-plugin-persistedstate/) (local storage persistence)
- **Analytics:** [PostHog](https://posthog.com/) (`posthog-js`)
- **Testing:** [Vitest](https://vitest.dev/) for unit testing, [Playwright](https://playwright.dev/) for end-to-end testing
- **Linting & Formatting:** [oxlint](https://oxc.rs/) + [ESLint 9](https://eslint.org/) + [Prettier](https://prettier.io/)

---

## 2. Essential Commands

Always run these commands using **`bun`**:

| Task | Command | Description |
| :--- | :--- | :--- |
| **Install Dependencies** | `bun install` | Install all dependencies |
| **Dev Server** | `bun dev` | Starts Vite dev server (defaults to `http://localhost:5173`) |
| **Type Check** | `bun run type-check` | Runs `vue-tsc --build` to verify TypeScript types |
| **Build for Production** | `bun run build` | Runs type-check and Vite production build (`dist/`) |
| **Preview Build** | `bun preview` | Preview production build locally |
| **Unit Tests** | `bun test:unit` | Runs unit tests with Vitest |
| **E2E Tests** | `bun test:e2e` | Runs Playwright tests (build required first) |
| **Linting** | `bun run lint` | Runs `oxlint` and `eslint` with automatic fixes |
| **Formatting** | `bun run format` | Runs `prettier --write src/` |

---

## 3. Directory Layout & Architecture

```
localise.travel/
├── .agents/                    # Agent plans and skills
│   ├── plans/                  # Active planning checklists for large refactors & features
│   └── skills/                 # Agent Skills (agentskills.io format)
│       └── planning/           # Planning skill & cleanup scripts
├── public/                     # Static assets, icons, PWA manifest icons
├── src/
│   ├── assets/                 # Global styles and CSS
│   ├── components/             # Reusable UI components
│   │   ├── icons/              # Custom SVG icon components
│   │   ├── modals/             # Modals (LanguageSelector.vue, SettingsModal.vue)
│   │   ├── __tests__/          # Component unit tests (Vitest)
│   │   ├── BreadCrumbs.vue     # Navigation breadcrumbs
│   │   ├── CategoryCard.vue    # Category selector card on home view
│   │   ├── LucideIcon.vue      # Dynamic Lucide icon component
│   │   ├── MainFooter.vue      # Global footer
│   │   ├── NavBar.vue          # Global navigation bar
│   │   ├── ReloadPrompt.vue    # PWA service-worker update notification
│   │   ├── SearchBar.vue       # Word/phrase search bar
│   │   ├── SubcategoryCard.vue # Subcategory container card
│   │   ├── ToastNotification.vue # Global toast notification component
│   │   └── WordCard.vue        # Word/phrase card with pronunciation & audio
│   ├── data/                   # Core data models and dictionaries
│   │   ├── words/              # Per-language vocabulary dictionaries (*.ts)
│   │   │   ├── ar.ts, bn.ts, de.ts, es.ts, fr.ts, hi.ts, id.ts, ...
│   │   │   └── index.ts        # Aggregator mapping LangCode -> vocabulary dataset
│   │   ├── categories.ts       # Category & subcategory definitions + icons
│   │   ├── icons.ts            # Icon mappings for categories/subcategories
│   │   └── languages.ts        # Supported languages (LangCode, native name, emoji)
│   ├── plugins/                # Plugins (e.g. PostHog analytics)
│   ├── router/                 # Vue Router configuration
│   │   └── index.ts            # Routes: '/' (HomeView), '/:category' (CategoryView)
│   ├── stores/                 # Pinia stores
│   │   ├── __tests__/          # Store unit tests
│   │   ├── lang.ts             # Active language store (persisted)
│   │   ├── settings.ts         # Reading/audio display preferences (persisted)
│   │   └── counter.ts          # Example counter store
│   ├── views/                  # Top-level view routes
│   │   ├── HomeView.vue        # Main home view with category grid
│   │   └── CategoryView.vue    # Category view showing subcategories and words
│   ├── App.vue                 # App shell, global toasts, modals, layout
│   └── main.ts                 # App entry point (Pinia, Bootstrap, PostHog, Router)
├── AGENTS.md                   # This file (Agent instructions & repository context)
├── README.md                   # Human-facing project documentation
├── package.json                # Dependencies and scripts
└── vite.config.ts              # Vite, PWA, and component auto-import configuration
```

---

## 4. Coding Conventions & Best Practices

### Vue 3 & TypeScript
- **Single File Components:** Always use `<script setup lang="ts">`.
- **Component Auto-Import:** `bootstrap-vue-next` components (`BContainer`, `BRow`, `BCol`, `BCard`, `BButton`, `BModal`, `BFormInput`, etc.) are auto-imported via `unplugin-vue-components`. Do not manually import them unless necessary.
- **Icons:** Use `<LucideIcon :name="iconName" />` for dynamic icons or import directly from `lucide-vue-next`.
- **Global Injections:** Global toast notifications are provided in `App.vue` and injected via `inject('toast')`.
- **Path Aliases:** Use `@/...` to refer to files inside `src/` (configured in `vite.config.ts` and `tsconfig.json`).

### State Management & Data Flow
- Stores live in `src/stores/` using Pinia Setup Store syntax (`defineStore('id', () => { ... })`).
- Persisted state uses `pinia-plugin-persistedstate` (`persist: { pick: [...] }`).
- Language dictionary files in `src/data/words/` must follow consistent keys matching categories and subcategories defined in `src/data/categories.ts`.

### Testing & Quality Assurance
- **Unit Tests:** Located in `__tests__/` alongside the store or component. Run with `bun test:unit`.
- **Type Checking:** Run `bun run type-check` before submitting any major code modification.
- **Linting:** Run `bun run lint` to enforce formatting and syntax correctness.

---

## 5. Planning Requirement for Agents

For **large refactors**, **new features** (e.g. adding new languages, audio synthesis, new views), or **architectural changes**:
1. **Always create a plan first** under `.agents/plans/<YYYY-MM-DD>-<plan-name>.md` with a detailed checklist.
2. **Follow the skill guidelines** in `.agents/skills/planning/SKILL.md`.
3. **Clean up old completed plans** before creating new ones by running the cleanup script:
   ```bash
   bash .agents/skills/planning/scripts/cleanup-completed-plans.sh
   ```
4. Check off items (`- [x]`) as you execute the plan.
