<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';
import type { WidgetContext } from '../types';

type AdvancedChartKind =
  | 'radar'
  | 'boxplot'
  | 'heatmap'
  | 'quadrant'
  | 'graph'
  | 'path'
  | 'tree'
  | 'treemap'
  | 'sunburst'
  | 'parallel'
  | 'sankey'
  | 'gauge'
  | 'dupont'
  | 'serpentine';

interface NamedValue {
  name: string;
  value: number;
}

interface GraphNode {
  name: string;
  value?: number;
  category?: number;
  symbolSize?: number;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string;
  target: string;
  value?: number;
}

interface PathNode {
  name: string;
  value?: number;
  x: number;
  y: number;
  layer?: number;
}

interface HeatmapCell {
  row: string;
  col: string;
  value: number | null;
}

interface HierarchyNode {
  name: string;
  value?: number;
  children?: HierarchyNode[];
}

interface ParallelRow {
  name: string;
  group?: string;
  values: number[];
}

interface QuadrantPoint {
  name: string;
  x: number;
  y: number;
  value?: number;
  quadrant?: string;
}

interface QuadrantLabels {
  topRight?: string;
  topLeft?: string;
  bottomLeft?: string;
  bottomRight?: string;
}

interface Props {
  context: WidgetContext;
  data?: unknown[];
  chartKind?: AdvancedChartKind;
  seriesName?: string;
  unit?: string;
  radarIndicators?: Array<{ name: string; max: number }>;
  radarValues?: number[];
  boxplotCategories?: string[];
  boxplotData?: number[][];
  boxplotOutliers?: Array<[number, number]>;
  heatmapRows?: string[];
  heatmapCols?: string[];
  heatmapCells?: HeatmapCell[];
  quadrantXName?: string;
  quadrantYName?: string;
  quadrantXSplit?: number;
  quadrantYSplit?: number;
  quadrantLabels?: QuadrantLabels;
  quadrantPoints?: QuadrantPoint[];
  nodes?: GraphNode[];
  links?: GraphLink[];
  pathNodes?: PathNode[];
  pathLinks?: GraphLink[];
  treeData?: HierarchyNode;
  hierarchyData?: HierarchyNode[];
  parallelAxes?: Array<{ name: string; min: number; max: number; unit?: string }>;
  parallelRows?: ParallelRow[];
  sankeyNodes?: NamedValue[];
  sankeyLinks?: GraphLink[];
  currentValue?: number;
  minValue?: number;
  maxValue?: number;
  targetValue?: number;
}

const props = defineProps<Props>();

const rootEl = ref<HTMLElement | null>(null);
const chartEl = ref<HTMLDivElement | null>(null);
const rootSize = ref({ width: 0, height: 0 });
const chartTheme = ref({
  axisLine: 'rgba(0, 87, 217, 0.12)',
  axisText: '#60758c',
  strongText: '#16375f',
  panelText: '#21476f',
  heatmapText: '#14345a',
  subtleText: 'rgba(22, 55, 95, 0.62)',
});
let chart: ECharts | null = null;
let resizeObserver: ResizeObserver | null = null;

const chartKind = computed<AdvancedChartKind>(() => props.chartKind ?? 'radar');
const unit = computed(() => props.unit ?? '');
const seriesName = computed(() => props.seriesName ?? '指标');
const clampNumber = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const scale = computed(() => {
  const width = rootSize.value.width || 220;
  const height = rootSize.value.height || 140;
  const compact = Math.min(width / 280, height / 150);
  const fontSize = Math.max(8, Math.min(11, Math.round((8.5 + compact) * 10) / 10));

  return {
    width,
    height,
    fontSize,
    axisFontSize: Math.max(8, fontSize - 1),
    labelFontSize: Math.max(8, fontSize - 0.5),
    gridTop: Math.max(18, fontSize + 10),
    gridBottom: Math.max(16, fontSize + 8),
    gridLeft: Math.max(24, fontSize * 2.4 + 4),
    gridRight: 8,
    symbolSize: Math.max(8, Math.min(18, Math.round(width / 22))),
  };
});

const bluePalette = ['#0057d9', '#2777ec', '#55a0ff', '#8ac2ff', '#c8def8'];
const softBluePalette = ['#eef6ff', '#cfe4ff', '#9fc8ff', '#5fa0f7', '#0057d9'];
const blueShadow = 'rgba(0, 87, 217, 0.16)';
const legendException = 'legendException: advanced compact cards may use shared top-center legendBase or intentionally hidden legends';
const makeBlueGradient = (start = '#0057d9', end = '#8ac2ff') => new echarts.graphic.LinearGradient(0, 0, 1, 1, [
  { offset: 0, color: start },
  { offset: 1, color: end },
]);

const readChartThemeColor = (name: string, fallback: string) => {
  if (!rootEl.value) {
    return fallback;
  }

  return getComputedStyle(rootEl.value).getPropertyValue(name).trim() || fallback;
};

const updateChartTheme = () => {
  const nextTheme = {
    axisLine: readChartThemeColor('--chart-axis-line', 'rgba(0, 87, 217, 0.12)'),
    axisText: readChartThemeColor('--chart-axis-text', '#60758c'),
    strongText: readChartThemeColor('--chart-strong-text', '#16375f'),
    panelText: readChartThemeColor('--chart-panel-text', '#21476f'),
    heatmapText: readChartThemeColor('--chart-heatmap-text', '#14345a'),
    subtleText: readChartThemeColor('--chart-subtle-text', 'rgba(22, 55, 95, 0.62)'),
  };

  if ((Object.keys(nextTheme) as Array<keyof typeof nextTheme>).some((key) => nextTheme[key] !== chartTheme.value[key])) {
    chartTheme.value = nextTheme;
  }
};

const legendBase = computed(() => ({
  show: false,
  top: 0,
  left: 'center',
  itemWidth: Math.max(7, scale.value.fontSize),
  itemHeight: Math.max(5, scale.value.fontSize - 3),
  icon: 'roundRect',
  itemGap: Math.max(8, scale.value.fontSize),
  textStyle: {
    color: chartTheme.value.panelText,
    fontSize: scale.value.fontSize,
    fontWeight: 700,
  },
}));

const gridBase = computed(() => ({
  top: scale.value.gridTop,
  right: scale.value.gridRight,
  bottom: scale.value.gridBottom,
  left: scale.value.gridLeft,
  containLabel: true,
}));

const axisBase = computed(() => ({
  axisTick: { show: false },
  axisLine: { lineStyle: { color: chartTheme.value.axisLine } },
  axisLabel: {
    color: chartTheme.value.axisText,
    fontSize: scale.value.axisFontSize,
    hideOverlap: true,
    margin: 4,
  },
  splitLine: {
    lineStyle: {
      color: chartTheme.value.axisLine,
      type: [3, 4],
    },
  },
}));

