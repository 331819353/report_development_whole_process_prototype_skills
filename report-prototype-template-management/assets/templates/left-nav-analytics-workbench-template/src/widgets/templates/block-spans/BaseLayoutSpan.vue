<script setup lang="ts">
import { computed, type Component } from 'vue';
import KpiMetricWidget from '../../components/KpiMetricWidget.vue';
import type { KpiMetricWidgetProps, WidgetContext } from '../../types';
import * as ComponentContentAreaTemplates from '../component-content-areas';
import { getLayoutSpanSpec, type LayoutSpanId } from './catalog';
import type { ComponentRegionPattern, LayoutSpanTemplateProps } from './types';

interface Props extends LayoutSpanTemplateProps {
  spanId: LayoutSpanId;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  note: '',
  showChrome: true,
  showFooter: true,
  secondary: 'auto',
  density: 'auto',
  placeholder: '3 组件区',
  zonePatternLabel: '',
  componentRegionPattern: 'AA',
});

const fallbackWidgetContext: WidgetContext = {
  area: 'page',
  navId: 'block-template',
  navLabel: 'block-template',
  blockId: 'component-area',
  filters: {},
};
const slotComponentRegistry: Record<string, Component> = {
  KpiMetricWidget,
  ...ComponentContentAreaTemplates,
};
const spec = computed(() => getLayoutSpanSpec(props.spanId));
const isFourByThreeScaffold = computed(() => spec.value.id === '04x03');
const normalizeComponentRegionPattern = (pattern: ComponentRegionPattern) =>
  /^[A-Z]{2,12}$/.test(pattern) ? pattern : 'AA';
