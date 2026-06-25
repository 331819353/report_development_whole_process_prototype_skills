import type { DashboardConfig } from '../types/dashboard';
import type { ReportTemplateAssetCatalog } from './types';
import { getReportBlueprintCatalog } from './blueprint';
import { getComponentContentAreaTemplateAssets } from './libraries/component-samples';
import { reportTemplateDevelopmentFlow } from './libraries/development-flow';
import { frameworkLibrary } from './libraries/frameworks';
import { getBlockLayoutTemplateAssets } from './libraries/generic-templates';
import { pageLayoutLibrary } from './libraries/page-layouts';

export const getReportTemplateAssetCatalog = (config: DashboardConfig): ReportTemplateAssetCatalog => {
  const componentContentAreaTemplates = getComponentContentAreaTemplateAssets(config);
  const blockLayoutTemplates = getBlockLayoutTemplateAssets(config);
  const assetContext = {
    frameworks: frameworkLibrary,
    pageLayouts: pageLayoutLibrary,
    componentContentAreaTemplates,
    blockLayoutTemplates,
    componentSamples: componentContentAreaTemplates,
    genericTemplates: blockLayoutTemplates,
  };

  return {
    ...assetContext,
    developmentFlow: reportTemplateDevelopmentFlow,
    blueprint: getReportBlueprintCatalog(config, assetContext),
  };
};
