import type {
  ReportTemplateAssetKind,
  ReportTemplateBlockAsset,
  ReportTemplateComponentSlotContract,
  ReportTemplateNav,
} from '../types';
import { getNavSizedBlocks, getSizeLabel } from './layout-grid';

type WidgetTemplateProps = {
  componentRegionPattern?: string;
  componentSlotContracts?: ReportTemplateComponentSlotContract[];
  templateFile?: string;
};

const getWidgetTemplateProps = (widget?: ReportTemplateBlockAsset['widget']) =>
  (widget?.props ?? {}) as WidgetTemplateProps;

export const extractBlockAssets = (sourceNav: ReportTemplateNav | undefined, kind: ReportTemplateAssetKind) => {
  if (!sourceNav?.widgets) {
    return [];
  }

  return getNavSizedBlocks(sourceNav).map<ReportTemplateBlockAsset>((block) => {
    const widget = sourceNav.widgets?.[block.label];
    const templateProps = getWidgetTemplateProps(widget);

    return {
      id: `${sourceNav.id}:${block.label}`,
      kind,
      label: block.label,
      size: getSizeLabel(block.cols, block.rows),
      cols: block.cols,
      rows: block.rows,
      sourceNavId: sourceNav.id,
      sourceBlockId: block.label,
      templateFile: typeof templateProps.templateFile === 'string' ? templateProps.templateFile : undefined,
      widget,
      componentRegionPattern: templateProps.componentRegionPattern,
      componentSlotContracts: templateProps.componentSlotContracts,
    };
  });
};
