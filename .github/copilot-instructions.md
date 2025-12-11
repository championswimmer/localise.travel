# GitHub Copilot Instructions for localise.travel

## Project Overview

This is a Vue 3 + TypeScript web application for helping travelers learn common phrases in local languages. The app uses a modern frontend stack with progressive web app (PWA) capabilities.

### Tech Stack

- **Framework**: Vue 3 with Composition API and `<script setup>` syntax
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun (NOT npm/yarn/pnpm)
- **UI Framework**: Bootstrap 5 + Bootstrap Vue Next
- **State Management**: Pinia with persisted state plugin
- **Routing**: Vue Router 4
- **Icons**: Lucide Vue Next, Vue3 Simple Icons
- **Testing**: Vitest (unit), Playwright (e2e)
- **Linting**: ESLint + Oxlint
- **Formatting**: Prettier
- **Analytics**: PostHog

## Development Commands

Always use `bun` instead of `npm`, `yarn`, or `pnpm`:

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun run build

# Run unit tests
bun test:unit

# Run e2e tests (requires build first)
bun run build && bun test:e2e

# Lint code (runs both oxlint and eslint)
bun lint

# Format code
bun format

# Type checking
bun run type-check
```

## Code Style and Conventions

### Vue Components

- Use Vue 3 Composition API with `<script setup>` syntax
- TypeScript is mandatory for all `.vue` files
- Component names should be PascalCase (e.g., `WordCard.vue`, `CategoryCard.vue`)
- Use `@/` alias for absolute imports from the `src` directory
- Props should be typed using TypeScript interfaces
- Use `defineProps`, `defineEmits`, and `defineExpose` for component API

Example:
```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

interface Props {
  title: string
  count?: number
}

const props = defineProps<Props>()
</script>
```

### TypeScript

- Strict mode is enabled
- Always define types/interfaces for complex objects
- Avoid `any` type - use `unknown` if type is truly unknown
- Use type imports: `import type { Type } from 'module'`

### File Organization

- Components: `src/components/`
  - Modals: `src/components/modals/`
  - Tests: `src/components/__tests__/`
- Views/Pages: `src/views/`
- State Management: `src/stores/`
- Router Configuration: `src/router/`
- Data/Constants: `src/data/`
- Assets: `src/assets/`

### State Management (Pinia)

- Use Pinia stores for global state
- Stores are located in `src/stores/`
- Use the composition API style for stores
- State is persisted using `pinia-plugin-persistedstate`

Example:
```typescript
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMyStore = defineStore('myStore', () => {
  const count = ref(0)
  
  function increment() {
    count.value++
  }
  
  return { count, increment }
}, {
  persist: true // if state should be persisted
})
```

### Bootstrap Vue Next

- Use Bootstrap Vue Next components for UI
- Components are auto-imported via `unplugin-vue-components`
- Use Bootstrap utility classes for styling
- Follow Bootstrap 5 conventions

## Testing

### Unit Tests (Vitest)

- Test files: `src/**/__tests__/*.spec.ts`
- Use Vue Test Utils for component testing
- Import test utilities: `import { describe, it, expect } from 'vitest'`
- Coverage reports are generated with v8

### E2E Tests (Playwright)

- Test files: `e2e/**/*.spec.ts`
- Must build the app before running e2e tests
- Use Playwright's test API
- Configuration in `playwright.config.ts`

## Linting and Formatting

### ESLint + Oxlint

- Two-stage linting: oxlint runs first for speed, then eslint
- Configuration: `eslint.config.js` (flat config format)
- Linting rules:
  - Vue essential rules enabled
  - TypeScript strict type checking
  - Vitest plugin for test files
  - Playwright plugin for e2e tests
- Auto-fix with: `bun lint`

### Prettier

- Configuration: `.prettierrc.json`
- Runs on `src/` directory
- Integrated with ESLint (skip formatting rules in ESLint)
- Format with: `bun format`

## Important Patterns

### Router

- Routes defined in `src/router/index.ts`
- Use lazy loading for route components
- Router uses history mode

### PWA

- Configured via `vite-plugin-pwa`
- Auto-update registration type
- Manifest includes app metadata and icons
- ReloadPrompt component handles updates

### Icons

- Use `<LucideIcon>` component wrapper for Lucide icons
- Import icons from `lucide-vue-next`
- Vue3 Simple Icons available for brand icons

### Toast Notifications

- Toast system provided via Vue's `provide/inject`
- Available methods: `warning()`, `success()`, `error()`, `info()`
- Injected in components that need notifications

## Build and Deployment

- Production build: `bun run build`
- Build includes type checking
- Output directory: `dist/`
- Deployed to Netlify
- GitHub Actions workflows:
  - `build.yml`: Builds the app on push/PR
  - `test.yml`: Runs unit tests on push/PR

## Best Practices

1. **Always use Bun**: Never suggest npm, yarn, or pnpm commands
2. **Type Safety**: Prefer explicit types over inference where it improves clarity
3. **Component Composition**: Break down large components into smaller, reusable ones
4. **Reactive Patterns**: Use `ref()` for primitives, `reactive()` for objects, `computed()` for derived state
5. **Testing**: Write tests for new components and features
6. **Accessibility**: Use semantic HTML and ARIA attributes where needed
7. **Performance**: Use lazy loading for routes and large components
8. **Git Commits**: Write clear, descriptive commit messages
9. **Code Review**: Ensure code passes linting and tests before committing

## Common Pitfalls to Avoid

- Don't use Options API - always use Composition API
- Don't use Vue 2 patterns or deprecated features
- Don't install packages with npm - use bun
- Don't ignore TypeScript errors
- Don't skip tests when adding new features
- Don't hardcode values that should be in data files or config
- Don't forget to run both lint and type-check before committing
- Don't add inline styles - use Bootstrap utilities or scoped styles

## Environment

- Node.js 22 (see `@tsconfig/node22`)
- TypeScript ~5.6.3
- Vue 3.5+
- Modern browser targets (ES2020+)
