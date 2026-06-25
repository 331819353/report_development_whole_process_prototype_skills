import type { DashboardConfig } from '../types/dashboard';
import type { ReportTemplateAssetCatalog } from './types';
import { getReportBlueprintCatalog } from './blueprint';
import { getComponentSampleAssets } from './libraries/component-samples';
import { reportTemplateDevelopmentFlow } from './libraries/development-flow';
import { frameworkLibrary } from './libraries/frameworks';
import { getGenericTemplateAssets } from './libraries/generic-templates';
import { pageLayoutLibrary } from './libraries/page-layouts';

export const getReportTemplateAssetCatalog = (config: DashboardConfig): ReportTemplateAssetCatalog => {
  const componentSamples = getComponentSampleAssets(config);
  const genericTemplates = getGenericTemplateAssets(config);
  const assetContext = {
    frameworks: frameworkLibrary,
    pageLayouts: pageLayoutLibrary,
    componentSamples,
    genericTemplates,
  };

  return {
    ...assetContext,
    developmentFlow: reportTemplateDevelopmentFlow,
    blueprint: getReportBlueprintCatalog(config, assetContext),
  };
};