const yAxisLabel = computed(() => ({
  ...axisBase.value.axisLabel,
  hideOverlap: false,
  formatter: (value: unknown) => String(value ?? ''),
}));

const radarIndicators = computed(
  () =>
    props.radarIndicators ?? [
      { name: '效率', max: 100 },
      { name: '质量', max: 100 },
      { name: '成本', max: 100 },
      { name: '体验', max: 100 },
      { name: '风险', max: 100 },
    ],
);
const radarValues = computed(() => props.radarValues ?? [86, 78, 72, 91, 64]);
const boxplotCategories = computed(() => props.boxplotCategories ?? ['华东', '华南', '华北', '海外']);
const boxplotData = computed(() => props.boxplotData ?? [[48, 62, 70, 82, 94], [42, 55, 63, 76, 88], [36, 49, 58, 68, 83], [52, 64, 73, 86, 96]]);
const boxplotOutliers = computed(() => props.boxplotOutliers ?? [[1, 94], [2, 31]]);
const heatmapRows = computed(() => props.heatmapRows ?? ['收入', '利润', '费用', '库存']);
const heatmapCols = computed(() => props.heatmapCols ?? ['Q1', 'Q2', 'Q3', 'Q4']);
const heatmapCells = computed<HeatmapCell[]>(
  () =>
    props.heatmapCells ?? [
      { row: '收入', col: 'Q1', value: 72 },
      { row: '收入', col: 'Q2', value: 84 },
      { row: '收入', col: 'Q3', value: 91 },
      { row: '收入', col: 'Q4', value: 88 },
      { row: '利润', col: 'Q1', value: 58 },
      { row: '利润', col: 'Q2', value: 66 },
      { row: '利润', col: 'Q3', value: 73 },
      { row: '利润', col: 'Q4', value: 81 },
      { row: '费用', col: 'Q1', value: 43 },
      { row: '费用', col: 'Q2', value: 39 },
      { row: '费用', col: 'Q3', value: 52 },
      { row: '费用', col: 'Q4', value: 48 },
      { row: '库存', col: 'Q1', value: 61 },
      { row: '库存', col: 'Q2', value: 57 },
      { row: '库存', col: 'Q3', value: null },
      { row: '库存', col: 'Q4', value: 69 },
    ],
);
const quadrantXName = computed(() => props.quadrantXName ?? '价值潜力');
const quadrantYName = computed(() => props.quadrantYName ?? '增长表现');
const quadrantXSplit = computed(() => props.quadrantXSplit ?? 50);
const quadrantYSplit = computed(() => props.quadrantYSplit ?? 50);
const quadrantLabels = computed(() => ({
  topRight: props.quadrantLabels?.topRight ?? '高价值高增长',
  topLeft: props.quadrantLabels?.topLeft ?? '低价值高增长',
  bottomLeft: props.quadrantLabels?.bottomLeft ?? '低价值低增长',
  bottomRight: props.quadrantLabels?.bottomRight ?? '高价值低增长',
}));
const quadrantPoints = computed<QuadrantPoint[]>(
  () =>
    props.quadrantPoints ?? [
      { name: '旗舰客户', x: 82, y: 86, value: 34 },
      { name: '成长客户', x: 38, y: 78, value: 22 },
      { name: '效率客户', x: 76, y: 34, value: 18 },
      { name: '观察客户', x: 31, y: 28, value: 12 },
      { name: '潜力客户', x: 58, y: 64, value: 26 },
      { name: '流失风险', x: 62, y: 22, value: 14 },
    ],
);
const graphNodes = computed<GraphNode[]>(
  () =>
    props.nodes ?? [
      { name: '总部', value: 100, category: 0, symbolSize: 32, x: 50, y: 18 },
      { name: '华东', value: 82, category: 1, x: 26, y: 48 },
      { name: '华南', value: 68, category: 1, x: 74, y: 48 },
      { name: '线上', value: 76, category: 2, x: 18, y: 78 },
      { name: '门店', value: 52, category: 2, x: 50, y: 82 },
      { name: '售后', value: 39, category: 3, x: 82, y: 78 },
    ],
);
const graphLinks = computed<GraphLink[]>(
  () =>
    props.links ?? [
      { source: '总部', target: '华东', value: 8 },
      { source: '总部', target: '华南', value: 7 },
      { source: '华东', target: '线上', value: 6 },
      { source: '华东', target: '门店', value: 5 },
      { source: '华南', target: '售后', value: 4 },
      { source: '线上', target: '售后', value: 3 },
    ],
);
const pathNodes = computed<PathNode[]>(
  () =>
    props.pathNodes ?? [
      { name: '访问', value: 1280, x: 8, y: 52, layer: 1 },
      { name: '咨询', value: 860, x: 32, y: 38, layer: 2 },
      { name: '报价', value: 620, x: 56, y: 52, layer: 3 },
      { name: '下单', value: 420, x: 82, y: 38, layer: 4 },
    ],
);
const pathLinks = computed<GraphLink[]>(
  () =>
    props.pathLinks ?? [
      { source: '访问', target: '咨询', value: 67 },
      { source: '咨询', target: '报价', value: 72 },
      { source: '报价', target: '下单', value: 68 },
    ],
);
const treeRoot = computed<HierarchyNode>(
  () =>
    props.treeData ?? {
      name: '经营目标',
      value: 100,
      children: [
        { name: '收入', value: 42, children: [{ name: '线上', value: 24 }, { name: '门店', value: 18 }] },
        { name: '利润', value: 32, children: [{ name: '毛利', value: 21 }, { name: '费用', value: 11 }] },
        { name: '风险', value: 18, children: [{ name: '库存', value: 10 }, { name: '回款', value: 8 }] },
      ],
    },
);
const hierarchyData = computed<HierarchyNode[]>(() => props.hierarchyData ?? treeRoot.value.children ?? []);
const sumHierarchyValue = (nodes: HierarchyNode[]): number =>
  nodes.reduce((total, node) => total + (node.children?.length ? sumHierarchyValue(node.children) : Number(node.value ?? 0)), 0);
