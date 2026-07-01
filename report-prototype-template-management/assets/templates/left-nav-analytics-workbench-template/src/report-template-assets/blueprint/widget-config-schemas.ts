import type { WidgetVisualType } from '../../widgets/types';
import type { ReportTemplateSlotId, WidgetConfigurationSchema } from './types';

const buildGenericLayoutSizes = () =>
  Array.from({ length: 7 }, (_, rowIndex) => {
    const rows = rowIndex + 2;
    return Array.from({ length: 13 - rows }, (_, columnIndex) => `${columnIndex + rows}x${rows}`);
  }).flat();

const genericLayoutSizes = buildGenericLayoutSizes();
const axisChartSizes = ['3x2', '4x2', '3x3', '4x3'];
const analyticalChartSizes = ['3x2', '4x2', '3x3', '4x3'];
const radialChartSizes = ['3x2', '4x2', '3x3', '4x3'];
const listSizes = ['3x2', '4x2', '3x3', '4x3', '6x2', '6x3'];

export const allowedWidgetSizesByVisualType: Record<WidgetVisualType, string[]> = {
  line: axisChartSizes,
  bar: axisChartSizes,
  combo: axisChartSizes,
  'compact-sparkline': ['3x2', '4x2'],
  candlestick: analyticalChartSizes,
  heatmap: analyticalChartSizes,
  pie: radialChartSizes,
  radar: radialChartSizes,
  path: radialChartSizes,
  sunburst: radialChartSizes,
  gauge: radialChartSizes,
  scatter: analyticalChartSizes,
  boxplot: analyticalChartSizes,
  parallel: analyticalChartSizes,
  map: radialChartSizes,
  graph: radialChartSizes,
  tree: radialChartSizes,
  treemap: radialChartSizes,
  sankey: radialChartSizes,
  funnel: radialChartSizes,
  'metric-card': ['2x2', '3x2'],
  'text-summary': ['2x2', '3x2', '4x2', '6x2', '8x2', '12x2'],
  'operational-list': listSizes,
  'action-recommendation-card': listSizes,
  'ranking-list': listSizes,
  table: ['3x2', '4x2', '6x2', '8x2', '12x2', '4x3', '6x3', '8x3', '12x3', '6x4', '8x4', '12x4'],
  pivot: ['4x3', '6x3', '8x3', '12x3', '6x4', '8x4', '12x4', '6x5', '8x5', '12x5'],
  other: genericLayoutSizes,
};

const defaultRequiredSlots: ReportTemplateSlotId[] = ['titleArea', 'componentArea'];
const defaultOptionalSlots: ReportTemplateSlotId[] = ['pillArea', 'summaryArea'];

const chartRequiredKeys = ['visualType', 'props.chartKind or component-specific chart props', 'data or dataPolicy'];
const tableRequiredKeys = ['visualType', 'props.columns or table schema', 'data or dataPolicy'];
const listRequiredKeys = ['visualType', 'props.displayBudget.rowHeightPx', 'props.displayBudget.visibleRowCount'];

const getRequiredKeys = (visualType: WidgetVisualType) => {
  if (['line', 'bar', 'combo', 'compact-sparkline', 'candlestick', 'heatmap', 'pie', 'radar', 'path', 'sunburst', 'gauge', 'scatter', 'boxplot', 'parallel', 'map', 'graph', 'tree', 'treemap', 'sankey', 'funnel'].includes(visualType)) {
    return chartRequiredKeys;
  }

  if (['table', 'pivot'].includes(visualType)) {
    return tableRequiredKeys;
  }

  if (['operational-list', 'action-recommendation-card', 'ranking-list'].includes(visualType)) {
    return listRequiredKeys;
  }

  return ['visualType', 'props'];
};

const getDataRequirement = (visualType: WidgetVisualType): WidgetConfigurationSchema['dataRequirement'] => {
  if (visualType === 'text-summary') {
    return 'none';
  }

  if (visualType === 'metric-card') {
    return 'static-or-data-source';
  }

  return 'data-source-preferred';
};

export const widgetConfigurationSchemas: WidgetConfigurationSchema[] = (
  Object.keys(allowedWidgetSizesByVisualType) as WidgetVisualType[]
).map((visualType) => ({
  visualType,
  label: visualType,
  allowedSizes: allowedWidgetSizesByVisualType[visualType],
  requiredSlots: defaultRequiredSlots,
  optionalSlots: defaultOptionalSlots,
  requiredConfigKeys: getRequiredKeys(visualType),
  dataRequirement: getDataRequirement(visualType),
  minContentWidth: ['line', 'bar', 'combo'].includes(visualType) ? 300 : undefined,
  minContentHeight: ['line', 'bar', 'combo'].includes(visualType) ? 200 : undefined,
  notes: visualType === 'pivot' ? ['Use AntV S2 or a project S2-equivalent renderer.'] : undefined,
}));

export const getWidgetConfigurationSchema = (visualType: WidgetVisualType) =>
  widgetConfigurationSchemas.find((schema) => schema.visualType === visualType);

export const isWidgetSizeAllowed = (visualType: WidgetVisualType, size: string) =>
  Boolean(getWidgetConfigurationSchema(visualType)?.allowedSizes.includes(size));
