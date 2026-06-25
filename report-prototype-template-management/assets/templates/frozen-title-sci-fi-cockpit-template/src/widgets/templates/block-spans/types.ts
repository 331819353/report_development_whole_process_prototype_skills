import type { WidgetContext } from '../../types';
import type { LayoutDensityBand, LayoutSpanSpec } from './catalog';

export type ComponentRegionPattern = string;

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
  }>;
  componentSlotContracts?: Array<{
    id: string;
    label: string;
    regionKey?: string;
    role?: string;
    order?: number;
    widthUnits?: number;
    heightUnits?: number;
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
