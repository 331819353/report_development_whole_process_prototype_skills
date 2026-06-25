import type { DashboardConfig, DashboardFilterGroup } from '../../types/dashboard';
import type {
  RegisteredWidgetConfig,
  WidgetAuxMetric,
  WidgetTitlePillOption,
  WidgetVisualType,
} from '../../widgets/types';
import type {
  ReportComponentSlotRole,
  ReportFrameworkAsset,
  ReportPageLayoutAsset,
  ReportTemplateBlockAsset,
  ReportTemplateComponentSlotContract,
  ReportTemplateNav,
  ReportTemplatePageConfig,
} from '../types';

export type ReportTemplateSlotId =
  | 'titleArea'
  | 'pillArea'
  | 'auxMetricArea'
  | 'unitArea'
  | 'componentArea'
  | 'summaryArea';

export type ReportTemplateSlotRole = 'block-chrome' | 'component-content' | 'supporting-content';
export type ReportTemplateSlotRegionCode = '1-1' | '1-2' | '2-1' | '2-2' | '3' | '4';
export type ReportTemplateSlotAlignment = 'left' | 'right' | 'fill';

export interface ReportTemplateSlotContract {
  id: ReportTemplateSlotId;
  regionCode: ReportTemplateSlotRegionCode;
  label: string;
  alignment: ReportTemplateSlotAlignment;
  role: ReportTemplateSlotRole;
  required: boolean;
  accepts: string[];
  maxItems?: number;
  widthRatio?: string;
  heightRatio?: string;
  description: string;
}

export interface ReportTemplateSlotFill {
  slotId: ReportTemplateSlotId;
  text?: string;
  pills?: WidgetTitlePillOption[];
  metrics?: WidgetAuxMetric[];
  unit?: WidgetAuxMetric | string;
  props?: Record<string, unknown>;
  hidden?: boolean;
}

export interface WidgetConfigurationSchema {
  visualType: WidgetVisualType;
  label: string;
  allowedSizes: string[];
  requiredSlots: ReportTemplateSlotId[];
  optionalSlots: ReportTemplateSlotId[];
  requiredConfigKeys: string[];
  dataRequirement: 'none' | 'static-or-data-source' | 'data-source-preferred';
  minContentWidth?: number;
  minContentHeight?: number;
  notes?: string[];
}

export type ReportCompatibilitySeverity = 'error' | 'warning' | 'info';

export interface ReportCompatibilityFinding {
  severity: ReportCompatibilitySeverity;
  code: string;
  message: string;
  path?: string;
}

export interface ReportCompatibilityRule {
  id: string;
  label: string;
  severity: ReportCompatibilitySeverity;
  description: string;
}

export interface ReportBlueprintDataBinding {
  mode: 'static' | 'dataset' | 'api' | 'provider' | 'external';
  sourceId?: string;
  datasetKey?: string;
  requiredFilters?: string[];
  filterFields?: string[];
  notes?: string[];
}

export interface ReportBlueprintComponentSlot {
  id: string;
  templateSlotId?: string;
  label?: string;
  regionKey?: string;
  role?: ReportComponentSlotRole;
  size?: string;
  componentContentAreaTemplateId?: string;
  /** @deprecated Use componentContentAreaTemplateId. */
  componentSampleId?: string;
  widget?: RegisteredWidgetConfig;
  slotFills?: ReportTemplateSlotFill[];
  dataBinding?: ReportBlueprintDataBinding;
}

export interface ReportComponentRegionPatternOption {
  id: string;
  size: string;
  cols: number;
  rows: number;
  pattern: string;
  slotCount: number;
  widths: number[];
  slotContracts: ReportTemplateComponentSlotContract[];
  description: string;
}

export interface ReportBlueprintBlock {
  id: string;
  blockLayoutTemplateId?: string;
  /** @deprecated Use blockLayoutTemplateId. */
  genericTemplateId?: string;
  componentRegionPattern?: string;
  componentContentAreaTemplateId?: string;
  /** @deprecated Use componentContentAreaTemplateId. */
  componentSampleId?: string;
  widget?: RegisteredWidgetConfig;
  componentSlots?: ReportBlueprintComponentSlot[];
  slotFills?: ReportTemplateSlotFill[];
  dataBinding?: ReportBlueprintDataBinding;
}

export interface ReportBlueprintPage {
  id: string;
  label: string;
  icon?: string;
  layoutRows: string[];
  blocks: ReportBlueprintBlock[];
}

export interface ReportBlueprint {
  id: string;
  title: string;
  description?: string;
  frameworkId: string;
  pageLayoutId: string;
  status?: 'draft' | 'ready' | 'blocked';
  pages: ReportBlueprintPage[];
  filters?: DashboardFilterGroup[];
  notes?: string[];
}

export interface ReportAssetResolutionContext {
  frameworks: ReportFrameworkAsset[];
  pageLayouts: ReportPageLayoutAsset[];
  componentContentAreaTemplates: ReportTemplateBlockAsset[];
  blockLayoutTemplates: ReportTemplateBlockAsset[];
  /** @deprecated Use componentContentAreaTemplates. */
  componentSamples: ReportTemplateBlockAsset[];
  /** @deprecated Use blockLayoutTemplates. */
  genericTemplates: ReportTemplateBlockAsset[];
}

export interface ReportBlueprintCatalog {
  materializerVersion: string;
  slotContracts: ReportTemplateSlotContract[];
  widgetSchemas: WidgetConfigurationSchema[];
  compatibilityRules: ReportCompatibilityRule[];
  componentRegionPatterns: ReportComponentRegionPatternOption[];
  currentConfigBlueprint: ReportBlueprint;
}

export interface ReportMaterializeOptions {
  keepBaseFilters?: boolean;
  blockWhenInvalid?: boolean;
}

export interface ReportMaterializeResult {
  config: DashboardConfig;
  findings: ReportCompatibilityFinding[];
  generatedPages: ReportTemplateNav[];
}

export interface ReportTemplateRuntimePages {
  nav?: ReportTemplateNav[];
  page?: ReportTemplatePageConfig;
  pages?: Record<string, ReportTemplatePageConfig>;
}
