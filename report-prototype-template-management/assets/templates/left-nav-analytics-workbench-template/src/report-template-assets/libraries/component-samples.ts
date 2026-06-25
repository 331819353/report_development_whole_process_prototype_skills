import type { DashboardConfig } from '../../types/dashboard';
import type { ReportTemplateBlockAsset } from '../types';
import { extractBlockAssets } from '../utils/block-assets';
import { buildAssetGallerySections } from '../utils/gallery-sections';
import { getNavById, getReportTemplateNavs } from '../utils/nav';

export const componentContentAreaTemplateLibraryNavId = 'component-library';
/** @deprecated Use componentContentAreaTemplateLibraryNavId. */
export const componentSampleLibraryNavId = componentContentAreaTemplateLibraryNavId;

const excludedRuntimeNavIds = new Set(['component-library', 'template-library']);

const hasComponentContentAreaWidget = (asset: ReportTemplateBlockAsset) => Boolean(asset.widget);

const getRuntimeComponentContentAreaTemplateAssets = (config: DashboardConfig) =>
  getReportTemplateNavs(config)
    .filter((nav) => !excludedRuntimeNavIds.has(nav.id))
    .flatMap((nav) => extractBlockAssets(nav, 'component-content-area-template'))
    .filter(hasComponentContentAreaWidget);

export const getComponentContentAreaTemplateAssets = (config: DashboardConfig) => {
  const explicitAssets = extractBlockAssets(
    getNavById(config, componentContentAreaTemplateLibraryNavId),
    'component-content-area-template',
  )
    .filter(hasComponentContentAreaWidget);

  return explicitAssets.length ? explicitAssets : getRuntimeComponentContentAreaTemplateAssets(config);
};

/** @deprecated Use getComponentContentAreaTemplateAssets. */
export const getComponentSampleAssets = getComponentContentAreaTemplateAssets;

export const getComponentContentAreaTemplateGallerySections = (config: DashboardConfig) =>
  buildAssetGallerySections(
    getNavById(config, componentContentAreaTemplateLibraryNavId),
    'component-content-area-template',
  );

/** @deprecated Use getComponentContentAreaTemplateGallerySections. */
export const getComponentSampleGallerySections = getComponentContentAreaTemplateGallerySections;
