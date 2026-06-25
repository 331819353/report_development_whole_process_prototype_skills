# 12 x 8 Generic Layout Span Templates

This directory is a generic layout design library for the left-nav workbench template served at 5176.

It covers every legal rectangle span under the current layout contract:

- Minimum container: `2 x 2`
- Rule: for any `M x N` span, `M >= N`
- Columns: 2 through 12
- Rows: 2 through 8
- Files: 56 wrappers named `SpanCCxRRLayout.vue`, from `Span02x02Layout.vue` to `Span12x08Layout.vue`

These files are not component-category templates. They do not assume KPI, chart, table, list, card, map, or any other business component type. Each file only declares a layout size and delegates to `BaseLayoutSpan.vue`, which provides generic slots:

- `header`: optional title/context zone
- default slot: primary content zone
- `secondary`: optional support zone
- `footer`: optional note/action/overflow zone

Grid sizing formula for this template:

- Right content width: `1920 - 256 = 1664px`
- Column unit: `1664 / 12 = 138.6667px`
- Row unit: `135px`
- Cell padding: `3px`
- Content width: `1664 / 12 * M - 6`
- Content height: `135 * N - 6`

Shared container shell:

- Inner padding: `3px`
- Top zone height: `33px`
- Top zone split: left `2/3` title area, right `1/3` pill-button area
- Title pills: maximum `3` values, button group height `30px`
- Top/body gap: `2px`
- Body zone height: `container content height - 33px - 2px`
- Block background: one shared blue-gray light glow with Haier blue as the primary tone, covering the full block including the top zone and body zone
- Body zone split, top to bottom: auxiliary metrics `1/9`, component viewport `6/9`, explanation/conclusion text `2/9`
- Component viewport: square corners, no independent border radius
- Body section gap: `2px`
- Optional body sections do not reserve space when absent; the component viewport receives the unused height.
- Auxiliary metrics: `单位` is rendered last and does not count against the non-unit metric capacity.
- Auxiliary metric capacity: a `2 x N` span may render `2` non-unit metrics; each additional column `M + 1` allows `3` more, so non-unit capacity is `2 + (M - 2) * 3`.

Usage flow:

1. Pick the span that matches the block in `layoutRows` and satisfies `M >= N`.
2. Copy the matching `SpanCCxRRLayout.vue` file to `src/widgets/components/YourWidget.vue`, or import `BaseLayoutSpan.vue` directly.
3. Replace the placeholder with the real business rendering while preserving `width: 100%; height: 100%` behavior.
4. Register the widget in `src/widgets/types.ts` and `src/widgets/registry.ts`.
5. Mount it in `src/config/dashboard.config.ts`.
