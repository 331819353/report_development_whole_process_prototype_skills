# 12 x 8 Block Layout Templates

This directory is the block layout template library for the frozen-title sci-fi cockpit template.

Terminology used by the report development flow:

- 框架模板: the page shell, such as frozen title, floating panels, filter entry, toolbar, theme, and runtime stack.
- 页面布局配置: the page-level `layoutRows` and `widgets` wiring.
- 分块布局模板: one reusable block template with size plus slots, such as `4*3 AA`, `4*3 AB`, or `12*4 AAABBBCCCDDD`. Every template uses `1-1 titleArea`, `1-2 pillArea`, `2-1 auxMetricArea`, `2-2 unitArea`, `3 componentArea`, and `4 summaryArea`.
- 组件内容区模板: the implemented component's internal content area only. It fills slots inside `3 componentArea` by copying or mounting an independent Vue file, not additional information or explanatory copy.

This library covers every legal rectangle span under the current layout contract:

- Minimum container: `2 x 2`
- Rule: for any `M x N` span, `M >= N`
- Columns: 2 through 12
- Rows: 2 through 8
- Files: 56 wrappers named `SpanCCxRRLayout.vue`, from `Span02x02Layout.vue` to `Span12x08Layout.vue`

These files are block layout templates, not component-category templates. Each file declares a layout size and delegates to `BaseLayoutSpan.vue`. The report-development block areas are:

- `1-1 titleArea`: 标题区, left aligned
- `1-2 pillArea`: 胶囊按钮区, right aligned
- `2-1 auxMetricArea`: 附加信息区, left aligned
- `2-2 unitArea`: 单位区, right aligned
- `3 componentArea`: 组件区, filled by `componentRegionPattern` / `componentSlots`
- `4 summaryArea`: 说明区, left aligned

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
- Top zone split: left `2/3` `1-1` title area, right `1/3` `1-2` pill-button area
- Title pills: maximum `3` values, button group height `30px`
- Top/body gap: `2px`
- Body zone height: `container content height - 33px - 2px`
- Block background: one shared cockpit surface, covering the full block including the top zone and body zone
- Body zone split, top to bottom: `2-1` additional information plus `2-2` unit `1/9`, `3` component area `6/9`, `4` explanation/conclusion text `2/9`
- Filled component content areas are rounded rectangles and do not draw border lines.
- Component content area templates may reserve a `20px` top title strip with centered text and `3px` top padding; hide this strip when the parent block layout has only one component slot.
- Body section gap: `2px`
- Optional body sections do not reserve space when absent; the component viewport receives the unused height.
- Additional information: `单位` is rendered last and does not count against the non-unit item capacity.
- Additional information capacity: a `2 x N` span may render `2` non-unit items; each additional column `M + 1` allows `3` more, so non-unit capacity is `2 + (M - 2) * 3`.

Usage flow:

1. Select the framework template.
2. Configure the page layout with `layoutRows`.
3. Pick the block layout template that matches each page block and satisfies `M >= N`.
4. Configure `1-1 titleArea` with title text and title style.
5. Decide whether `1-2 pillArea` is needed; configure pill buttons when needed, otherwise leave it unconfigured.
6. Configure `2-1 auxMetricArea` with suitable additional information and even distribution.
7. Decide whether `2-2 unitArea` is needed; configure unit text when needed, otherwise leave it unconfigured.
8. Fill `componentSlots` inside `3 componentArea` only with component content area templates. Do not place additional information, units, title pills, or summaries inside `componentSlots`. If there is only one component slot, the component content area title strip must be hidden.
9. Configure `4 summaryArea` with conclusion, note, or explanation when needed, otherwise leave it unconfigured.
10. Register any new widget in `src/widgets/types.ts` and `src/widgets/registry.ts`.
11. Mount it in `src/config/dashboard.config.ts`.
