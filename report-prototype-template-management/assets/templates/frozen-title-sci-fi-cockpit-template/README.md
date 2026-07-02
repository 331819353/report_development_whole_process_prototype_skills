# Vue3 Dashboard Template

This template is a Vue 3 + TypeScript + Vite report prototype shell.

## Stack

- Vue 3
- Vite
- TypeScript
- Pinia
- Vue Router
- Element Plus
- ECharts
- Axios
- Day.js
- Sass

## Commands

```bash
npm run dev
npm run dev:vite
npm run build:preview
npm run build:test
npm run build:prod
npm run preview
```

- `npm run dev` starts the mock API and Vite together, with Vite `/api` proxied to the mock service.
- `npm run dev:vite` starts only Vite and is for shell-only debugging; API-backed filters and components will not be ready.

## Structure

- `src/api` stores API request config helpers.
- `src/components` stores reusable Vue components.
- `src/router` stores route modules and router setup.
- `src/stores` stores Pinia modules.
- `src/styles` stores global Sass and Element Plus theme overrides.
- `src/utils/request.ts` stores the shared Axios instance.
- `src/views` stores route-level pages.
- `src/config`, `src/data`, `src/dataSources`, and `src/widgets` are template-owned report extension points.