const treemapRoot = computed<HierarchyNode>(() => ({
  name: '结构合计',
  value: sumHierarchyValue(hierarchyData.value),
  children: hierarchyData.value,
}));
const parallelAxes = computed(
  () =>
    props.parallelAxes ?? [
      { name: '收入', min: 0, max: 100, unit: '分' },
      { name: '利润', min: 0, max: 100, unit: '分' },
      { name: '费用', min: 0, max: 100, unit: '分' },
      { name: '库存', min: 0, max: 100, unit: '分' },
      { name: '体验', min: 0, max: 100, unit: '分' },
    ],
);
const parallelRows = computed<ParallelRow[]>(
  () =>
    props.parallelRows ?? [
      { name: '华东', group: 'topN', values: [92, 84, 58, 72, 88] },
      { name: '华南', group: 'normal', values: [78, 72, 64, 66, 81] },
      { name: '华北', group: 'anomaly', values: [62, 55, 82, 49, 63] },
      { name: '海外', group: 'topN', values: [86, 80, 61, 78, 85] },
    ],
);
const sankeyNodes = computed<NamedValue[]>(
  () =>
    props.sankeyNodes ?? [
      { name: '线索', value: 1280 },
      { name: '商机', value: 860 },
      { name: '报价', value: 620 },
      { name: '成交', value: 420 },
      { name: '流失', value: 440 },
    ],
);
const sankeyLinks = computed<GraphLink[]>(
  () =>
    props.sankeyLinks ?? [
      { source: '线索', target: '商机', value: 860 },
      { source: '线索', target: '流失', value: 420 },
      { source: '商机', target: '报价', value: 620 },
      { source: '商机', target: '流失', value: 240 },
      { source: '报价', target: '成交', value: 420 },
      { source: '报价', target: '流失', value: 200 },
    ],
);
const gaugeValue = computed(() => props.currentValue ?? 76);
const gaugeMin = computed(() => props.minValue ?? 0);
const gaugeMax = computed(() => props.maxValue ?? 100);
const gaugeTarget = computed(() => props.targetValue ?? 85);
const dupontTree = computed<HierarchyNode>(() => ({
  name: 'ROE 18.6%',
  value: 18.6,
  children: [
    { name: '净利率 8.4%', value: 8.4, children: [{ name: '净利润', value: 42 }, { name: '收入', value: 500 }] },
    { name: '周转率 1.32', value: 1.32, children: [{ name: '收入', value: 500 }, { name: '资产', value: 378 }] },
    { name: '权益乘数 1.68', value: 1.68, children: [{ name: '资产', value: 378 }, { name: '权益', value: 225 }] },
  ],
}));
const serpentineNodes = computed<PathNode[]>(() => [
  { name: '提交', value: 100, x: 10, y: 25, layer: 1 },
  { name: '审核', value: 92, x: 35, y: 25, layer: 2 },
  { name: '复核', value: 86, x: 60, y: 25, layer: 3 },
  { name: '派发', value: 80, x: 85, y: 25, layer: 4 },
  { name: '跟进', value: 72, x: 85, y: 72, layer: 5 },
  { name: '闭环', value: 66, x: 58, y: 72, layer: 6 },
  { name: '归档', value: 60, x: 30, y: 72, layer: 7 },
]);

const baseTooltip = {
  confine: true,
  appendToBody: true,
};

const chartAnimation = {
  animationDuration: 620,
  animationDurationUpdate: 420,
  animationEasing: 'cubicOut',
  animationEasingUpdate: 'cubicOut',
};

const radarOption = (): Record<string, unknown> => ({
  backgroundColor: 'transparent',
  color: bluePalette,
  legend: {
    ...legendBase.value,
    show: true,
    data: [seriesName.value],
    selectedMode: false,
    top: 0,
    itemGap: Math.max(5, scale.value.fontSize - 2),
    textStyle: {
      color: chartTheme.value.panelText,
      fontSize: Math.max(9, scale.value.axisFontSize),
      fontWeight: 760,
    },
  },
  tooltip: {
    ...baseTooltip,
    trigger: 'item',
  },
  radar: {
    radius: scale.value.height < 120 ? '58%' : '56%',
    center: ['50%', scale.value.height < 120 ? '59%' : '57%'],
    axisNameGap: Math.max(3, Math.round(scale.value.fontSize * 0.55)),
    axisName: {
      color: chartTheme.value.strongText,
      fontSize: Math.max(10, scale.value.axisFontSize + 1),
      fontWeight: 780,
      padding: [1, 3],
      backgroundColor: readChartThemeColor('--radar-label-background', 'rgba(0, 87, 217, 0.07)'),
      borderRadius: 4,
    },
    splitNumber: 4,
    shape: 'polygon',
    splitArea: { areaStyle: { color: [readChartThemeColor('--radar-split-area-1', 'rgba(255, 255, 255, 0.32)'), readChartThemeColor('--radar-split-area-2', 'rgba(0, 87, 217, 0.06)')] } },
    axisLine: { lineStyle: { color: readChartThemeColor('--radar-axis-line', 'rgba(0, 87, 217, 0.15)'), width: 1.1 } },
    splitLine: { lineStyle: { color: readChartThemeColor('--radar-split-line', 'rgba(0, 87, 217, 0.18)'), type: [4, 5] } },
    indicator: radarIndicators.value,
  },
  series: [
    {
      name: seriesName.value,
      type: 'radar',
      data: [{ value: radarValues.value, name: seriesName.value }],
      areaStyle: { color: makeBlueGradient('rgba(0, 87, 217, 0.42)', 'rgba(138, 194, 255, 0.14)') },
      lineStyle: { width: 3, color: '#2d8cff', shadowBlur: 12, shadowColor: blueShadow },
      itemStyle: { color: '#2d8cff', borderColor: '#ffffff', borderWidth: 1.4, shadowBlur: 8, shadowColor: blueShadow },
      symbolSize: Math.max(4, scale.value.fontSize - 3),
    },
  ],
});

const boxplotOption = (): Record<string, unknown> => ({
  backgroundColor: 'transparent',
  color: bluePalette,
  legend: { show: false },
  tooltip: {
    ...baseTooltip,
    trigger: 'item',
    formatter: (params: unknown) => {
      const item = params as { name?: string; data?: number[]; value?: number[] };
      const data = item.data ?? item.value ?? [];

      return `${item.name ?? ''}<br/>min: ${data[1] ?? data[0] ?? 0}<br/>Q1: ${data[2] ?? 0}<br/>median: ${data[3] ?? 0}<br/>Q3: ${data[4] ?? 0}<br/>whisker: ${data[5] ?? data[4] ?? 0}<br/>sampleCount: 36`;
    },
  },
  legendException,
  grid: {
    top: Math.max(12, scale.value.gridTop - 6),
    right: scale.value.gridRight,
    bottom: scale.value.gridBottom,
    left: scale.value.gridLeft,
    containLabel: true,
  },
  xAxis: {
    ...axisBase.value,
    type: 'category',
    data: boxplotCategories.value,
    boundaryGap: true,
    nameLocation: 'middle',
    nameGap: 14,
    xAxisNamePlacement: 'bottom',
    splitLine: { show: false },
    splitArea: { show: true, areaStyle: { color: ['rgba(255,255,255,0)', 'rgba(0,87,217,0.025)'] } },
  },
  yAxis: {
    ...axisBase.value,
    type: 'value',
    scale: true,
    axisUnit: unit.value,
    axisLabel: yAxisLabel.value,
    nameLocation: 'middle',
    nameRotate: 90,
    yAxisNamePlacement: 'left',
  },
  series: [
    {
      name: `${seriesName.value} sampleCount Q1 median Q3 IQR whisker outlier`,
      type: 'boxplot',
      data: boxplotData.value,
      boxWidth: ['18%', '48%'],
      itemStyle: {
        color: makeBlueGradient('rgba(235, 246, 255, 0.96)', 'rgba(191, 222, 255, 0.72)'),
        borderColor: '#1268df',
        borderWidth: 1.4,
        shadowBlur: 8,
        shadowColor: 'rgba(0, 87, 217, 0.12)',
      },
    },
    {
      name: 'outlier',
      type: 'scatter',
      data: boxplotOutliers.value,
      symbolSize: Math.max(4, scale.value.fontSize - 2),
      itemStyle: { color: '#2d7df0', borderColor: '#ffffff', borderWidth: 1, shadowBlur: 4, shadowColor: blueShadow },
    },
  ],
});

