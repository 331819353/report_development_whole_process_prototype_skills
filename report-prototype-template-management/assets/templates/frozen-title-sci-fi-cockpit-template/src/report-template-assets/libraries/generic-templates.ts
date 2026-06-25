import type { DashboardConfig } from '../../types/dashboard';
import type { ReportTemplateBlockAsset } from '../types';
import { getComponentRegionPatternOptionsForSize } from '../blueprint/component-region-patterns';
import { extractBlockAssets } from '../utils/block-assets';
import { buildAssetGallerySections } from '../utils/gallery-sections';
import { getNavSizedBlocks, getSizeLabel } from '../utils/layout-grid';
import { getNavById, getReportTemplateNavs } from '../utils/nav';

export const blockLayoutTemplateLibraryNavId = 'template-library';
/** @deprecated Use blockLayoutTemplateLibraryNavId. */
export const genericTemplateLibraryNavId = blockLayoutTemplateLibraryNavId;

const excludedRuntimeNavIds = new Set(['component-library', 'template-library']);

const getRuntimeBlockLayoutTemplateAssets = (config: DashboardConfig): ReportTemplateBlockAsset[] =>
  getReportTemplateNavs(config)
    .filter((nav) => !excludedRuntimeNavIds.has(nav.id))
    .flatMap((nav) =>
      getNavSizedBlocks(nav).flatMap((block) =>
        getComponentRegionPatternOptionsForSize(block.cols, block.rows).map((pattern) => ({
          id: `${nav.id}:${block.label}:${pattern.pattern}`,
          kind: 'block-layout-template' as const,
          label: `${getSizeLabel(block.cols, block.rows)} ${pattern.pattern} 分块布局模板`,
          size: getSizeLabel(block.cols, block.rows),
          cols: block.cols,
          rows: block.rows,
          sourceNavId: nav.id,
          sourceBlockId: `${block.label}:${pattern.pattern}`,
          componentRegionPattern: pattern.pattern,
          componentSlotContracts: pattern.slotContracts,
        })),
      ),
    );

export const getBlockLayoutTemplateAssets = (config: DashboardConfig) => {
  const explicitAssets = extractBlockAssets(getNavById(config, blockLayoutTemplateLibraryNavId), 'block-layout-template');

  return explicitAssets.length
    ? explicitAssets.map((asset) => {
        if (asset.componentSlotContracts?.length) {
          return asset;
        }

        const fallbackPattern = getComponentRegionPatternOptionsForSize(asset.cols, asset.rows)[0];

        return {
          ...asset,
          componentRegionPattern: asset.componentRegionPattern ?? fallbackPattern?.pattern,
          componentSlotContracts: fallbackPattern?.slotContracts,
        };
      })
    : getRuntimeBlockLayoutTemplateAssets(config);
};

/** @deprecated Use getBlockLayoutTemplateAssets. */
export const getGenericTemplateAssets = getBlockLayoutTemplateAssets;

export const getBlockLayoutTemplateGallerySections = (config: DashboardConfig) =>
  buildAssetGallerySections(getNavById(config, blockLayoutTemplateLibraryNavId), 'block-layout-template');

/** @deprecated Use getBlockLayoutTemplateGallerySections. */
export const getGenericTemplateGallerySections = getBlockLayoutTemplateGallerySections;
