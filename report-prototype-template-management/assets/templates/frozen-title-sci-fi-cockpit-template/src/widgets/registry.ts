import type { Component } from 'vue';
import type { RegisteredWidgetType, WidgetViewportConfig } from './types';
import AdvancedEChartWidget from './components/AdvancedEChartWidget.vue';
import CompactBarChart from './components/CompactBarChart.vue';
import FollowupActionWidget from './components/FollowupActionWidget.vue';
import KpiMetricWidget from './components/KpiMetricWidget.vue';
import MetricValueWidget from './components/MetricValueWidget.vue';
import MiniBarTrendWidget from './components/MiniBarTrendWidget.vue';
import ProgressGaugeWidget from './components/ProgressGaugeWidget.vue';
import RankingCardWidget from './components/RankingCardWidget.vue';
import S2ReportTableWidget from './components/S2ReportTableWidget.vue';
import SignalMatrixWidget from './components/SignalMatrixWidget.vue';
import StatusRowsWidget from './components/StatusRowsWidget.vue';
import * as ComponentExamples from './templates/component-examples';
import BaseLayoutSpan from './templates/block-spans/BaseLayoutSpan.vue';
import TemplateEChartWidget from './components/TemplateEChartWidget.vue';
import UniversalCardWidget from './components/UniversalCardWidget.vue';

export interface WidgetRegistration {
  component: Component;
  description: string;
  defaultViewport?: WidgetViewportConfig;
}

const componentExampleRegistry: Record<string, WidgetRegistration> = {
  KpiMetricExampleCard: {
    component: ComponentExamples.KpiMetricExampleCard,
    description: 'Component example catalog card for KPI metrics with title pill, unit, value, and 2x2 accessory metrics.',
  },
  TargetProgressExampleCard: {
    component: ComponentExamples.TargetProgressExampleCard,
    description: 'Component example catalog card for target progress with value, detail rows, and progress bar.',
  },
  RankingListExampleCard: {
    component: ComponentExamples.RankingListExampleCard,
    description: 'Component example catalog card for adaptive ranking lists with title, unit, and proportional row fills.',
  },
  LineChartExampleCard: {
    component: ComponentExamples.LineChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts line charts with title and unit.',
  },
  HeatmapChartExampleCard: {
    component: ComponentExamples.HeatmapChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts heatmaps with title, unit, and auxiliary metrics.',
  },
  BarChartExampleCard: {
    component: ComponentExamples.BarChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts bar charts with title, unit, and auxiliary metrics.',
  },
  ComboChartExampleCard: {
    component: ComponentExamples.ComboChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts combo charts with bars, lines, dual axes, and target marks.',
  },
  ProportionChartExampleCard: {
    component: ComponentExamples.ProportionChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts proportion charts with configurable pie or donut slices.',
  },
  DetailTableExampleCard: {
    component: ComponentExamples.DetailTableExampleCard,
    description: 'Component example catalog card for compact AntV S2 detail tables with title, metrics, frozen columns, and canvas scrolling.',
  },
  ComplexTableExampleCard: {
    component: ComponentExamples.ComplexTableExampleCard,
    description: 'Component example catalog card for AntV S2 complex tables with nested grouped headers, frozen dimensions, search, column settings, and pagination.',
  },
  QuadrantChartExampleCard: {
    component: ComponentExamples.QuadrantChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts quadrant scatter charts with auxiliary metrics and threshold lines.',
  },
  RadarChartExampleCard: {
    component: ComponentExamples.RadarChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts radar charts with auxiliary metrics and compact slot sizing.',
  },
  SunburstChartExampleCard: {
    component: ComponentExamples.SunburstChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts sunburst charts with hierarchical share data.',
  },
  RoundedFunnelChartExampleCard: {
    component: ComponentExamples.RoundedFunnelChartExampleCard,
    description: 'Component example catalog card for adaptive ECharts rounded funnel charts with stage conversion data.',
  },
  CustomEChartComponentTemplate: {
    component: ComponentExamples.CustomEChartComponentTemplate,
    description: 'Self-developed ECharts component template with rounded-funnel layout, reusable title/metrics/chart shell, and a replaceable custom-series render entry.',
  },
  ActionListExampleCard: {
    component: ComponentExamples.ActionListExampleCard,
    description: 'Component example catalog card for adaptive action checklist items with status, owner, and due metadata.',
  },
  ConclusionExampleCard: {
    component: ComponentExamples.ConclusionExampleCard,
    description: 'Component example catalog card for adaptive conclusions with a core insight area and supplementary list.',
  },
};

export const widgetRegistry: Partial<Record<RegisteredWidgetType, WidgetRegistration>> &
  Record<string, WidgetRegistration | undefined> = {
  AdvancedEChartWidget: {
    component: AdvancedEChartWidget,
    description: 'Template-carried adaptive ECharts widget for advanced chart families.',
  },
  CompactBarChart: {
    component: CompactBarChart,
    description: 'Compact ECharts bar chart for small 2x2 block component areas.',
  },
  BaseLayoutSpan: {
    component: BaseLayoutSpan,
    description: 'Block area region layout that adapts to cols/rows and renders configured component slots.',
  },
  KpiMetricWidget: {
    component: KpiMetricWidget,
    description: 'Template-carried 2x2 KPI metric component.',
  },
  MetricValueWidget: {
    component: MetricValueWidget,
    description: 'Template-carried 2x2 metric value component that only renders a full thousands-formatted value.',
  },
  ProgressGaugeWidget: {
    component: ProgressGaugeWidget,
    description: 'Template-carried 2x2 progress gauge component.',
  },
  RankingCardWidget: {
    component: RankingCardWidget,
    description: 'Template-carried 2x2 ranking card component with compact row budget.',
  },
  S2ReportTableWidget: {
    component: S2ReportTableWidget,
    description: 'Adaptive 4x3 AntV S2 report table with pivot, detail, complex grouped headers, search, column settings, and pagination.',
  },
  StatusRowsWidget: {
    component: StatusRowsWidget,
    description: 'Template-carried 2x2 status rows component with explicit row budget.',
  },
  MiniBarTrendWidget: {
    component: MiniBarTrendWidget,
    description: 'Template-carried 2x2 compact trend bar component.',
  },
  SignalMatrixWidget: {
    component: SignalMatrixWidget,
    description: 'Template-carried 2x2 signal matrix component.',
  },
  FollowupActionWidget: {
    component: FollowupActionWidget,
    description: 'Template-carried 2x2 action follow-up component with explicit disclosure budget.',
  },
  TemplateEChartWidget: {
    component: TemplateEChartWidget,
    description: 'Template-carried 2x2 adaptive ECharts widget for line, pie, scatter, map, and candlestick previews.',
  },
  UniversalCardWidget: {
    component: UniversalCardWidget,
    description: 'Template-carried 2x2 universal business card component for target, comparison, warning, contribution, grid, funnel, progress, and summary templates.',
  },
  ...componentExampleRegistry,
};