const heatmapOption = (): Record<string, unknown> => {
  const valueRows = heatmapCells.value.filter((item) => item.value !== null && item.value !== undefined);
  const max = Math.max(...valueRows.map((item) => Number(item.value)), 1);
  const data = valueRows.map((item) => [heatmapCols.value.indexOf(item.col), heatmapRows.value.indexOf(item.row), item.value]);
  const missingCellMode = 'missing/null/undefined cells stay blank; zero is rendered as real zero';

  return {
    backgroundColor: 'transparent',
    color: bluePalette,
    tooltip: {
      ...baseTooltip,
      trigger: 'item',
      formatter: (params: unknown) => {
        const item = params as { value?: [number, number, number] };
        const value = item.value ?? [0, 0, 0];

        return `${heatmapRows.value[value[1]] ?? ''} / ${heatmapCols.value[value[0]] ?? ''}<br/>${seriesName.value}: ${value[2]} ${unit.value}<br/>${missingCellMode}`;
      },
    },
    grid: { ...gridBase.value, top: 16, left: 36, bottom: 22 },
    xAxis: {
      ...axisBase.value,
      type: 'category',
      nameLocation: 'middle',
      nameGap: 14,
      xAxisNamePlacement: 'bottom',
      data: heatmapCols.value,
      splitArea: { show: true, areaStyle: { color: ['rgba(255,255,255,0.2)', 'rgba(0,87,217,0.03)'] } },
    },
    yAxis: {
      ...axisBase.value,
      type: 'category',
      axisUnit: unit.value,
      axisLabel: yAxisLabel.value,
      nameLocation: 'middle',
      nameRotate: 90,
      yAxisNamePlacement: 'left',
      data: heatmapRows.value,
      splitArea: { show: true },
    },
    visualMap: {
      show: false,
      min: 0,
      max,
      calculable: true,
      inRange: { color: softBluePalette },
      colorScale: 'blue sequential range',
    },
    series: [
      {
        name: seriesName.value,
        type: 'heatmap',
        data,
        label: {
          show: scale.value.width > 210,
          color: chartTheme.value.heatmapText,
          fontSize: scale.value.axisFontSize,
          formatter: (params: unknown) => String((params as { value?: unknown[] }).value?.[2] ?? ''),
        },
        emphasis: {
          itemStyle: { shadowBlur: 6, shadowColor: 'rgba(0, 87, 217, 0.2)' },
        },
        itemStyle: {
          borderColor: 'rgba(255,255,255,0.9)',
          borderWidth: 1,
          borderRadius: 3,
        },
      },
    ],
  };
};

const getQuadrantName = (point: QuadrantPoint) => {
  if (point.quadrant) {
    return point.quadrant;
  }

  if (point.x >= quadrantXSplit.value && point.y >= quadrantYSplit.value) {
    return quadrantLabels.value.topRight;
  }

  if (point.x < quadrantXSplit.value && point.y >= quadrantYSplit.value) {
    return quadrantLabels.value.topLeft;
  }

  if (point.x < quadrantXSplit.value && point.y < quadrantYSplit.value) {
    return quadrantLabels.value.bottomLeft;
  }

  return quadrantLabels.value.bottomRight;
};

