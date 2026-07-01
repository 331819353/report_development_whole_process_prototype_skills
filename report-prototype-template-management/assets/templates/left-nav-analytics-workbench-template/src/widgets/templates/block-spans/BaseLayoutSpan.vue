<script setup lang="ts">
import { computed, type Component } from 'vue';
import { createLayoutSpanSpec } from './catalog';
import * as ComponentExamples from '../component-examples';
import {
  createComponentExampleDefaultConfig,
  getComponentExampleConfigSchemaById,
} from '../component-examples/config';
import type { DashboardWidgetActionEvent } from '../../../types/actions';
import type { RegisteredWidgetConfig, WidgetVisualType } from '../../types';
import type { ComponentRegionPattern, LayoutSpanTemplateProps } from './types';

type Props = LayoutSpanTemplateProps;
type ComponentSlot = NonNullable<LayoutSpanTemplateProps['componentSlots']>[number];

const props = withDefaults(defineProps<Props>(), {
  title: '',
  note: '',
  showChrome: true,
  showFooter: true,
  secondary: 'auto',
  density: 'auto',
  placeholder: '3 组件区',
  zonePatternLabel: '',
  componentRegionPattern: 'A',
  autoComponentSlots: false,
  componentAreaPaddingPx: 2,
  componentSlotGapPx: 10,
});

const emit = defineEmits<{
  (event: 'dashboard-action', payload: DashboardWidgetActionEvent): void;
}>();

const slotComponentRegistry: Record<string, Component> = {
  ...ComponentExamples,
};
const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

const mergeComponentExampleConfig = (...configs: unknown[]) =>
  configs.reduce<Record<string, Record<string, unknown>>>((result, config) => {
    if (!isRecord(config)) {
      return result;
    }

    Object.entries(config).forEach(([section, sectionConfig]) => {
      if (isRecord(sectionConfig)) {
        result[section] = {
          ...(result[section] ?? {}),
          ...sectionConfig,
        };
      }
    });

    return result;
  }, {});

const getSlotConfigurableProps = (slot: ComponentSlot) => ({
  ...((slot.widget?.props ?? {}) as Record<string, unknown>),
  ...(slot.props ?? {}),
  ...(slot.widgetProps ?? {}),
});

