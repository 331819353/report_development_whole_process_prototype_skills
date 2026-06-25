import type { WidgetMap } from '../../widgets/types';
import {
  normalizeReportTemplateAssetKind,
  type ReportTemplateAssetKind,
  type ReportTemplateGallerySection,
  type ReportTemplateNav,
} from '../types';
import { buildSectionRows, getNavSizedBlocks, getSizeId, getSizeLabel, groupBlocksBySize } from './layout-grid';

interface GalleryTextConfig {
  title: string;
  getSubtitle: (count: number) => string;
}

const getGalleryText = (kind: ReportTemplateAssetKind): GalleryTextConfig => {
  if (normalizeReportTemplateAssetKind(kind) === 'component-content-area-template') {
    return {
      title: '组件内容区模板',
      getSubtitle: (count) => `共 ${count} 个组件内容区模板，只用于填充 3 组件区槽位内的组件内部内容。`,
    };
  }

  return {
    title: '分块布局模板',
    getSubtitle: (count) => `共 ${count} 个带槽位的分块布局模板，统一声明 1-1 标题区、1-2 胶囊按钮区、2-1 附加信息区、2-2 单位区、3 组件区、4 说明区。`,
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
