import type { WidgetMap } from '../../widgets/types';
import type { ReportTemplateAssetKind, ReportTemplateGallerySection, ReportTemplateNav } from '../types';
import { buildSectionRows, getNavSizedBlocks, getSizeId, getSizeLabel, groupBlocksBySize } from './layout-grid';

interface GalleryTextConfig {
  title: string;
  getSubtitle: (count: number) => string;
}

const getGalleryText = (kind: ReportTemplateAssetKind): GalleryTextConfig => {
  if (kind === 'component-sample') {
    return {
      title: '组件实现样板',
      getSubtitle: (count) => `共 ${count} 个样板，用于填充通用模板中的标题、胶囊、组件区域、说明区等内容物。`,
    };
  }

  return {
    title: '通用模板',
    getSubtitle: (count) => `共 ${count} 个通用布局，按标题区、辅助信息区、组件区域、说明区进行占位设计。`,
  };
};

export const buildAssetGallerySections = (
  sourceNav: ReportTemplateNav | undefined,
  kind: ReportTemplateAssetKind,
): ReportTemplateGallerySection[] => {
  if (!sourceNav?.widgets) {
    return [];
  }

  return groupBlocksBySize(getNavSizedBlocks(sourceNav)).map(({ cols, rows, blocks }) => {
    const sizeId = getSizeId(cols, rows);
    const sizeLabel = getSizeLabel(cols, rows);
    const text = getGalleryText(kind);
    const widgets = blocks.reduce<WidgetMap>((result, block) => {
      result[block.label] = sourceNav.widgets?.[block.label];
      return result;
    }, {});

    return {
      id: `${sourceNav.id}-${kind}-${sizeId}`,
      title: text.title,
      subtitle: text.getSubtitle(blocks.length),
      badge: sizeLabel,
      nav: {
        id: `${sourceNav.id}-${kind}-${sizeId}`,
        label: text.title,
        icon: 'Gauge',
        layoutRows: buildSectionRows(blocks, cols, rows),
        widgets,
      },
    };
  });
};
