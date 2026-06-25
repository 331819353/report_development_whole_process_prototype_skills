import type { DashboardConfig } from '../../types/dashboard';
import { extractBlockAssets } from '../utils/block-assets';
import { buildAssetGallerySections } from '../utils/gallery-sections';
import { getNavById, getReportTemplateNavs } from '../utils/nav';

export const componentSampleLibraryNavId = 'component-library';

const excludedRuntimeNavIds = new Set(['component-library', 'template-library']);

const getRuntimeComponentSampleAssets = (config: DashboardConfig) =>
  getReportTemplateNavs(config)
    .filter((nav) => !excludedRuntimeNavIds.has(nav.id))
    .flatMap((nav) => extractBlockAssets(nav, 'component-sample'))
    .filter((asset) => asset.widget);

export const getComponentSampleAssets = (config: DashboardConfig) => {
  const explicitAssets = extractBlockAssets(getNavById(config, componentSampleLibraryNavId), 'component-sample')
    .filter((asset) => asset.widget);

  return explicitAssets.length ? explicitAssets : getRuntimeComponentSampleAssets(config);
};

export const getComponentSampleGallerySections = (config: DashboardConfig) =>
  buildAssetGallerySections(getNavById(config, componentSampleLibraryNavId), 'component-sample');