const normalizedComponentRegionPattern = computed<ComponentRegionPattern>(() =>
  normalizeComponentRegionPattern(props.componentRegionPattern),
);
const shouldRenderComponentRegionPattern = computed(
  () => isFourByThreeScaffold.value || normalizedComponentRegionPattern.value.length > 2,
);
const rows = computed(() => props.data ?? []);
const resolvedDensity = computed(() => (props.density === 'auto' ? spec.value.densityBand : props.density));
const hasChrome = computed(() => !isFourByThreeScaffold.value && props.showChrome && spec.value.minReadableChrome);
const hasFooter = computed(() => !isFourByThreeScaffold.value && props.showFooter && spec.value.rows >= 2 && spec.value.area >= 6);
const hasSecondary = computed(() => {
  if (shouldRenderComponentRegionPattern.value) {
    return false;
  }

  if (isFourByThreeScaffold.value) {
    return false;
  }

  if (props.secondary === true) {
    return spec.value.area >= 6;
  }

  if (props.secondary === false) {
    return false;
  }

  return spec.value.mode === 'primary-secondary' || spec.value.mode === 'workspace-grid';
});
const title = computed(() => props.title || spec.value.id + ' layout');
const note = computed(() => props.note || spec.value.fitRule);
const zonePatternLabel = computed(() => props.zonePatternLabel ?? spec.value.zonePattern);
const componentAreaLabel = computed(() => props.placeholder || '3 组件区');
const sizeText = computed(() => spec.value.widthPx + 'px x ' + spec.value.heightPx + 'px');
const componentSlotByRegion = computed(() => new Map(
  (props.componentSlots ?? []).map((slot, index) => [
    (slot.regionKey ?? slot.id ?? String.fromCharCode(65 + index)).toLowerCase().slice(0, 1),
    slot,
  ]),
));
const componentContractByRegion = computed(() => new Map(
  (props.componentSlotContracts ?? []).map((contract, index) => [
    (contract.regionKey ?? contract.id ?? String.fromCharCode(65 + index)).toLowerCase().slice(0, 1),
    contract,
  ]),
));
const componentRegionSegments = computed(() => {
  const segments: Array<{ key: string; kind: string; span: number }> = [];

  Array.from(normalizedComponentRegionPattern.value).forEach((rawKind, index) => {
    const kind = rawKind.toLowerCase();
    const previous = segments[segments.length - 1];

    if (previous?.kind === kind) {
      previous.span += 1;
      return;
    }

    segments.push({ key: `${kind}-${index}`, kind, span: 1 });
  });

  return segments;
});
const componentSlotCount = computed(() => componentRegionSegments.value.length);
const getRegionLabel = (kind: string) => {
  const slot = componentSlotByRegion.value.get(kind);
  const contract = componentContractByRegion.value.get(kind);

  return slot?.label ?? contract?.label ?? `${componentAreaLabel.value} ${kind.toUpperCase()}`;
};
const slotWidgetContext = computed(() => props.context ?? fallbackWidgetContext);
const getRegionSlot = (kind: string) => componentSlotByRegion.value.get(kind);
const getSlotWidget = (kind: string) => getRegionSlot(kind)?.widget;
const getSlotContent = (kind: string) => getRegionSlot(kind)?.content;
const getSlotComponent = (kind: string) => {
  const widget = getSlotWidget(kind);

  return widget ? slotComponentRegistry[widget.type] ?? null : null;
};
const getSlotWidgetRawProps = (kind: string) => (getSlotWidget(kind)?.props ?? {}) as Record<string, unknown>;
const getSlotContentAreaTitle = (kind: string) => {
  const widget = getSlotWidget(kind);
  const widgetProps = getSlotWidgetRawProps(kind);

  for (const value of [
    widgetProps.contentAreaTitle,
    widgetProps.title,
    widget?.displayTitle,
    widget?.title,
    widget?.metricName,
    getRegionSlot(kind)?.label,
    getRegionLabel(kind),
  ]) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }

  return '';
};
const getSlotTitleProps = (kind: string) => {
  const widgetProps = getSlotWidgetRawProps(kind);

  return {
    contentAreaTitle: getSlotContentAreaTitle(kind),
    slotCount: componentSlotCount.value,
    showContentTitle: componentSlotCount.value > 1 && widgetProps.showContentTitle !== false,
  };
};
const getSlotWidgetProps = (kind: string) => ({
  ...getSlotWidgetRawProps(kind),
  ...getSlotTitleProps(kind),
});
const getSlotContentLabel = (kind: string) => {
  const content = getSlotContent(kind);

  return content?.label ?? content?.title ?? getRegionLabel(kind);
};
const hasSlotComponentContent = (kind: string) => Boolean(getSlotComponent(kind));
const hasInlineKpiComponentContent = (kind: string) => Boolean(getSlotContent(kind));
const hasComponentContent = (kind: string) => hasSlotComponentContent(kind) || hasInlineKpiComponentContent(kind);
const getKpiComponentContentProps = (kind: string): KpiMetricWidgetProps => {
  const widget = getSlotWidget(kind);

  if (widget?.type === 'KpiMetricWidget') {
    return {
      ...(widget.props as KpiMetricWidgetProps),
      ...getSlotTitleProps(kind),
    };
  }

  const content = getSlotContent(kind);

  return {
    ...getSlotTitleProps(kind),
    label: getSlotContentLabel(kind),
    value: content?.value,
    unit: content?.unit,
    delta: content?.delta,
    tone: content?.tone,
  };
};
</script>