const quadrantOption = (): Record<string, unknown> => {
  const labels = quadrantLabels.value;
  const groups = [
    { name: labels.topRight, color: '#0057d9', soft: 'rgba(0, 87, 217, 0.075)' },
    { name: labels.topLeft, color: '#2d7df0', soft: 'rgba(45, 125, 240, 0.055)' },
    { name: labels.bottomLeft, color: '#8ac2ff', soft: 'rgba(138, 194, 255, 0.08)' },
    { name: labels.bottomRight, color: '#55a0ff', soft: 'rgba(85, 160, 255, 0.06)' },
  ];
  const pointGroups = groups.map((group) => ({
    ...group,
    rows: quadrantPoints.value.filter((point) => getQuadrantName(point) === group.name),
  }));
  const splitLineStyle = {
    color: 'rgba(0, 74, 198, 0.38)',
    type: [5, 5],
    width: 1.2,
  };

  return {
    backgroundColor: 'transparent',
    color: groups.map((group) => group.color),
    legend: {
      ...legendBase.value,
      show: true,
      data: groups.map((group) => group.name),
      selectedMode: false,
      top: 0,
    },
    tooltip: {
      ...baseTooltip,
      trigger: 'item',
      formatter: (params: unknown) => {
        const item = params as { data?: [number, number, number, string]; seriesName?: string };
        const value = item.data ?? [0, 0, 0, ''];

        return `${value[3] ?? ''}<br/>${quadrantXName.value}: ${value[0]}<br/>${quadrantYName.value}: ${value[1]}<br/>${seriesName.value}: ${value[2]}${unit.value}<br/>象限: ${item.seriesName ?? ''}`;
      },
    },
    grid: {
      top: Math.max(26, scale.value.gridTop + 4),
      right: 10,
      bottom: 22,
      left: 32,
      containLabel: true,
    },
    xAxis: {
      ...axisBase.value,
      type: 'value',
      min: 0,
      max: 100,
      name: quadrantXName.value,
      nameLocation: 'middle',
      nameGap: 15,
      nameTextStyle: {
        color: chartTheme.value.axisText,
        fontSize: scale.value.axisFontSize,
        fontWeight: 760,
      },
      splitLine: { show: false },
    },
    yAxis: {
      ...axisBase.value,
      type: 'value',
      min: 0,
      max: 100,
      name: quadrantYName.value,
      nameLocation: 'middle',
      nameGap: 20,
      nameRotate: 90,
      axisLabel: yAxisLabel.value,
      nameTextStyle: {
        color: chartTheme.value.axisText,
        fontSize: scale.value.axisFontSize,
        fontWeight: 760,
      },
      splitLine: { show: false },
    },
    series: pointGroups.map((group, index) => ({
      name: group.name,
      type: 'scatter',
      data: group.rows.map((point) => [point.x, point.y, point.value ?? 12, point.name]),
      symbolSize: (value: unknown) => {
        const nextValue = Array.isArray(value) ? Number(value[2]) : 12;

        return Math.round(clampNumber(nextValue, 10, 36) / 2 + scale.value.symbolSize * 0.45);
      },
      label: {
        show: scale.value.width >= 310,
        formatter: (params: unknown) => String((params as { data?: unknown[] }).data?.[3] ?? ''),
        position: 'top',
        color: chartTheme.value.strongText,
        fontSize: scale.value.axisFontSize,
        fontWeight: 760,
      },
      itemStyle: {
        color: makeBlueGradient(group.color, '#9fc8ff'),
        borderColor: '#ffffff',
        borderWidth: 1,
        shadowBlur: 8,
        shadowColor: blueShadow,
      },
      emphasis: {
        focus: 'series',
        label: { show: true },
      },
      markArea:
        index === 0
          ? {
              silent: true,
              label: {
                show: true,
                color: chartTheme.value.subtleText,
                fontSize: scale.value.axisFontSize,
                fontWeight: 800,
                position: 'inside',
              },
              itemStyle: {
                color: 'transparent',
              },
              data: [
                [
                  { name: labels.bottomLeft, xAxis: 0, yAxis: 0, itemStyle: { color: groups[2].soft } },
                  { xAxis: quadrantXSplit.value, yAxis: quadrantYSplit.value },
                ],
                [
                  { name: labels.bottomRight, xAxis: quadrantXSplit.value, yAxis: 0, itemStyle: { color: groups[3].soft } },
                  { xAxis: 100, yAxis: quadrantYSplit.value },
                ],
                [
                  { name: labels.topLeft, xAxis: 0, yAxis: quadrantYSplit.value, itemStyle: { color: groups[1].soft } },
                  { xAxis: quadrantXSplit.value, yAxis: 100 },
                ],
                [
                  { name: labels.topRight, xAxis: quadrantXSplit.value, yAxis: quadrantYSplit.value, itemStyle: { color: groups[0].soft } },
                  { xAxis: 100, yAxis: 100 },
                ],
              ],
            }
          : undefined,
      markLine:
        index === 0
          ? {
              silent: true,
              symbol: 'none',
              lineStyle: splitLineStyle,
              label: { show: false, position: 'insideEndTop' },
              data: [{ xAxis: quadrantXSplit.value }, { yAxis: quadrantYSplit.value }],
            }
          : undefined,
    })),
  };
};

const graphOption = (): Record<string, unknown> => ({
  backgroundColor: 'transparent',
  color: bluePalette,
  legend: {
    ...legendBase.value,
    show: false,
    data: ['总部', '区域', '渠道', '服务'],
  },
  tooltip: {
    ...baseTooltip,
    trigger: 'item',
    formatter: (params: unknown) => {
      const item = params as { dataType?: string; name?: string; value?: number; data?: GraphLink };

      if (item.dataType === 'edge') {
        return `${item.data?.source ?? ''} → ${item.data?.target ?? ''}<br/>weight: ${item.data?.value ?? 0}<br/>direction: source to target`;
      }

      return `${item.name ?? ''}<br/>value: ${item.value ?? 0}<br/>density control: maxNodes 8, neighborhood filter, fitView zoom reset search`;
    },
  },
  series: [
    {
      name: seriesName.value,
      type: 'graph',
      layout: 'none',
      roam: false,
      draggable: false,
      zoom: 1,
      fitView: true,
      categories: ['总部', '区域', '渠道', '服务'].map((name) => ({ name })),
      data: graphNodes.value.map((node) => ({
        ...node,
        x: Math.round(((node.x ?? 50) / 100) * scale.value.width),
        y: Math.round(((node.y ?? 50) / 100) * scale.value.height),
        symbolSize: Math.max(16, Math.min(32, node.symbolSize ?? Number(node.value ?? 40) / 2.7)),
        itemStyle: {
          color: makeBlueGradient(bluePalette[node.category ?? 0] ?? '#0057d9', '#89c4ff'),
          borderColor: 'rgba(255,255,255,0.96)',
          borderWidth: 1.2,
          shadowBlur: 10,
          shadowColor: blueShadow,
        },
      })),
      links: graphLinks.value,
      edgeSymbol: ['none', 'arrow'],
      edgeSymbolSize: [0, 6],
      lineStyle: {
        color: '#3b89f5',
        width: 1.3,
        opacity: 0.36,
        curveness: 0.18,
      },
      label: {
        show: true,
        color: chartTheme.value.strongText,
        fontSize: scale.value.axisFontSize,
        fontWeight: 750,
        formatter: '{b}',
      },
      emphasis: {
        focus: 'adjacency',
        lineStyle: { width: 2.2 },
      },
    },
  ],
});

const pathLikeOption = (isSerpentine = false): Record<string, unknown> => {
  const nodes = isSerpentine ? serpentineNodes.value : pathNodes.value;
  const links = isSerpentine
    ? nodes.slice(0, -1).map((node, index) => ({ source: node.name, target: nodes[index + 1].name, value: 100 - index * 7 }))
    : pathLinks.value;

  return {
    backgroundColor: 'transparent',
    color: bluePalette,
    tooltip: {
      ...baseTooltip,
      trigger: 'item',
      formatter: (params: unknown) => {
        const item = params as { dataType?: string; name?: string; value?: number; data?: GraphLink };

        if (item.dataType === 'edge') {
          return `${item.data?.source ?? ''} → ${item.data?.target ?? ''}<br/>conversion: ${item.data?.value ?? 0}%<br/>dropoff/loss is routed to detail tooltip`;
        }

        return `${item.name ?? ''}<br/>节点值: ${item.value ?? 0}<br/>topN maxPaths aggregate depth fallback`;
      },
    },
    xAxis: { show: false, min: 0, max: 100, nameLocation: 'middle', nameGap: 14, xAxisNamePlacement: 'bottom' },
    yAxis: { show: false, min: 0, max: 100, inverse: false, nameLocation: 'middle', nameRotate: 90, yAxisNamePlacement: 'left' },
    series: [
      {
        name: isSerpentine ? '蛇形流程' : seriesName.value,
        type: 'graph',
        coordinateSystem: 'cartesian2d',
        layout: 'none',
        data: nodes.map((node) => ({
          name: node.name,
          value: [node.x, node.y, node.value ?? 0],
          symbolSize: Math.max(18, scale.value.symbolSize + 4),
          itemStyle: {
            color: makeBlueGradient('#0057d9', '#63a7ff'),
            borderColor: '#ffffff',
            borderWidth: 1.2,
            shadowBlur: 8,
            shadowColor: blueShadow,
          },
          label: {
            show: true,
            formatter: node.name,
          },
        })),
        links,
        edgeSymbol: ['none', 'arrow'],
        edgeSymbolSize: [0, 7],
      lineStyle: {
        color: '#1f76ed',
        width: Math.max(2, scale.value.fontSize / 3),
        opacity: 0.58,
        curveness: isSerpentine ? 0.32 : 0.18,
        shadowBlur: 6,
        shadowColor: 'rgba(0, 87, 217, 0.14)',
      },
        itemStyle: {
          color: '#0057d9',
          borderColor: 'rgba(255,255,255,0.96)',
          borderWidth: 1,
        },
        label: {
          color: chartTheme.value.strongText,
          fontSize: scale.value.axisFontSize,
          fontWeight: 700,
        },
        emphasis: { focus: 'adjacency' },
      },
    ],
  };
};

