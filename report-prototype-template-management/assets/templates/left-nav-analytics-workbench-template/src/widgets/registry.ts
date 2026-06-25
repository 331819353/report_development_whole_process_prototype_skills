import type { Component } from 'vue';
import type { RegisteredWidgetType, WidgetViewportConfig } from './types';
import AdvancedEChartWidget from './components/AdvancedEChartWidget.vue';
import ComplexGroupedTableWidget from './components/ComplexGroupedTableWidget.vue';
import CompactBarChart from './components/CompactBarChart.vue';
import DetailTableWidget from './components/DetailTableWidget.vue';
import ElementPivotTableWidget from './components/ElementPivotTableWidget.vue';
import FollowupActionWidget from './components/FollowupActionWidget.vue';
import KpiMetricWidget from './components/KpiMetricWidget.vue';
import MetricValueWidget from './components/MetricValueWidget.vue';
import MiniBarTrendWidget from './components/MiniBarTrendWidget.vue';
import ProgressGaugeWidget from './components/ProgressGaugeWidget.vue';
import RankingCardWidget from './components/RankingCardWidget.vue';
import S2ReportTableWidget from './components/S2ReportTableWidget.vue';
import SignalMatrixWidget from './components/SignalMatrixWidget.vue';
import StatusRowsWidget from './components/StatusRowsWidget.vue';
import * as SpanLayouts from './templates/block-spans';
import TemplateEChartWidget from './components/TemplateEChartWidget.vue';
import UniversalCardWidget from './components/UniversalCardWidget.vue';

export interface WidgetRegistration {
  component: Component;
  description: string;
  defaultViewport?: WidgetViewportConfig;
}

const spanLayoutRegistry = Object.fromEntries(
  Object.entries(SpanLayouts)
    .filter(([name]) => /^Span\d{2}x\d{2}Layout$/.test(name))
    .map(([name, component]) => [
      name,
      {
        component: component as Component,
        description: `Generic ${name.slice(4, 6)}x${name.slice(7, 9)} layout span preview for the 12x8 grid.`,
      },
    ]),
) as Record<string, WidgetRegistration>;

// 模板默认不内置业务组件，保持干净。
// 复制 WidgetTemplate.vue 开发组件后，在这里 import 并注册。
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
  ComplexGroupedTableWidget: {
    component: ComplexGroupedTableWidget,
    description: 'Adaptive 4x3 complex grouped-header table with frozen row dimensions and horizontal scroll.',
  },
  DetailTableWidget: {
    component: DetailTableWidget,
    description: 'Adaptive 4x3 Element Plus detail table with fixed columns, search, filters, pagination, and aligned columns.',
  },
  ElementPivotTableWidget: {
    component: ElementPivotTableWidget,
    description: 'Adaptive 4x3 Element Plus pivot table with fixed row dimensions, grouped metric columns, subtotal, and grand total.',
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
  ...spanLayoutRegistry,
};