const resolveComponentExampleWidget = (slot?: ComponentSlot): RegisteredWidgetConfig | undefined => {
  if (!slot) {
    return undefined;
  }

  const schema = getComponentExampleConfigSchemaById(slot.componentExampleId);

  if (!schema) {
    return slot.widget;
  }

  const explicitProps = getSlotConfigurableProps(slot);
  const { config: explicitPropsConfig, ...componentProps } = explicitProps;

  return {
    ...(slot.widget ?? {}),
    type: schema.widgetType,
    visualType: (slot.widget?.visualType ?? schema.visualType) as WidgetVisualType,
    dataPolicy: slot.widget?.dataPolicy ?? slot.dataPolicy ?? 'static',
    data: slot.widget?.data ?? slot.data,
    dataBinding: slot.widget?.dataBinding ?? slot.dataBinding,
    filterScope: slot.widget?.filterScope ?? slot.filterScope,
    actions: slot.widget?.actions ?? slot.actions,
    displayTitle: slot.widget?.displayTitle ?? slot.label ?? schema.label,
    metricName: slot.widget?.metricName ?? slot.label ?? schema.label,
    props: {
      title: slot.label ?? schema.label,
      ...componentProps,
      config: mergeComponentExampleConfig(
        createComponentExampleDefaultConfig(schema),
        (slot.widget?.props as Record<string, unknown> | undefined)?.config,
        explicitPropsConfig,
        slot.config,
      ),
    },
  } as RegisteredWidgetConfig;
};
const spec = computed(() => createLayoutSpanSpec(props.cols ?? 2, props.rows ?? 2));
const shouldUseAutoComponentSlots = computed(() => props.autoComponentSlots === true);
const isFourByThreeScaffold = computed(() => spec.value.id === '04x03');
const normalizeComponentRegionPatternRows = (pattern: ComponentRegionPattern) => {
  const rows = pattern
    .toUpperCase()
    .split('|')
    .map((row) => row.trim())
    .filter(Boolean);

  if (rows.length === 0 || rows.length > 8) {
    return ['A'];
  }

  const columnCount = rows[0]?.length ?? 0;
  const isValid = columnCount > 0
    && columnCount <= 12
    && rows.every((row) => row.length === columnCount && /^[A-Z]+$/.test(row));

  return isValid ? rows : ['A'];
};
const normalizedComponentRegionPatternRows = computed(() =>
  normalizeComponentRegionPatternRows(props.componentRegionPattern),
);
const normalizedComponentRegionPattern = computed<ComponentRegionPattern>(() =>
  normalizedComponentRegionPatternRows.value.join('|'),
);
const shouldRenderComponentRegionPattern = computed(() => normalizedComponentRegionPatternRows.value.length > 0);
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
const componentSlotWidgetByRegion = computed(() => new Map(
  (props.componentSlots ?? []).map((slot, index) => [
    (slot.regionKey ?? slot.id ?? String.fromCharCode(65 + index)).toLowerCase().slice(0, 1),
    resolveComponentExampleWidget(slot),
  ]),
));
const componentContractByRegion = computed(() => new Map(
  (props.componentSlotContracts ?? []).map((contract, index) => [
    (contract.regionKey ?? contract.id ?? String.fromCharCode(65 + index)).toLowerCase().slice(0, 1),
    contract,
  ]),
));
const componentRegionSegments = computed(() => {
  const patternRows = normalizedComponentRegionPatternRows.value;
  const orderedKinds: string[] = [];

  patternRows.forEach((row) => {
    Array.from(row).forEach((rawKind) => {
      const kind = rawKind.toLowerCase();

      if (!orderedKinds.includes(kind)) {
        orderedKinds.push(kind);
      }
    });
  });

  return orderedKinds.map((kind) => {
    const cells: Array<{ row: number; column: number }> = [];

    patternRows.forEach((row, rowIndex) => {
      Array.from(row).forEach((rawKind, columnIndex) => {
        if (rawKind.toLowerCase() === kind) {
          cells.push({ row: rowIndex, column: columnIndex });
        }
      });
    });

    const rowIndexes = cells.map((cell) => cell.row);
    const columnIndexes = cells.map((cell) => cell.column);
    const rowStart = Math.min(...rowIndexes) + 1;
    const rowEnd = Math.max(...rowIndexes) + 2;
    const columnStart = Math.min(...columnIndexes) + 1;
    const columnEnd = Math.max(...columnIndexes) + 2;

    return {
      key: `${kind}-${rowStart}-${columnStart}`,
      kind,
      columnStart,
      columnEnd,
      rowStart,
      rowEnd,
    };
  });
});
const componentRegionColumnCount = computed(() =>
  normalizedComponentRegionPatternRows.value[0]?.length ?? 1,
);
const componentRegionRowCount = computed(() =>
  normalizedComponentRegionPatternRows.value.length,
);
const componentSlotCount = computed(() => componentRegionSegments.value.length);
const getRegionLabel = (kind: string) => {
  const slot = componentSlotByRegion.value.get(kind);
  const contract = componentContractByRegion.value.get(kind);

  return slot?.label ?? contract?.label ?? `${componentAreaLabel.value} ${kind.toUpperCase()}`;
};
const getRegionSlot = (kind: string) => componentSlotByRegion.value.get(kind);
const getSlotWidget = (kind: string) => componentSlotWidgetByRegion.value.get(kind);
const getSlotContent = (kind: string) => getRegionSlot(kind)?.content;
const getSlotContentLabel = (kind: string) => {
  const content = getSlotContent(kind);

  return content?.label ?? content?.title ?? getRegionLabel(kind);
};
const getSlotComponent = (kind: string) => {
  const widget = getSlotWidget(kind);

  return widget ? slotComponentRegistry[widget.type] ?? null : null;
};
const getSlotWidgetRawProps = (kind: string) => (getSlotWidget(kind)?.props ?? {}) as Record<string, unknown>;
const getSlotTitleAutoConfig = () =>
  componentSlotCount.value > 1
    ? { visible: true }
    : { visible: false, unitVisible: false };