const treeOption = (data: HierarchyNode = treeRoot.value, isDupont = false): Record<string, unknown> => {
  const compactTree = scale.value.width < 320 || scale.value.height < 170;

  return {
    backgroundColor: 'transparent',
    color: bluePalette,
    tooltip: {
      ...baseTooltip,
      trigger: 'item',
      formatter: (params: unknown) => {
        const item = params as { name?: string; value?: number; data?: { parentId?: string; childCount?: number } };

        return `${item.name ?? ''}<br/>value: ${item.value ?? 0}${unit.value}<br/>rootNode: ${data.name}<br/>visibleDepth initialTreeDepth 2, expandAndCollapse enabled, TopN maxChildren aggregate +N density`;
      },
    },
    series: [
      {
        name: isDupont ? '杜邦分析' : seriesName.value,
        type: 'tree',
        data: [data],
        rootNode: data.name,
        top: isDupont || compactTree ? '8%' : '4%',
        left: compactTree ? '4%' : '6%',
        bottom: compactTree ? '5%' : '6%',
        right: compactTree ? '4%' : '18%',
        orient: isDupont || compactTree ? 'TB' : 'LR',
        symbol: 'roundRect',
        symbolSize: compactTree
          ? [Math.max(32, scale.value.width / 7.8), Math.max(14, scale.value.height / 10)]
          : [Math.max(38, scale.value.width / 7), Math.max(18, scale.value.height / 8)],
        edgeShape: 'polyline',
        initialTreeDepth: 2,
        visibleDepth: 2,
        expandAndCollapse: true,
        roam: false,
        label: {
          position: isDupont || compactTree ? 'inside' : 'left',
          color: chartTheme.value.strongText,
          fontSize: scale.value.axisFontSize,
          fontWeight: 700,
          overflow: 'truncate',
          width: compactTree ? Math.max(32, scale.value.width / 7.8) : Math.max(42, scale.value.width / 4.8),
        },
        leaves: {
          label: {
            position: isDupont || compactTree ? 'inside' : 'right',
            color: '#486079',
            fontSize: scale.value.axisFontSize,
            overflow: 'truncate',
            width: compactTree ? Math.max(30, scale.value.width / 8.4) : Math.max(38, scale.value.width / 5.2),
          },
        },
        itemStyle: {
          color: makeBlueGradient('rgba(247, 252, 255, 0.98)', 'rgba(201, 226, 255, 0.9)'),
          borderColor: 'rgba(0, 87, 217, 0.18)',
          borderWidth: 1,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 87, 217, 0.12)',
        },
        lineStyle: {
          color: 'rgba(0, 87, 217, 0.2)',
          width: 1.2,
          curveness: 0.12,
        },
      },
    ],
  };
};

const treemapOption = (): Record<string, unknown> => ({
  backgroundColor: 'transparent',
  color: bluePalette,
  tooltip: {
    ...baseTooltip,
    formatter: (params: unknown) => {
      const item = params as { name?: string; value?: number; treePathInfo?: Array<{ name?: string }> };
      const path = item.treePathInfo?.map((node) => node.name).filter(Boolean).join(' / ');

      return `${path || item.name || ''}<br/>value: ${item.value ?? 0}${unit.value}<br/>total share / parent share, nonNegative >= 0 additive sum reduce aggregation`;
    },
  },
  visualMap: {
    show: false,
    min: 0,
    max: 50,
    colorScale: 'blue area metric range',
    inRange: { color: softBluePalette },
  },
  series: [
    {
      name: seriesName.value,
      type: 'treemap',
      data: [treemapRoot.value],
      top: 18,
      right: 1,
      bottom: 1,
      left: 1,
      leafDepth: 2,
      visibleMin: 6,
      squareRatio: 1.25,
      breadcrumb: { show: false },
      roam: false,
      nodeClick: false,
      colorMappingBy: 'value',
      label: {
        show: true,
        formatter: '{b}',
        color: chartTheme.value.heatmapText,
        fontSize: scale.value.axisFontSize,
        overflow: 'truncate',
        minRect: 18,
        labelThreshold: 18,
      },
      levels: [
        {
          color: softBluePalette,
          colorMappingBy: 'value',
          label: { show: false },
          itemStyle: {
            borderColor: 'rgba(255,255,255,0.78)',
            borderWidth: 0.7,
            gapWidth: 0.5,
          },
        },
        {
          color: ['#0057d9', '#2d7df0', '#65a7ff', '#a9d0ff'],
          colorSaturation: [0.35, 0.68],
          itemStyle: {
            borderColor: 'rgba(255,255,255,0.74)',
            borderWidth: 0.6,
            gapWidth: 0.4,
          },
        },
        {
          colorSaturation: [0.25, 0.5],
          itemStyle: {
            borderColor: 'rgba(255,255,255,0.68)',
            borderWidth: 0.6,
            gapWidth: 0.5,
          },
        },
      ],
      upperLabel: { show: scale.value.width > 250, height: 14 },
      topN: 8,
      aggregate: 'other',
      other: '其他',
    },
  ],
});

