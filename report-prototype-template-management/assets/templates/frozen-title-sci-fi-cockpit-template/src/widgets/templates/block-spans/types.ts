import type { RegisteredWidgetConfig, WidgetContext } from '../../types';
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
  title?: string;
  note?: string;
  showChrome?: boolean;
  showFooter?: boolean;
  secondary?: boolean | 'auto';
  density?: LayoutDensityBand | 'auto';
  placeholder?: string;
  zonePatternLabel?: string;
  componentRegionPattern?: ComponentRegionPattern;
  componentSlots?: Array<{
    id: string;
    templateSlotId?: string;
    label?: string;
    regionKey?: string;
    role?: string;
    // Component slots carry only the selected component's internal content area.
    // Block-level additional information, unit, pills, and summaries belong to the block layout template.
    componentContentAreaTemplateId?: string;
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
