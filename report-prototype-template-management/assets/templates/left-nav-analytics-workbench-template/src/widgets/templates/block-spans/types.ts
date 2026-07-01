import type { DashboardActionMap } from '../../../types/actions';
import type { DashboardDataSourceRef, DashboardFilterScope } from '../../../types/data-source';
import type { RegisteredWidgetConfig, WidgetContext, WidgetDataBindingConfig } from '../../types';
import type { LayoutDensityBand, LayoutSpanSpec } from './catalog';

export type ComponentRegionPattern = string;

export interface LayoutSpanSlotContentRow {
  label?: string;
  value?: string;
  tone?: string;
  percent?: number;
}

export interface LayoutSpanSlotContent {
  type?: 'kpi' | 'metric' | 'trend' | 'funnel' | 'summary';
  label?: string;
  eyebrow?: string;
  title?: string;
  value?: string;
  unit?: string;
  delta?: string;
  rows?: LayoutSpanSlotContentRow[];
}

export interface LayoutSpanTemplateProps {
  context?: WidgetContext;
  data?: unknown[];
  cols?: number;
  rows?: number;
  title?: string;
  note?: string;
  showChrome?: boolean;
  showFooter?: boolean;
  secondary?: boolean | 'auto';
  density?: LayoutDensityBand | 'auto';
  placeholder?: string;
  zonePatternLabel?: string;
  // Letter occupancy grid, for example A, AABBC, or AAABB|AAABB|AAABB.
  componentRegionPattern?: ComponentRegionPattern;
  autoComponentSlots?: boolean;
  componentAreaPaddingPx?: number;
  componentSlotGapPx?: number;
  slotData?: Record<string, unknown[]>;
  slotContexts?: Record<string, WidgetContext>;
  componentSlots?: Array<{
    id: string;
    templateSlotId?: string;
    label?: string;
    regionKey?: string;
    role?: string;
    // Component slots carry only the selected component example body.
    // Block-level title, pills, component slots, and summaries belong to the block layout template.
    componentExampleId?: string;
    props?: Record<string, unknown>;
    widgetProps?: Record<string, unknown>;
    config?: Record<string, Record<string, unknown>>;
    dataPolicy?: RegisteredWidgetConfig['dataPolicy'];
    data?: DashboardDataSourceRef;
    dataBinding?: WidgetDataBindingConfig;
    filterScope?: DashboardFilterScope;
    actions?: DashboardActionMap;
    widget?: RegisteredWidgetConfig;
    content?: LayoutSpanSlotContent;
  }>;
  componentSlotContracts?: Array<{
    id: string;
    label: string;
    regionKey?: string;
    role?: string;
    order?: number;
    widthUnits?: number;
    heightUnits?: number;
    minSize?: string;
    required?: boolean;
  }>;
}

export type LayoutSpanTemplateWidgetProps = LayoutSpanTemplateProps & Record<string, unknown>;

export interface LayoutSpanSlotProps {
  spec: LayoutSpanSpec;
  rows: unknown[];
  title: string;
  note: string;
}
