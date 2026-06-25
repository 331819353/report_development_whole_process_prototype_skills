import type { DashboardConfig } from '../../types/dashboard';
import type { ReportTemplateBlockAsset } from '../types';
import { getComponentRegionPatternOptionsForSize } from '../blueprint/component-region-patterns';
import { extractBlockAssets } from '../utils/block-assets';
import { buildAssetGallerySections } from '../utils/gallery-sections';
import { getNavSizedBlocks, getSizeLabel } from '../utils/layout-grid';
import { getNavById, getReportTemplateNavs } from '../utils/nav';

export const genericTemplateLibraryNavId = 'template-library';

const excludedRuntimeNavIds = new Set(['component-library', 'template-library']);

const getRuntimeGenericTemplateAssets = (config: DashboardConfig): ReportTemplateBlockAsset[] =>
  getReportTemplateNavs(config)
    .filter((nav) => !excludedRuntimeNavIds.has(nav.id))
    .flatMap((nav) =>
      getNavSizedBlocks(nav).flatMap((block) =>
        getComponentRegionPatternOptionsForSize(block.cols, block.rows).map((pattern) => ({
          id: `${nav.id}:${block.label}:${pattern.pattern}`,
          kind: 'generic-template' as const,
          label: `${getSizeLabel(block.cols, block.rows)} ${pattern.pattern} 通用布局`,
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

export const getGenericTemplateAssets = (config: DashboardConfig) => {
  const explicitAssets = extractBlockAssets(getNavById(config, genericTemplateLibraryNavId), 'generic-template');

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
    : getRuntimeGenericTemplateAssets(config);
};

export const getGenericTemplateGallerySections = (config: DashboardConfig) =>
  buildAssetGallerySections(getNavById(config, genericTemplateLibraryNavId), 'generic-template');
