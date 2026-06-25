<script setup lang="ts">
import { computed } from 'vue';
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
  placeholder: '组件区域',
  zonePatternLabel: '',
  componentRegionPattern: 'AA',
});

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
const componentAreaLabel = computed(() => props.placeholder || '组件区域');
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
const getRegionLabel = (kind: string) => {
  const slot = componentSlotByRegion.value.get(kind);
  const contract = componentContractByRegion.value.get(kind);

  return slot?.label ?? contract?.label ?? `${componentAreaLabel.value} ${kind.toUpperCase()}`;
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
              :class="`layout-zone-${segment.kind}`"
              :style="{ gridColumn: `span ${segment.span}` }"
            >
              <span class="layout-zone-label">{{ getRegionLabel(segment.kind) }}</span>
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
  display: grid;
  place-items: center;
  min-width: 0;
  min-height: 0;
  border: 1px dashed rgba(0, 74, 198, 0.38);
  border-radius: 0;
  background: rgba(255, 255, 255, 0.12);
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