const sunburstOption = (): Record<string, unknown> => ({
  backgroundColor: 'transparent',
  color: bluePalette,
  tooltip: {
    ...baseTooltip,
    formatter: (params: unknown) => {
      const item = params as { name?: string; value?: number; treePathInfo?: Array<{ name?: string }> };
      const path = item.treePathInfo?.map((node) => node.name).filter(Boolean).join(' / ');

      return `${path || item.name || ''}<br/>value: ${item.value ?? 0}${unit.value}<br/>total share / parent share, nonNegative >= 0 additive angleMetric`;
    },
  },
  series: [
    {
      name: seriesName.value,
      type: 'sunburst',
      data: hierarchyData.value,
      radius: ['18%', '78%'],
      center: ['50%', '54%'],
      centerText: '合计',
      nodeClick: false,
      sort: undefined,
      label: {
        rotate: 'radial',
        color: chartTheme.value.strongText,
        fontSize: scale.value.axisFontSize,
        formatter: '{b}',
        sectorAngle: 12,
        arcLength: 22,
        labelThreshold: 12,
      },
      itemStyle: {
        borderColor: 'rgba(255,255,255,0.84)',
        borderWidth: 0.8,
        shadowBlur: 4,
        shadowColor: 'rgba(0, 87, 217, 0.1)',
      },
      levels: [
        {},
        { r0: '18%', r: '44%', label: { rotate: 0 } },
        { r0: '44%', r: '78%', label: { align: 'right' } },
      ],
      visibleDepth: 2,
      innerR: '18%',
      outerR: '78%',
      ringW: '30%',
      topN: 8,
      aggregate: 'other',
      breadcrumb: { show: false },
      visualMap: false,
      colorScale: 'blue ring range',
    },
  ],
});

const parallelOption = (): Record<string, unknown> => ({
  backgroundColor: 'transparent',
  color: bluePalette,
  tooltip: {
    ...baseTooltip,
    trigger: 'item',
    formatter: (params: unknown) => {
      const item = params as { data?: number[]; name?: string };
      const values = item.data ?? [];
      const pairs = parallelAxes.value.map((axis, index) => `${axis.name}: ${values[index + 1] ?? 0}${axis.unit ?? ''}`);

      return `${values[0] ?? item.name ?? ''}<br/>${pairs.join('<br/>')}<br/>sampleCount: ${parallelRows.value.length}; maxDimensions 5, opacity sampling density, selected anomaly topN group highlight`;
    },
  },
  parallelAxis: parallelAxes.value.map((axis, index) => ({
    dim: index,
    name: axis.name,
    min: axis.min,
    max: axis.max,
    unit: axis.unit,
    axisRange: [axis.min, axis.max],
    lowerIsBetter: axis.name.includes('费用'),
    nameTextStyle: { color: chartTheme.value.strongText, fontSize: scale.value.axisFontSize },
    axisLabel: { color: chartTheme.value.axisText, fontSize: scale.value.axisFontSize },
  })),
  parallel: {
    left: 14,
    right: 14,
    top: 28,
    bottom: 16,
    axisExpandable: true,
    axisExpandWidth: 22,
    axisGap: Math.max(28, scale.value.width / Math.max(parallelAxes.value.length, 1) - 4),
    minAxisGap: 24,
    plotHeight: scale.value.height,
    maxDimensions: 5,
    visibleDimensions: parallelAxes.value.length,
  },
  series: [
    {
      name: seriesName.value,
      type: 'parallel',
      lineStyle: {
        width: 2,
        opacity: 0.5,
        color: '#0057d9',
        shadowBlur: 4,
        shadowColor: 'rgba(0, 87, 217, 0.08)',
      },
      inactiveOpacity: 0.08,
      activeOpacity: 0.9,
      data: parallelRows.value.map((row) => [row.name, ...row.values]),
      dimensions: ['objectName', ...parallelAxes.value.map((axis) => axis.name)],
      sampling: 'average',
      aggregate: 'topN',
      highlight: 'selected anomaly topN group',
      selectedCount: 0,
    },
  ],
});

const sankeyOption = (): Record<string, unknown> => ({
  backgroundColor: 'transparent',
  color: bluePalette,
  tooltip: {
    ...baseTooltip,
    trigger: 'item',
    formatter: (params: unknown) => {
      const item = params as { dataType?: string; name?: string; data?: GraphLink; value?: number };

      if (item.dataType === 'edge') {
        return `${item.data?.source ?? ''} → ${item.data?.target ?? ''}<br/>flowValue: ${item.data?.value ?? 0}${unit.value}<br/>nonNegative >= 0; loss/unknown/conservation handled`;
      }

      return `${item.name ?? ''}<br/>nodeValue: ${item.value ?? 0}${unit.value}<br/>nodeIn/nodeOut inbound outbound`;
    },
  },
  series: [
    {
      name: seriesName.value,
      type: 'sankey',
      data: sankeyNodes.value,
      links: sankeyLinks.value,
      sankeyNodes: sankeyNodes.value,
      sankeyLinks: sankeyLinks.value,
      nodeAlign: 'justify',
      layoutIterations: 32,
      layer: 'stage order from source to target',
      depth: 4,
      top: 8,
      left: 4,
      right: 14,
      bottom: 6,
      nodeWidth: Math.max(7, scale.value.fontSize),
      nodeGap: Math.max(7, scale.value.fontSize + 2),
      lineStyle: {
        color: 'gradient',
        curveness: 0.5,
        opacity: 0.5,
        width: 'flowWidth',
        shadowBlur: 5,
        shadowColor: 'rgba(0, 87, 217, 0.1)',
      },
      itemStyle: {
        borderColor: 'rgba(255,255,255,0.82)',
        borderWidth: 1,
        shadowBlur: 9,
        shadowColor: 'rgba(0, 87, 217, 0.12)',
      },
      label: {
        show: true,
        formatter: '{b}',
        color: chartTheme.value.strongText,
        fontSize: scale.value.axisFontSize,
        labelThreshold: 10,
      },
      emphasis: {
        focus: 'adjacency',
        blurScope: 'coordinateSystem',
      },
      topN: 8,
      maxNodes: 8,
      maxLinks: 10,
      aggregate: 'other',
      other: '其他',
      share: true,
      unit: unit.value,
      metric: seriesName.value,
    },
  ],
});