const getSlotKeyCandidates = (slot?: ComponentSlot) => [
  slot?.id,
  slot?.regionKey,
  slot?.templateSlotId,
].filter((value): value is string => Boolean(value));
const getSlotData = (kind: string) => {
  const slot = getRegionSlot(kind);

  for (const key of getSlotKeyCandidates(slot)) {
    const rows = props.slotData?.[key];

    if (rows) {
      return rows;
    }
  }

  return [];
};
const getSlotContext = (kind: string) => {
  const slot = getRegionSlot(kind);

  for (const key of getSlotKeyCandidates(slot)) {
    const context = props.slotContexts?.[key];

    if (context) {
      return context;
    }
  }

  return {
    ...props.context,
    sourceSlotId: slot?.id,
    sourceSlotLabel: slot?.label,
    sourceComponentExampleId: slot?.componentExampleId,
  };
};
const isRecordValue = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const getActiveTitlePill = (kind: string) => {
  const pill = getSlotContext(kind).activeTitlePill;

  return isRecordValue(pill) ? pill : {};
};
const getActiveTitlePillProps = (kind: string) => {
  const pillProps = getActiveTitlePill(kind).props;

  return isRecordValue(pillProps) ? pillProps : {};
};
const getActiveTitlePillDataBinding = (kind: string) => {
  const binding = getActiveTitlePill(kind).dataBinding;

  return isRecordValue(binding) ? binding as ComponentSlot['dataBinding'] : undefined;
};
const getByPath = (source: unknown, path?: string) => {
  if (!path) {
    return source;
  }

  return path.split('.').reduce<unknown>((current, segment) => {
    if (current && typeof current === 'object' && segment in current) {
      return (current as Record<string, unknown>)[segment];
    }

    return undefined;
  }, source);
};
const getRowValue = (row: unknown, field?: string) => (isRecordValue(row) && field ? getByPath(row, field) : undefined);
const getFirstRow = (data: unknown[]) => data.find(isRecordValue) ?? {};
const buildItemFromRow = (row: unknown, fields: NonNullable<ComponentSlot['dataBinding']>['itemFields'] = {}) => {
  const entries = Object.entries(fields)
    .map(([target, field]) => [target, getRowValue(row, field)] as const)
    .filter(([, value]) => value !== undefined);

  return Object.fromEntries(entries);
};
const resolvePropExpression = (expression: string, data: unknown[], context: unknown) => {
  if (expression === '$data.rows') {
    return data;
  }

  if (expression.startsWith('$data.firstRow.')) {
    return getByPath(getFirstRow(data), expression.slice('$data.firstRow.'.length));
  }

  if (expression.startsWith('$context.')) {
    return getByPath(context, expression.slice('$context.'.length));
  }

  if (expression.startsWith('$$')) {
    return expression.slice(1);
  }

  return expression;
};
const getDataBoundProps = (kind: string) => {
  const slot = getRegionSlot(kind);
  const widget = getSlotWidget(kind);
  const binding = getActiveTitlePillDataBinding(kind) ?? slot?.dataBinding ?? widget?.dataBinding;
  const data = getSlotData(kind);
  const context = getSlotContext(kind);
  const propsFromData: Record<string, unknown> = {};

  if (!binding) {
    return propsFromData;
  }

  if (binding.propsObjectField) {
    const dataProps = getByPath(getFirstRow(data), binding.propsObjectField);

    if (isRecordValue(dataProps)) {
      Object.assign(propsFromData, dataProps);
    }
  }

  if (binding.mode === 'rows' || binding.rowsProp) {
    propsFromData[binding.rowsProp ?? 'rows'] = data;
  }

  if (binding.firstRowProps) {
    const firstRow = getFirstRow(data);

    Object.entries(binding.firstRowProps).forEach(([target, field]) => {
      propsFromData[target] = getByPath(firstRow, field);
    });
  }

  if (binding.categoryField) {
    propsFromData.categories = data
      .map((row) => getRowValue(row, binding.categoryField))
      .filter((value) => value !== undefined);
  }

  if (binding.series?.length) {
    propsFromData.series = binding.series.map((series) => ({
      ...series,
      values: data.map((row) => getRowValue(row, series.valueField)),
    }));
  } else if (binding.valueField) {
    propsFromData.values = data.map((row) => getRowValue(row, binding.valueField));
  }

  if (binding.itemFields) {
    propsFromData.items = data.map((row) => buildItemFromRow(row, binding.itemFields));
  }

  if (binding.propExpressions) {
    Object.entries(binding.propExpressions).forEach(([target, expression]) => {
      propsFromData[target] = resolvePropExpression(expression, data, context);
    });
  }

  return propsFromData;
};
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
const getSlotWidgetProps = (kind: string) => {
  const widgetProps = getSlotWidgetRawProps(kind);
  const dataBoundProps = getDataBoundProps(kind);
  const activeTitlePillProps = getActiveTitlePillProps(kind);

  return {
    ...widgetProps,
    ...dataBoundProps,
    ...activeTitlePillProps,
    config: mergeComponentExampleConfig(
      widgetProps.config,
      dataBoundProps.config,
      activeTitlePillProps.config,
      {
        title: getSlotTitleAutoConfig(),
      },
    ),
    contentAreaTitle: getSlotContentAreaTitle(kind),
    slotCount: componentSlotCount.value,
    showContentTitle: componentSlotCount.value > 1,
  };
};
const handleSlotDashboardAction = (kind: string, event: DashboardWidgetActionEvent) => {
  const slot = getRegionSlot(kind);

  emit('dashboard-action', {
    ...event,
    sourceSlotId: event.sourceSlotId ?? slot?.id,
    sourceSlotLabel: event.sourceSlotLabel ?? slot?.label,
    sourceComponentExampleId: event.sourceComponentExampleId ?? slot?.componentExampleId,
    payload: {
      sourceSlotId: slot?.id,
      sourceSlotLabel: slot?.label,
      sourceComponentExampleId: slot?.componentExampleId,
      ...(event.payload ?? {}),
    },
  });
};
const getSlotActions = (kind: string) => getSlotWidget(kind)?.actions ?? getRegionSlot(kind)?.actions;
const isSlotInteractive = (kind: string) => Boolean(getSlotActions(kind)?.slotClick);
const shouldIgnoreSlotClick = (event: Event) => {
  const target = event.target;
  const currentTarget = event.currentTarget;

  if (!(target instanceof HTMLElement)) {
    return false;
  }

  const nestedInteractive = target.closest('button,a,input,select,textarea,[role="button"]');

  return Boolean(nestedInteractive && nestedInteractive !== currentTarget);
};
const handleSlotClick = (kind: string, event: Event) => {
  if (!isSlotInteractive(kind) || shouldIgnoreSlotClick(event)) {
    return;
  }

  const slot = getRegionSlot(kind);
  const widget = getSlotWidget(kind);
  const widgetProps = (widget?.props ?? {}) as Record<string, unknown>;

  emit('dashboard-action', {
    name: 'slotClick',
    sourceSlotId: slot?.id,
    sourceSlotLabel: slot?.label,
    sourceComponentExampleId: slot?.componentExampleId,
    payload: {
      sourceSlotId: slot?.id,
      sourceSlotLabel: slot?.label,
      sourceComponentExampleId: slot?.componentExampleId,
      componentDataKey: widgetProps.componentDataKey,
      firstRow: getSlotData(kind)[0],
      filters: props.context?.filters,
      activeTitlePillId: props.context?.activeTitlePillId,
    },
  });
};
const hasSlotComponentContent = (kind: string) => {
  const widget = getSlotWidget(kind);

  if (!widget || !getSlotComponent(kind)) {
    return false;
  }

  return widget.data ? getSlotData(kind).length > 0 : true;
};
const shouldShowInlineContentTitle = (kind: string) => componentSlotCount.value > 1 && Boolean(getSlotContent(kind));
const getSlotContentType = (kind: string) => {
  const type = getSlotContent(kind)?.type;

  return type === 'kpi' ? 'metric' : type ?? 'summary';
};
const getPercentStyle = (percent?: number) => ({
  '--slot-bar-percent': `${Math.max(0, Math.min(100, Number(percent ?? 0)))}%`,
});
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
        'is-auto-component-slots': shouldUseAutoComponentSlots,
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
            :style="{
              '--layout-region-column-count': componentRegionColumnCount,
              '--layout-region-row-count': componentRegionRowCount,
              '--layout-region-gap': shouldUseAutoComponentSlots ? `${props.componentSlotGapPx}px` : undefined,
              '--layout-region-padding': shouldUseAutoComponentSlots ? `${props.componentAreaPaddingPx}px` : undefined,
            }"
          >
            <span
              v-for="segment in componentRegionSegments"
              :key="segment.key"
              class="layout-zone-cell"
              :class="[
                `layout-zone-${segment.kind}`,
                {
                  'has-slot-content': hasSlotComponentContent(segment.kind) || getSlotContent(segment.kind),
                  'is-slot-interactive': isSlotInteractive(segment.kind),
                },
              ]"
              :style="{
                gridColumn: `${segment.columnStart} / ${segment.columnEnd}`,
                gridRow: `${segment.rowStart} / ${segment.rowEnd}`,
              }"
              :role="isSlotInteractive(segment.kind) ? 'button' : undefined"
              :tabindex="isSlotInteractive(segment.kind) ? 0 : undefined"
              @click="handleSlotClick(segment.kind, $event)"
              @keydown.enter="handleSlotClick(segment.kind, $event)"
              @keydown.space.prevent="handleSlotClick(segment.kind, $event)"
            >
              <component
                :is="getSlotComponent(segment.kind)"
                v-if="hasSlotComponentContent(segment.kind)"
                v-bind="getSlotWidgetProps(segment.kind)"
                class="layout-slot-content-widget"
                :context="getSlotContext(segment.kind)"
                :data="getSlotData(segment.kind)"
                @dashboard-action="handleSlotDashboardAction(segment.kind, $event)"
              />
              <div
                v-else-if="getSlotContent(segment.kind)"
                class="layout-slot-content"
                :class="[
                  `layout-slot-content-${getSlotContentType(segment.kind)}`,
                  { 'has-content-title': shouldShowInlineContentTitle(segment.kind) },
                ]"
              >
                <header
                  v-if="shouldShowInlineContentTitle(segment.kind)"
                  class="layout-slot-content-title"
                >
                  {{ getSlotContentLabel(segment.kind) }}
                </header>
                <header v-else class="layout-slot-content-header">
                  <span>{{ getSlotContent(segment.kind)?.eyebrow ?? getRegionLabel(segment.kind) }}</span>
                  <strong>{{ getSlotContent(segment.kind)?.title ?? getRegionLabel(segment.kind) }}</strong>
                </header>

                <section v-if="getSlotContentType(segment.kind) === 'metric'" class="layout-slot-metric">
                  <strong>
                    {{ getSlotContent(segment.kind)?.value }}
                    <em v-if="getSlotContent(segment.kind)?.unit">{{ getSlotContent(segment.kind)?.unit }}</em>
                  </strong>
                  <span v-if="getSlotContent(segment.kind)?.delta">{{ getSlotContent(segment.kind)?.delta }}</span>
                </section>

                <section v-else-if="getSlotContentType(segment.kind) === 'trend'" class="layout-slot-bars">
                  <div
                    v-for="row in getSlotContent(segment.kind)?.rows ?? []"
                    :key="row.label"
                    class="layout-slot-bar-row"
                  >
                    <span>{{ row.label }}</span>
                    <div class="layout-slot-bar-track">
                      <i :style="getPercentStyle(row.percent)"></i>
                    </div>
                    <strong>{{ row.value }}</strong>
                  </div>
                </section>

                <section v-else-if="getSlotContentType(segment.kind) === 'funnel'" class="layout-slot-funnel">
                  <div
                    v-for="row in getSlotContent(segment.kind)?.rows ?? []"
                    :key="row.label"
                    class="layout-slot-funnel-row"
                    :style="getPercentStyle(row.percent)"
                  >
                    <span>{{ row.label }}</span>
                    <strong>{{ row.value }}</strong>
                  </div>
                </section>

                <section v-else class="layout-slot-summary">
                  <div
                    v-for="row in getSlotContent(segment.kind)?.rows ?? []"
                    :key="row.label"
                    class="layout-slot-summary-row"
                    :class="row.tone ? `tone-${row.tone}` : ''"
                  >
                    <span>{{ row.label }}</span>
                    <strong>{{ row.value }}</strong>
                  </div>
                </section>
              </div>
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
  gap: clamp(4px, 1.2cqw, 10px);
  align-items: center;
  justify-content: space-between;
  min-width: 0;
}

