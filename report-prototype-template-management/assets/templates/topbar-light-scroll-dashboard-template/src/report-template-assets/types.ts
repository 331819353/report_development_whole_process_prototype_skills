import type { RegisteredWidgetConfig, WidgetMap } from '../widgets/types';
import type { ReportBlueprintCatalog } from './blueprint/types';

export type CanonicalReportTemplateAssetKind = 'component-content-area-template' | 'block-layout-template';
export type LegacyReportTemplateAssetKind = 'component-sample' | 'generic-template';
export type ReportTemplateAssetKind = CanonicalReportTemplateAssetKind | LegacyReportTemplateAssetKind;

export const normalizeReportTemplateAssetKind = (kind: ReportTemplateAssetKind): CanonicalReportTemplateAssetKind => {
  if (kind === 'component-sample') {
    return 'component-content-area-template';
  }

  if (kind === 'generic-template') {
    return 'block-layout-template';
  }

  return kind;
};

export interface ReportFrameworkAsset {
  id: string;
  label: string;
  description: string;
  navId: string;
}

export interface ReportPageLayoutAsset {
  id: string;
  label: string;
  description: string;
  designWidth: number;
  designHeight: number;
  gridColumns: number;
  gridRows: number;
}

export interface ReportTemplateDevelopmentStep {
  id: string;
  label: string;
  description: string;
  requiredInputs?: string[];
  outputArtifact?: string;
  gate?: string;
}

export interface ReportTemplatePageConfig {
  layoutRows: string[];
  widgets?: WidgetMap;
}

export interface ReportTemplateNav {
  id: string;
  label: string;
  icon?: string;
  layoutRows: string[];
  widgets?: WidgetMap;
}

export type ReportComponentSlotRole = 'primary' | 'secondary' | 'supporting' | 'reference';

export interface ReportTemplateComponentSlotContract {
  id: string;
  label: string;
  regionKey?: string;
  role?: ReportComponentSlotRole;
  order: number;
  widthUnits?: number;
  heightUnits?: number;
  minSize?: string;
  accepts?: string[];
  required?: boolean;
  description?: string;
}

export interface ReportTemplateBlockAsset {
  id: string;
  kind: ReportTemplateAssetKind;
  label: string;
  size: string;
  cols: number;
  rows: number;
  sourceNavId: string;
  sourceBlockId: string;
  templateFile?: string;
  widget?: RegisteredWidgetConfig;
  componentRegionPattern?: string;
  componentSlotContracts?: ReportTemplateComponentSlotContract[];
}

export interface ReportTemplateGallerySection {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  nav: ReportTemplateNav;
}

export interface ReportTemplateAssetCatalog {
  frameworks: ReportFrameworkAsset[];
  pageLayouts: ReportPageLayoutAsset[];
  developmentFlow: ReportTemplateDevelopmentStep[];
  componentContentAreaTemplates: ReportTemplateBlockAsset[];
  blockLayoutTemplates: ReportTemplateBlockAsset[];
  /** @deprecated Use componentContentAreaTemplates. */
  componentSamples: ReportTemplateBlockAsset[];
  /** @deprecated Use blockLayoutTemplates. */
  genericTemplates: ReportTemplateBlockAsset[];
  blueprint: ReportBlueprintCatalog;
}

export interface LayoutBlock {
  id: string;
  label: string;
  columnStart: number;
  columnEnd: number;
  rowStart: number;
  rowEnd: number;
}

export interface SizedLayoutBlock extends LayoutBlock {
  cols: number;
  rows: number;
}

export interface SizedLayoutBlockGroup {
  key: string;
  cols: number;
  rows: number;
  blocks: SizedLayoutBlock[];
}