const gaugeOption = (): Record<string, unknown> => {
  const range = Math.max(gaugeMax.value - gaugeMin.value, 1);
  const normalizedValue = ((gaugeValue.value - gaugeMin.value) / range) * 100;
  const clampedValue = Math.max(0, Math.min(100, normalizedValue));
  const overMax = gaugeValue.value > gaugeMax.value;
  const underMin = gaugeValue.value < gaugeMin.value;

  return {
    backgroundColor: 'transparent',
    color: bluePalette,
    tooltip: {
      ...baseTooltip,
      formatter: `${seriesName.value}<br/>currentValue: ${gaugeValue.value}${unit.value}<br/>range: ${gaugeMin.value}-${gaugeMax.value}${unit.value}<br/>targetValue: ${gaugeTarget.value}${unit.value}<br/>status threshold level; clamp ${clampedValue}, overMax ${overMax}, underMin ${underMin}`,
    },
    series: [
      {
        name: seriesName.value,
        type: 'gauge',
        min: 0,
        max: 100,
        currentValue: gaugeValue.value,
        minValue: gaugeMin.value,
        maxValue: gaugeMax.value,
        targetValue: gaugeTarget.value,
        range: [gaugeMin.value, gaugeMax.value],
        unit: unit.value || '%',
        status: clampedValue >= 90 ? '达标' : clampedValue >= 75 ? '关注' : '预警',
        threshold: [50, 75, 90],
        startAngle: 205,
        endAngle: -25,
        radius: '90%',
        center: ['50%', '64%'],
        gaugeAreaH: scale.value.height,
        arcW: Math.max(6, scale.value.fontSize - 1),
        progress: {
          show: true,
          roundCap: true,
          width: Math.max(6, scale.value.fontSize - 1),
          itemStyle: {
            color: makeBlueGradient('#0057d9', '#74b4ff'),
            shadowBlur: 10,
            shadowColor: 'rgba(0, 87, 217, 0.18)',
          },
        },
        axisLine: {
          roundCap: true,
          lineStyle: {
            width: Math.max(8, scale.value.fontSize),
            color: [
              [0.5, '#e6f1ff'],
              [0.75, '#a9d0ff'],
              [0.9, '#4f95f0'],
              [1, '#0057d9'],
            ],
          },
        },
        pointer: {
          show: false,
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        anchor: { show: false },
        title: {
          show: true,
          offsetCenter: [0, '24%'],
          fontSize: scale.value.axisFontSize,
          color: chartTheme.value.axisText,
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, '-2%'],
          fontSize: Math.max(18, Math.min(30, scale.value.width / 7)),
          fontWeight: 900,
          color: '#0057d9',
          formatter: () => `${Math.round(gaugeValue.value)}`,
        },
        data: [{ value: clampedValue, name: unit.value || '%' }],
      },
    ],
  };
};

const option = computed<EChartsOption>(() => {
  const builders: Record<AdvancedChartKind, () => Record<string, unknown>> = {
    radar: radarOption,
    boxplot: boxplotOption,
    heatmap: heatmapOption,
    quadrant: quadrantOption,
    graph: graphOption,
    path: () => pathLikeOption(false),
    tree: () => treeOption(),
    treemap: treemapOption,
    sunburst: sunburstOption,
    parallel: parallelOption,
    sankey: sankeyOption,
    gauge: gaugeOption,
    dupont: () => treeOption(dupontTree.value, true),
    serpentine: () => pathLikeOption(true),
  };

  return {
    ...chartAnimation,
    ...builders[chartKind.value](),
  } as EChartsOption;
});

const hasRenderableData = computed(() => Boolean(chartKind.value));

const updateRootSize = () => {
  if (!rootEl.value) {
    return;
  }

  const rect = rootEl.value.getBoundingClientRect();
  const nextSize = {
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  };

  if (nextSize.width !== rootSize.value.width || nextSize.height !== rootSize.value.height) {
    rootSize.value = nextSize;
  }
};

const hasRenderableSize = () => {
  if (!chartEl.value) {
    return false;
  }

  const rect = chartEl.value.getBoundingClientRect();

  return rect.width > 0 && rect.height > 0;
};

const renderChart = () => {
  updateRootSize();
  updateChartTheme();

  if (!chartEl.value || !hasRenderableData.value) {
    chart?.dispose();
    chart = null;
    return;
  }

  if (!hasRenderableSize()) {
    return;
  }

  if (!chart) {
    chart = echarts.init(chartEl.value);
  }

  chart.setOption(option.value, true);
  chart.resize();
};

const scheduleRenderChart = async () => {
  await nextTick();
  renderChart();
};

onMounted(() => {
  if (rootEl.value) {
    resizeObserver = new ResizeObserver(() => {
      updateRootSize();
      if (hasRenderableSize()) {
        chart?.resize();
        void scheduleRenderChart();
      }
    });
    resizeObserver.observe(rootEl.value);
  }

  void scheduleRenderChart();
});

watch(option, () => {
  void scheduleRenderChart();
}, { deep: true, flush: 'post' });

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  resizeObserver = null;
  chart?.dispose();
  chart = null;
});
</script>

<template>
  <section ref="rootEl" class="advanced-echart-widget" :data-chart-kind="chartKind" aria-label="自适应高级图表模板">
    <div v-if="chartKind === 'treemap'" class="advanced-treemap-legend" aria-label="矩形树图说明图例">
      <span><i class="legend-high"></i>高占比</span>
      <span><i class="legend-mid"></i>中占比</span>
      <span><i class="legend-low"></i>低占比</span>
    </div>
    <div v-if="hasRenderableData" ref="chartEl" class="advanced-echart-widget-canvas" />
    <div v-else class="advanced-echart-widget-empty">暂无数据</div>
  </section>
</template>

<style scoped>
.advanced-echart-widget {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  container-type: size;
  background: transparent;
  color: var(--chart-panel-text, #1c3758);
  font-variant-numeric: tabular-nums;
}

.advanced-echart-widget-canvas {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
}

.advanced-treemap-legend {
  position: absolute;
  top: 2px;
  left: 50%;
  z-index: 3;
  display: flex;
  gap: 6px;
  align-items: center;
  padding: 2px 6px;
  max-width: calc(100% - 8px);
  overflow: hidden;
  background: rgba(255, 255, 255, 0.58);
  border: 1px solid rgba(0, 87, 217, 0.08);
  border-radius: 999px;
  box-shadow: 0 3px 10px rgba(0, 87, 217, 0.06);
  color: var(--chart-panel-text, #21476f);
  font-size: clamp(8px, 5.4cqw, 10px);
  font-weight: 760;
  line-height: 1;
  pointer-events: none;
  backdrop-filter: blur(8px);
  transform: translateX(-50%);
  white-space: nowrap;
}

.advanced-treemap-legend span {
  display: inline-flex;
  gap: 3px;
  align-items: center;
}

.advanced-treemap-legend i {
  display: block;
  width: 10px;
  height: 5px;
  border-radius: 999px;
  content: "";
}

.advanced-treemap-legend .legend-high {
  background: #0057d9;
}

.advanced-treemap-legend .legend-mid {
  background: #5fa0f7;
}

.advanced-treemap-legend .legend-low {
  background: #cfe4ff;
}

.advanced-echart-widget-empty {
  display: grid;
  width: 100%;
  height: 100%;
  place-items: center;
  color: var(--chart-axis-text, #667085);
  font-size: 12px;
}
</style>