.layout-span-title-group {
  display: grid;
  min-width: 0;
  gap: clamp(1px, 0.6cqh, 2px);
}

.layout-span-title-group span,
.layout-span-footer span {
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: clamp(8px, min(2.8cqw, 4cqh), 11px);
  font-weight: 800;
  line-height: 1.1;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.layout-span-title-group strong {
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-size: clamp(10px, min(3.6cqw, 5cqh), 14px);
  font-weight: 750;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-span-header em,
.layout-span-footer em {
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: clamp(8px, min(2.8cqw, 4cqh), 11px);
  font-style: normal;
  font-variant-numeric: tabular-nums;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-span-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(4px, min(1.4cqw, 2.4cqh), 10px);
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
  gap: clamp(3px, 1.6cqh, 6px);
  padding: clamp(4px, min(1.8cqw, 3cqh), 10px);
  background: rgba(0, 74, 198, 0.06);
  color: var(--muted, #667085);
}

.layout-span-secondary strong {
  color: var(--text-strong, #101828);
  font-size: clamp(10px, min(3.4cqw, 5cqh), 14px);
}

.layout-placeholder {
  display: grid;
  min-width: 0;
  min-height: 0;
  place-items: center;
  gap: clamp(3px, 1.8cqh, 6px);
  padding: clamp(4px, min(1.8cqw, 3cqh), 10px);
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
  font-size: clamp(9px, min(3.2cqw, 5cqh), 13px);
  white-space: nowrap;
}

.layout-placeholder span {
  color: var(--muted, #667085);
  font-size: clamp(8px, min(3cqw, 4.5cqh), 12px);
}

.layout-zone-pattern {
  display: grid;
  grid-template-columns: repeat(var(--layout-region-column-count, 2), minmax(0, 1fr));
  grid-template-rows: repeat(var(--layout-region-row-count, 1), minmax(0, 1fr));
  gap: var(--layout-region-gap, clamp(1px, 0.8cqw, 3px));
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--layout-region-padding, 0);
}

.layout-zone-cell {
  container-type: size;
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
  border: 1px solid rgba(0, 115, 229, 0.14);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
}

.layout-zone-cell.is-slot-interactive {
  cursor: pointer;
}

.layout-zone-cell.is-slot-interactive:focus-visible {
  outline: 2px solid rgba(0, 115, 229, 0.45);
  outline-offset: 2px;
}

.layout-zone-cell.is-slot-interactive:hover {
  border-color: rgba(0, 115, 229, 0.34);
}

.layout-zone-label {
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  color: var(--primary, #004ac6);
  font-size: clamp(8px, min(5cqw, 8cqh), 11px);
  font-weight: 750;
  line-height: 1.2;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-content-widget {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}

.layout-slot-content {
  container-type: size;
  --layout-slot-title-height: clamp(14px, 14cqh, 20px);
  --layout-slot-title-size: clamp(9px, min(6cqw, 9cqh), 12px);
  --layout-slot-title-line: calc(var(--layout-slot-title-size) + 2px);
  --layout-slot-eyebrow-size: clamp(8px, min(5cqw, 8cqh), 11px);
  --layout-slot-heading-size: clamp(10px, min(8cqw, 13cqh), 15px);
  --layout-slot-metric-size: clamp(18px, min(18cqw, 32cqh), 40px);
  --layout-slot-chip-size: clamp(8px, min(5cqw, 8cqh), 12px);
  --layout-slot-row-size: clamp(8px, min(4.8cqw, 8cqh), 11px);
  --layout-slot-gap: clamp(2px, 3cqh, 8px);
  --layout-slot-pad: clamp(3px, min(2cqw, 3cqh), 8px);
  --layout-slot-row-gap: clamp(3px, min(2cqw, 3cqh), 7px);
  --layout-slot-inline-gap: clamp(3px, 2cqw, 8px);
  --layout-slot-label-width: clamp(28px, 24cqw, 42px);
  --layout-slot-row-min-height: clamp(15px, 16cqh, 24px);
  --layout-slot-track-height: clamp(4px, 4cqh, 7px);
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  gap: 0;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 0;
  border-radius: var(--component-example-area-radius, 8px);
  background: var(--component-example-area-background, transparent);
}

.layout-slot-content.has-content-title {
  grid-template-rows: var(--layout-slot-title-height) minmax(0, 1fr);
}

.layout-slot-content-title {
  display: block;
  height: var(--layout-slot-title-height);
  min-width: 0;
  overflow: hidden;
  padding: clamp(1px, 1cqh, 3px) clamp(4px, 2cqw, 8px) 0;
  color: var(--text-strong, #101828);
  font-size: var(--layout-slot-title-size);
  font-weight: 750;
  line-height: var(--layout-slot-title-line);
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-content-header {
  display: grid;
  align-content: end;
  gap: clamp(1px, 1.6cqh, 2px);
  min-width: 0;
  padding: 0 var(--layout-slot-pad);
}

.layout-slot-content-header span {
  overflow: hidden;
  color: var(--muted, #667085);
  font-size: var(--layout-slot-eyebrow-size);
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-content-header strong {
  overflow: hidden;
  color: var(--text-strong, #101828);
  font-size: var(--layout-slot-heading-size);
  font-weight: 800;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-metric {
  display: grid;
  align-content: center;
  gap: var(--layout-slot-gap);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--layout-slot-pad);
}

.layout-slot-metric strong {
  overflow: hidden;
  color: var(--primary, #004ac6);
  font-size: var(--layout-slot-metric-size);
  font-weight: 850;
  line-height: 1.25;
  letter-spacing: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-metric em {
  margin-left: 4px;
  color: var(--muted, #667085);
  font-size: 0.42em;
  font-style: normal;
  font-weight: 800;
}

.layout-slot-metric span {
  width: fit-content;
  max-width: 100%;
  overflow: hidden;
  padding: clamp(2px, 1cqh, 3px) clamp(4px, 2cqw, 8px);
  border: 1px solid rgba(0, 87, 217, 0.14);
  border-radius: 999px;
  background: rgba(0, 87, 217, 0.08);
  color: var(--primary, #004ac6);
  font-size: var(--layout-slot-chip-size);
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-bars,
.layout-slot-summary {
  display: grid;
  align-content: center;
  gap: var(--layout-slot-row-gap);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--layout-slot-pad);
}

.layout-slot-bar-row,
.layout-slot-summary-row {
  display: grid;
  grid-template-columns: minmax(var(--layout-slot-label-width), 0.8fr) minmax(0, 1fr) auto;
  gap: var(--layout-slot-inline-gap);
  align-items: center;
  min-width: 0;
  color: var(--muted, #667085);
  font-size: var(--layout-slot-row-size);
}

.layout-slot-summary-row {
  grid-template-columns: minmax(0, 1fr) auto;
  min-height: var(--layout-slot-row-min-height);
  padding: 0 var(--layout-slot-pad);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.42);
}

.layout-slot-bar-row span,
.layout-slot-summary-row span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-bar-row strong,
.layout-slot-summary-row strong {
  color: var(--text-strong, #101828);
  font-size: var(--layout-slot-row-size);
  font-weight: 800;
  white-space: nowrap;
}

.layout-slot-bar-track {
  height: var(--layout-slot-track-height);
  overflow: hidden;
  border-radius: 999px;
  background: rgba(0, 87, 217, 0.1);
}

.layout-slot-bar-track i {
  display: block;
  width: var(--slot-bar-percent, 0%);
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #76b7ff, #0067df);
}

.layout-slot-funnel {
  display: grid;
  align-content: center;
  gap: var(--layout-slot-row-gap);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  padding: var(--layout-slot-pad);
}

.layout-slot-funnel-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: var(--layout-slot-inline-gap);
  align-items: center;
  justify-self: center;
  width: max(42%, var(--slot-bar-percent, 70%));
  max-width: 100%;
  min-height: var(--layout-slot-row-min-height);
  padding: 0 var(--layout-slot-pad);
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(0, 103, 223, 0.94), rgba(99, 181, 255, 0.82));
  color: #fff;
  font-size: var(--layout-slot-row-size);
  font-weight: 800;
}

.layout-slot-funnel-row span,
.layout-slot-funnel-row strong {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layout-slot-summary-row.tone-warning strong {
  color: #d97706;
}

.layout-slot-summary-row.tone-danger strong {
  color: #dc2626;
}

.layout-slot-summary-row.tone-primary strong {
  color: var(--primary, #004ac6);
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