<template>
  <section
    class="layout-span-template"
    :class="[
      'density-' + resolvedDensity,
      'orientation-' + spec.orientation,
      'mode-' + spec.mode,
      {
        'has-secondary': hasSecondary,
        'has-chrome': hasChrome,
        'has-footer': hasFooter,
        'is-four-by-three-scaffold': isFourByThreeScaffold,
        'has-region-pattern': shouldRenderComponentRegionPattern,
      },
    ]"
    :style="{
      '--span-cols': spec.cols,
      '--span-rows': spec.rows,
      '--span-width': spec.widthPx + 'px',
      '--span-height': spec.heightPx + 'px',
    }"
  >
    <header v-if="hasChrome" class="layout-span-header">
      <slot name="header" :spec="spec" :rows="rows" :title="title" :note="note">
        <div class="layout-span-title-group">
          <span>{{ spec.id }}</span>
          <strong>{{ title }}</strong>
        </div>
        <em>{{ sizeText }}</em>
      </slot>
    </header>

    <section class="layout-span-body">
      <main class="layout-span-primary">
        <slot :spec="spec" :rows="rows" :title="title" :note="note">
          <div
            v-if="shouldRenderComponentRegionPattern"
            class="layout-zone-pattern"
            :aria-label="`${normalizedComponentRegionPattern} ${componentAreaLabel}`"
            :style="{ '--layout-region-column-count': normalizedComponentRegionPattern.length }"
          >
            <span
              v-for="segment in componentRegionSegments"
              :key="segment.key"
              class="layout-zone-cell"
              :class="[`layout-zone-${segment.kind}`, { 'has-slot-content': hasComponentContent(segment.kind) }]"
              :style="{ gridColumn: `span ${segment.span}` }"
            >
              <component
                :is="getSlotComponent(segment.kind)"
                v-if="hasSlotComponentContent(segment.kind)"
                v-bind="getSlotWidgetProps(segment.kind)"
                class="layout-slot-content-widget"
                :context="slotWidgetContext"
                :data="[]"
              />
              <KpiMetricWidget
                v-else-if="hasInlineKpiComponentContent(segment.kind)"
                v-bind="getKpiComponentContentProps(segment.kind)"
                class="layout-slot-kpi-widget"
                :context="slotWidgetContext"
                :data="[]"
              />
              <span v-else class="layout-zone-label">{{ getRegionLabel(segment.kind) }}</span>
            </span>
          </div>
          <div v-else class="layout-placeholder">
            <strong>{{ placeholder }}</strong>
            <span v-if="zonePatternLabel">{{ zonePatternLabel }}</span>
          </div>
        </slot>
      </main>

      <aside v-if="hasSecondary" class="layout-span-secondary">
        <slot name="secondary" :spec="spec" :rows="rows" :title="title" :note="note">
          <span>Secondary zone</span>
          <strong>{{ spec.recommendedZoneCount }} zones</strong>
        </slot>
      </aside>
    </section>

    <footer v-if="hasFooter" class="layout-span-footer">
      <slot name="footer" :spec="spec" :rows="rows" :title="title" :note="note">
        <span>{{ spec.orientation }}</span>
        <em>{{ note }}</em>
      </slot>
    </footer>
  </section>
</template>

