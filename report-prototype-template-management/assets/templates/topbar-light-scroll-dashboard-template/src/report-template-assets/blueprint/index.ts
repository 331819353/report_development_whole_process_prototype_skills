import type { DashboardConfig } from '../../types/dashboard';
import { getComponentRegionPatternOptions } from './component-region-patterns';
import { reportCompatibilityRules, validateReportBlueprint } from './compatibility';
import { createBlueprintFromDashboardConfig } from './from-config';
import { materializeReportBlueprint } from './materialize';
import { reportTemplateSlotContracts } from './slot-contracts';
import type { ReportAssetResolutionContext, ReportBlueprintCatalog } from './types';
import { widgetConfigurationSchemas } from './widget-config-schemas';

export * from './compatibility';
export * from './component-region-patterns';
export * from './from-config';
export * from './materialize';
export * from './slot-contracts';
export * from './types';
export * from './widget-config-schemas';

export const reportBlueprintMaterializerVersion = '0.1.0';

export const getReportBlueprintCatalog = (
  config: DashboardConfig,
  context: ReportAssetResolutionContext,
): ReportBlueprintCatalog => ({
  materializerVersion: reportBlueprintMaterializerVersion,
  slotContracts: reportTemplateSlotContracts,
  widgetSchemas: widgetConfigurationSchemas,
  compatibilityRules: reportCompatibilityRules,
  componentRegionPatterns: getComponentRegionPatternOptions(),
  currentConfigBlueprint: createBlueprintFromDashboardConfig(config, {
    frameworkId: context.frameworks[0]?.id ?? 'unknown-framework',
    pageLayoutId: context.pageLayouts[0]?.id ?? 'unknown-layout',
    description: 'Auto-derived blueprint for the currently mounted dashboard config.',
  }),
});

export const validateAndMaterializeReportBlueprint = (
  config: DashboardConfig,
  context: ReportAssetResolutionContext,
  blueprint = getReportBlueprintCatalog(config, context).currentConfigBlueprint,
) => {
  const findings = validateReportBlueprint(blueprint, context);

  if (findings.some((finding) => finding.severity === 'error')) {
    return {
      config,
      findings,
      generatedPages: [],
    };
  }

  return materializeReportBlueprint(config, blueprint, context);
};