<style scoped>
.layout-span-template {
  container-type: size;
  display: grid;
  grid-template-rows: minmax(0, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  color: var(--text, #253044);
  font-size: 13px;
  line-height: 1.45;
}

.layout-span-template.has-chrome {
  grid-template-rows: auto minmax(0, 1fr);
}

.layout-span-template.has-footer {
  grid-template-rows: auto minmax(0, 1fr) auto;
}

.layout-span-header,
.layout-span-footer {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

.layout-span-title-group {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.layout-span-title-group span,
.layout-span-footer span {
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: 11px;
  font-weight: 800;
  line-height: 1.1;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.layout-span-title-group strong {
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-size: 14px;
  font-weight: 750;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-span-header em,
.layout-span-footer em {
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: 11px;
  font-style: normal;
  font-variant-numeric: tabular-nums;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-span-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.layout-span-template.is-four-by-three-scaffold,
.layout-span-template.has-region-pattern {
  gap: 0;
}

.layout-span-template.is-four-by-three-scaffold .layout-span-body,
.layout-span-template.has-region-pattern .layout-span-body {
  gap: 0;
}

.layout-span-template.has-secondary .layout-span-body {
  grid-template-columns: minmax(0, 1fr) minmax(120px, 32%);
}

.layout-span-primary,
.layout-span-secondary {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border-radius: 0;
}

.layout-span-primary {
  display: grid;
  place-items: stretch;
}

.layout-span-secondary {
  display: grid;
  align-content: start;
  gap: 6px;
  padding: 10px;
  background: rgba(0, 74, 198, 0.06);
  color: var(--muted, #667085);
}

.layout-span-secondary strong {
  color: var(--text-strong, #101828);
  font-size: 14px;
}

.layout-placeholder {
  display: grid;
  min-width: 0;
  min-height: 0;
  place-items: center;
  gap: 6px;
  padding: 10px;
  border: 1px dashed rgba(0, 74, 198, 0.38);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.12);
  text-align: center;
}

.layout-placeholder strong,
.layout-placeholder span {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.layout-placeholder strong {
  color: var(--text-strong, #101828);
  font-size: 13px;
  white-space: nowrap;
}

.layout-placeholder span {
  color: var(--muted, #667085);
  font-size: 12px;
}

.layout-zone-pattern {
  display: grid;
  grid-template-columns: repeat(var(--layout-region-column-count, 2), minmax(0, 1fr));
  gap: 3px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.layout-zone-cell {
  container-type: inline-size;
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 0;
  border: 1px dashed rgba(0, 74, 198, 0.38);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.12);
}

.layout-zone-cell.has-slot-content {
  place-items: stretch;
  padding: 0;
  border: 1px solid rgba(0, 74, 198, 0.14);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
}

.layout-zone-label {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  color: var(--primary, #004ac6);
  font-size: 11px;
  font-weight: 750;
  line-height: 1.2;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-content-widget,
.layout-slot-kpi-widget {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.layout-slot-content {
  --slot-tone: var(--primary, #004ac6);
  --slot-tone-soft: rgba(0, 87, 217, 0.1);
  display: grid;
  align-content: center;
  gap: 9px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  font-variant-numeric: tabular-nums;
}

.layout-slot-content.tone-success {
  --slot-tone: #0f8f5f;
  --slot-tone-soft: rgba(15, 143, 95, 0.12);
}

.layout-slot-content.tone-warning {
  --slot-tone: #b76b00;
  --slot-tone-soft: rgba(183, 107, 0, 0.14);
}

.layout-slot-content.tone-danger {
  --slot-tone: #ba1a1a;
  --slot-tone-soft: rgba(186, 26, 26, 0.14);
}

.layout-slot-content.tone-neutral {
  --slot-tone: var(--text-strong, #101828);
  --slot-tone-soft: rgba(16, 24, 40, 0.08);
}

.layout-slot-kpi-label,
.layout-slot-kpi-value,
.layout-slot-kpi-delta {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-kpi-label {
  color: var(--muted, #667085);
  font-size: clamp(10px, 7cqi, 12px);
  font-weight: 700;
}

.layout-slot-kpi-value {
  color: var(--slot-tone);
  font-size: clamp(18px, 18cqi, 40px);
  font-weight: 850;
  line-height: 1;
  letter-spacing: 0;
}

.layout-slot-kpi-value em {
  margin-left: 4px;
  color: var(--muted, #667085);
  font-size: 0.38em;
  font-style: normal;
  font-weight: 800;
}

.layout-slot-kpi-delta {
  justify-self: start;
  max-width: 100%;
  padding: 4px 8px;
  border-radius: 999px;
  background: var(--slot-tone-soft);
  color: var(--slot-tone);
  font-size: clamp(9px, 6cqi, 12px);
  font-weight: 750;
  line-height: 1;
}

.density-compact {
  gap: 6px;
}

.density-compact .layout-placeholder {
  padding: 3px;
}

.orientation-full-width.has-secondary .layout-span-body,
.mode-workspace-grid.has-secondary .layout-span-body {
  grid-template-columns: minmax(0, 1fr) minmax(180px, 26%);
}

@container (max-width: 360px) {
  .layout-span-template.has-secondary .layout-span-body {
    grid-template-columns: minmax(0, 1fr);
  }

  .layout-span-secondary {
    display: none;
  }
}
</style>
