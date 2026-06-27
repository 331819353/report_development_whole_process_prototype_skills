import type { RegisteredWidgetConfig, WidgetTitlePillOption, WidgetVisualType } from '../../widgets/types';
import type { ReportTemplateBlockAsset, ReportTemplateComponentSlotContract } from '../types';
import { buildLayoutBlocks, getSizeLabel, normalizeLayoutRows } from '../utils/layout-grid';
import { isWidgetSizeAllowed } from './widget-config-schemas';
import type {
  ReportAssetResolutionContext,
  ReportBlueprint,
  ReportBlueprintBlock,
  ReportBlueprintComponentSlot,
  ReportBlueprintSelfDevelopmentException,
  ReportCompatibilityFinding,
  ReportCompatibilityRule,
  ReportTemplateSlotFill,
} from './types';
import {
  buildComponentRegionPatternFromSlots,
  buildComponentSlotContractsFromPattern,
  getComponentRegionKeys,
  normalizeComponentRegionPattern,
} from './component-region-patterns';

export const reportCompatibilityRules: ReportCompatibilityRule[] = [
  {
    id: 'framework-exists',
    label: 'Framework exists',
    severity: 'error',
    description: 'The selected frameworkId must exist in the framework library.',
  },
  {
    id: 'page-layout-exists',
    label: 'Page layout exists',
    severity: 'error',
    description: 'The selected pageLayoutId must exist in the page layout library.',
  },
  {
    id: 'layout-rows-shape',
    label: 'Layout rows shape',
    severity: 'error',
    description: 'Every generated page must keep the configured grid width, minimum 2*2 blocks, and M >= N.',
  },
  {
    id: 'asset-size-match',
    label: 'Asset size match',
    severity: 'error',
    description: 'Block layout templates and component content area templates must fit the target block span or declare an allowed visualType fallback.',
  },
  {
    id: 'slot-contract',
    label: 'Slot contract',
    severity: 'error',
    description: 'Block slot fills must target the standard block-layout areas; component slot fills may only target 3 componentArea with component content area templates.',
  },
];

const knownSlotIds = new Set(['titleArea', 'pillArea', 'auxMetricArea', 'unitArea', 'componentArea', 'summaryArea']);
const componentContentAreaSlotFillIds = new Set(['componentArea']);
const standardSlotAreaList = '1-1 titleArea, 1-2 pillArea, 2-1 auxMetricArea, 2-2 unitArea, 3 componentArea, 4 summaryArea';
const allowedSelfDevelopmentExceptionTypes = new Set(['interactionBehavior', 'componentContentAreaTemplate']);
const allowedInteractionTypes = new Set(['drilldown', 'jump', 'modal', 'drawer', 'popup', 'crossFilter']);
const allowedInteractionTriggerOwners = new Set(['templateActionHook', 'componentOwnedEvent', 'widgetEvent']);
const allowedInteractionTargetTypes = new Set(['route', 'drawer', 'modal', 'popover', 'external', 'cross-filter', 'fullscreen', 'export']);

const pushFinding = (
  findings: ReportCompatibilityFinding[],
  severity: ReportCompatibilityFinding['severity'],
  code: string,
  message: string,
  path?: string,
) => {
  findings.push({ severity, code, message, path });
};

const getAssetById = <T extends { id: string; sourceBlockId?: string }>(assets: T[], id?: string) => {
  if (!id) {
    return undefined;
  }

  return assets.find((asset) => asset.id === id || asset.sourceBlockId === id);
};

const getBlockGenericTemplate = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  getAssetById(context.blockLayoutTemplates, block.blockLayoutTemplateId ?? block.genericTemplateId);

const getBlockWidget = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  block.widget ??
  getAssetById(context.componentContentAreaTemplates, block.componentContentAreaTemplateId ?? block.componentSampleId)?.widget ??
  getBlockGenericTemplate(block, context)?.widget;

const getComponentSlotWidget = (slot: ReportBlueprintComponentSlot, context: ReportAssetResolutionContext) =>
  slot.widget ?? getAssetById(context.componentContentAreaTemplates, slot.componentContentAreaTemplateId ?? slot.componentSampleId)?.widget;

const getWidgetVisualType = (widget?: RegisteredWidgetConfig): WidgetVisualType | undefined => widget?.visualType;

const validateSlotFills = (
  block: ReportBlueprintBlock,
  findings: ReportCompatibilityFinding[],
  path: string,
) => {
  block.slotFills?.forEach((slotFill, index) => {
    const slotPath = `${path}.slotFills[${index}]`;

    if (!knownSlotIds.has(slotFill.slotId)) {
      pushFinding(findings, 'error', 'RPT-SLOT-UNKNOWN', `Unknown slot "${slotFill.slotId}". Use one of: ${standardSlotAreaList}.`, slotPath);
    }

    if (slotFill.slotId === 'pillArea' && (slotFill.pills?.length ?? 0) > 3) {
      pushFinding(findings, 'error', 'RPT-SLOT-PILL-LIMIT', '1-2 pillArea supports at most 3 values.', slotPath);
    }

    if (slotFill.slotId === 'auxMetricArea' && (slotFill.metrics?.length ?? 0) > 5) {
      pushFinding(findings, 'warning', 'RPT-SLOT-AUX-DENSE', '2-1 auxMetricArea has more than 5 metrics; the materializer will keep the first supported metrics plus the 2-2 unit.', slotPath);
    }
  });
};

const hasNonEmptyString = (value?: string) => Boolean(value?.trim());

const requireExceptionStringField = (
  exception: ReportBlueprintSelfDevelopmentException,
  field: keyof ReportBlueprintSelfDevelopmentException,
  findings: ReportCompatibilityFinding[],
  path: string,
) => {
  const value = exception[field];

  if (typeof value !== 'string' || !value.trim()) {
    pushFinding(findings, 'error', 'RPT-SELFDEV-FIELD-MISSING', `selfDevelopmentExceptionMap.${String(field)} is required.`, `${path}.${String(field)}`);
  }
};

const requireExceptionStringArrayField = (
  exception: ReportBlueprintSelfDevelopmentException,
  field: keyof ReportBlueprintSelfDevelopmentException,
  findings: ReportCompatibilityFinding[],
  path: string,
) => {
  const value = exception[field];

  if (!Array.isArray(value) || !value.some((item) => typeof item === 'string' && item.trim())) {
    pushFinding(findings, 'error', 'RPT-SELFDEV-FIELD-MISSING', `selfDevelopmentExceptionMap.${String(field)} must list at least one field.`, `${path}.${String(field)}`);
  }
};

const getSelfDevelopmentExceptionEntries = (blueprint: ReportBlueprint) => {
  const exceptions = blueprint.selfDevelopmentExceptionMap;

  if (!exceptions) {
    return [];
  }

  if (Array.isArray(exceptions)) {
    return exceptions.map((exception, index) => ({
      key: exception.id ?? String(index),
      exception,
      path: `selfDevelopmentExceptionMap[${index}]`,
    }));
  }

  return Object.entries(exceptions).map(([key, exception]) => ({
    key,
    exception: { ...exception, id: exception.id ?? key },
    path: `selfDevelopmentExceptionMap.${key}`,
  }));
};

const validateSelfDevelopmentExceptions = (
  blueprint: ReportBlueprint,
  context: ReportAssetResolutionContext,
  findings: ReportCompatibilityFinding[],
) => {
  getSelfDevelopmentExceptionEntries(blueprint).forEach(({ key, exception, path }) => {
    const exceptionId = exception.id ?? key;

    if (!hasNonEmptyString(exceptionId)) {
      pushFinding(findings, 'error', 'RPT-SELFDEV-ID-MISSING', 'selfDevelopmentExceptionMap entries must declare id or use a non-empty map key.', path);
    }

    if (!exception.type || !allowedSelfDevelopmentExceptionTypes.has(exception.type)) {
      pushFinding(
        findings,
        'error',
        'RPT-SELFDEV-TYPE',
        'Only interactionBehavior and componentContentAreaTemplate may be self-developed; all other report areas must use templates.',
        `${path}.type`,
      );
      return;
    }

    if (exception.type === 'componentContentAreaTemplate') {
      ['sourcePageId', 'sourceBlockId', 'sourceSlotId', 'componentContentAreaTemplateId'].forEach((field) =>
        requireExceptionStringField(exception, field as keyof ReportBlueprintSelfDevelopmentException, findings, path),
      );

      if (
        exception.componentContentAreaTemplateId &&
        !getAssetById(context.componentContentAreaTemplates, exception.componentContentAreaTemplateId)
      ) {
        pushFinding(
          findings,
          'error',
          'RPT-SELFDEV-COMPONENT-TEMPLATE-MISSING',
          `Unknown component content area template "${exception.componentContentAreaTemplateId}". Register it before using it as a self-developed exception.`,
          `${path}.componentContentAreaTemplateId`,
        );
      }

      return;
    }

    [
      'interactionId',
      'interactionType',
      'triggerOwner',
      'sourcePageId',
      'sourceBlockId',
      'sourceSlotId',
      'sourceComponentContentAreaTemplateId',
      'target',
      'targetType',
      'stateSync',
      'permissionRule',
      'closeBackBehavior',
      'qaCase',
    ].forEach((field) =>
      requireExceptionStringField(exception, field as keyof ReportBlueprintSelfDevelopmentException, findings, path),
    );
    requireExceptionStringArrayField(exception, 'payloadFields', findings, path);
    requireExceptionStringArrayField(exception, 'contextInheritance', findings, path);

    if (exception.interactionType && !allowedInteractionTypes.has(exception.interactionType)) {
      pushFinding(findings, 'error', 'RPT-SELFDEV-INTERACTION-TYPE', `Unsupported interactionType "${exception.interactionType}".`, `${path}.interactionType`);
    }

    if (exception.triggerOwner && !allowedInteractionTriggerOwners.has(exception.triggerOwner)) {
      pushFinding(findings, 'error', 'RPT-SELFDEV-TRIGGER-OWNER', `Unsupported triggerOwner "${exception.triggerOwner}".`, `${path}.triggerOwner`);
    }

    if (exception.targetType && !allowedInteractionTargetTypes.has(exception.targetType)) {
      pushFinding(findings, 'error', 'RPT-SELFDEV-TARGET-TYPE', `Unsupported targetType "${exception.targetType}".`, `${path}.targetType`);
    }

    if (
      exception.sourceComponentContentAreaTemplateId &&
      !getAssetById(context.componentContentAreaTemplates, exception.sourceComponentContentAreaTemplateId)
    ) {
      pushFinding(
        findings,
        'error',
        'RPT-SELFDEV-INTERACTION-SOURCE-MISSING',
        `Unknown source component content area template "${exception.sourceComponentContentAreaTemplateId}".`,
        `${path}.sourceComponentContentAreaTemplateId`,
      );
    }

    if (!hasNonEmptyString(exception.reason)) {
      pushFinding(findings, 'warning', 'RPT-SELFDEV-REASON', 'Self-development exceptions should state why no existing template is sufficient.', `${path}.reason`);
    }
  });
};

const countEnabledPills = (pills?: WidgetTitlePillOption[]) => pills?.filter((pill) => !pill.disabled).length ?? 0;

const getComponentSlotIdentity = (slot: ReportBlueprintComponentSlot, index: number) =>
  slot.templateSlotId ?? slot.id ?? slot.regionKey ?? String.fromCharCode(65 + index);

const getBlockComponentPattern = (
  block: ReportBlueprintBlock,
  genericTemplate?: ReportTemplateBlockAsset,
) =>
  normalizeComponentRegionPattern(
    block.componentRegionPattern ??
    genericTemplate?.componentRegionPattern ??
    buildComponentRegionPatternFromSlots(block.componentSlots),
  );

const getBlockComponentSlotContracts = (
  block: ReportBlueprintBlock,
  genericTemplate?: ReportTemplateBlockAsset,
): ReportTemplateComponentSlotContract[] => {
  if (genericTemplate?.componentSlotContracts?.length) {
    return genericTemplate.componentSlotContracts;
  }

  if (block.componentRegionPattern || block.componentSlots?.length) {
    return buildComponentSlotContractsFromPattern(getBlockComponentPattern(block, genericTemplate));
  }

  return [];
};

const findSlotContract = (
  slot: ReportBlueprintComponentSlot,
  contracts: ReportTemplateComponentSlotContract[],
  index: number,
) => {
  const identity = getComponentSlotIdentity(slot, index).toUpperCase();
  const regionKey = slot.regionKey?.toUpperCase();

  return contracts.find((contract) =>
    contract.id.toUpperCase() === identity ||
    contract.regionKey?.toUpperCase() === identity ||
    (regionKey && contract.regionKey === regionKey),
  );
};

const validateComponentSlots = (
  block: ReportBlueprintBlock,
  context: ReportAssetResolutionContext,
  findings: ReportCompatibilityFinding[],
  path: string,
) => {
  const slots = block.componentSlots ?? [];
  const genericTemplate = getBlockGenericTemplate(block, context);
  const slotContracts = getBlockComponentSlotContracts(block, genericTemplate);

  if (slots.length === 0 && slotContracts.length === 0) {
    return;
  }

  const slotIds = slots.map((slot, index) => getComponentSlotIdentity(slot, index));
  const duplicateIds = slotIds.filter((id, index) => slotIds.indexOf(id) !== index);

  Array.from(new Set(duplicateIds)).forEach((id) => {
    pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-DUPLICATE', `Component slot "${id}" is duplicated.`, `${path}.componentSlots`);
  });

  if (slotContracts.length) {
    const configuredSlotIds = new Set(slotIds);

    slotContracts
      .filter((contract) => contract.required !== false)
      .forEach((contract) => {
        const hasConfiguredSlot =
          configuredSlotIds.has(contract.id) ||
          (contract.regionKey ? configuredSlotIds.has(contract.regionKey) : false) ||
          slots.some((slot) => slot.regionKey === contract.regionKey);

        if (!hasConfiguredSlot) {
          pushFinding(
            findings,
            'error',
            'RPT-COMPONENT-SLOT-CONTRACT-UNFILLED',
            `Block layout template slot "${contract.label}" is not filled yet.`,
            `${path}.componentSlots`,
          );
        }
      });
  }

  if (block.componentRegionPattern || genericTemplate?.componentRegionPattern) {
    const regionKeys = getComponentRegionKeys(getBlockComponentPattern(block, genericTemplate));
    const configuredKeys = new Set(slots.map((slot, index) => (slot.regionKey ?? String.fromCharCode(65 + index)).toUpperCase().slice(0, 1)));

    regionKeys.forEach((key) => {
      if (!configuredKeys.has(key)) {
        pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-UNFILLED', `Region "${key}" is declared in the block layout template pattern but has no component slot.`, `${path}.componentSlots`);
      }
    });
  }

  slots.forEach((slot, slotIndex) => {
    const slotPath = `${path}.componentSlots[${slotIndex}]`;
    const componentContentAreaTemplateId = slot.componentContentAreaTemplateId ?? slot.componentSampleId;
    const componentSample = getAssetById(context.componentContentAreaTemplates, componentContentAreaTemplateId);
    const widget = getComponentSlotWidget(slot, context);
    const visualType = getWidgetVisualType(widget);
    const slotContract = findSlotContract(slot, slotContracts, slotIndex);
    const effectiveSize = slot.size ?? slotContract?.minSize;

    if (componentContentAreaTemplateId && !componentSample) {
      pushFinding(
        findings,
        'error',
        'RPT-COMPONENT-SLOT-SAMPLE-MISSING',
        `Unknown component content area template "${componentContentAreaTemplateId}".`,
        `${slotPath}.componentContentAreaTemplateId`,
      );
    }

    if (slotContracts.length && !slotContract) {
      pushFinding(
        findings,
        'warning',
        'RPT-COMPONENT-SLOT-CONTRACT',
        `Component slot "${getComponentSlotIdentity(slot, slotIndex)}" does not match the selected block layout template contract.`,
        slotPath,
      );
    }

    if (visualType && effectiveSize && !isWidgetSizeAllowed(visualType, effectiveSize)) {
      pushFinding(
        findings,
        'error',
        'RPT-COMPONENT-SLOT-SIZE',
        `visualType "${visualType}" cannot be placed in component slot ${effectiveSize}.`,
        `${slotPath}.size`,
      );
    }

    if (!widget) {
      pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-NO-WIDGET', `Component slot "${slot.id}" has no component content area template or inline widget.`, slotPath);
    }

    if (countEnabledPills(widget?.titlePills) > 3) {
      pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-PILL-LIMIT', `Component slot "${slot.id}" widget has more than 3 enabled title pills.`, `${slotPath}.widget.titlePills`);
    }

    slot.slotFills?.forEach((slotFill, index) => {
      const slotFillPath = `${slotPath}.slotFills[${index}]`;

      if (!knownSlotIds.has(slotFill.slotId)) {
        pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-FILL-UNKNOWN', `Unknown slot "${slotFill.slotId}". Use one of: ${standardSlotAreaList}.`, slotFillPath);
      }

      if (knownSlotIds.has(slotFill.slotId) && !componentContentAreaSlotFillIds.has(slotFill.slotId)) {
        pushFinding(
          findings,
          'error',
          'RPT-COMPONENT-SLOT-FILL-SUPPORTING-AREA',
          'Component slot fills may only target 3 componentArea. Move 1-1 title, 1-2 pill, 2-1 additional information, 2-2 unit, and 4 summary fills to the block layout template slotFills.',
          slotFillPath,
        );
      }
    });
  });
};

export const validateReportBlueprint = (
  blueprint: ReportBlueprint,
  context: ReportAssetResolutionContext,
): ReportCompatibilityFinding[] => {
  const findings: ReportCompatibilityFinding[] = [];
  const framework = context.frameworks.find((item) => item.id === blueprint.frameworkId);
  const pageLayout = context.pageLayouts.find((item) => item.id === blueprint.pageLayoutId);

  if (!framework) {
    pushFinding(findings, 'error', 'RPT-FRAMEWORK-MISSING', `Unknown frameworkId "${blueprint.frameworkId}".`, 'frameworkId');
  }

  if (!pageLayout) {
    pushFinding(findings, 'error', 'RPT-PAGE-LAYOUT-MISSING', `Unknown pageLayoutId "${blueprint.pageLayoutId}".`, 'pageLayoutId');
  }

  validateSelfDevelopmentExceptions(blueprint, context, findings);

  blueprint.pages.forEach((page, pageIndex) => {
    const pagePath = `pages[${pageIndex}]`;
    const rows = normalizeLayoutRows(page.layoutRows);

    if (pageLayout && rows.length > pageLayout.gridRows) {
      pushFinding(
        findings,
        'error',
        'RPT-LAYOUT-ROW-COUNT',
        `Page "${page.id}" uses ${rows.length} rows, but layout "${pageLayout.id}" allows ${pageLayout.gridRows}.`,
        `${pagePath}.layoutRows`,
      );
    }

    rows.forEach((row, rowIndex) => {
      const width = Array.from(row).length;

      if (pageLayout && width !== pageLayout.gridColumns) {
        pushFinding(
          findings,
          'error',
          'RPT-LAYOUT-COLUMN-COUNT',
          `layoutRows[${rowIndex}] uses ${width} columns; expected ${pageLayout.gridColumns}.`,
          `${pagePath}.layoutRows[${rowIndex}]`,
        );
      }
    });

    const spans = buildLayoutBlocks(rows);
    const spanByLabel = new Map(spans.map((span) => [span.label, span]));
    const duplicateLabels = spans
      .map((span) => span.label)
      .filter((label, index, labels) => labels.indexOf(label) !== index);

    Array.from(new Set(duplicateLabels)).forEach((label) => {
      pushFinding(findings, 'error', 'RPT-LAYOUT-DISCONNECTED', `Block "${label}" appears in disconnected or non-rectangular areas.`, `${pagePath}.layoutRows`);
    });

    spans.forEach((span) => {
      const cols = Math.max(span.columnEnd - span.columnStart, 1);
      const rowsCount = Math.max(span.rowEnd - span.rowStart, 1);

      if (cols < 2 || rowsCount < 2) {
        pushFinding(findings, 'error', 'RPT-LAYOUT-MIN-SPAN', `Block "${span.label}" spans ${cols}x${rowsCount}; minimum is 2x2.`, `${pagePath}.layoutRows`);
      }

      if (cols < rowsCount) {
        pushFinding(findings, 'error', 'RPT-LAYOUT-M-N', `Block "${span.label}" spans ${cols}x${rowsCount}; M*N requires M >= N.`, `${pagePath}.layoutRows`);
      }
    });

    const blockById = new Map(page.blocks.map((block) => [block.id, block]));

    page.blocks.forEach((block, blockIndex) => {
      const blockPath = `${pagePath}.blocks[${blockIndex}]`;
      const span = spanByLabel.get(block.id);

      if (!span) {
        pushFinding(findings, 'error', 'RPT-BLOCK-NOT-IN-LAYOUT', `Block "${block.id}" is configured but not present in layoutRows.`, blockPath);
        validateSlotFills(block, findings, blockPath);
        validateComponentSlots(block, context, findings, blockPath);
        return;
      }

      const cols = Math.max(span.columnEnd - span.columnStart, 1);
      const rowsCount = Math.max(span.rowEnd - span.rowStart, 1);
      const size = getSizeLabel(cols, rowsCount).replace('*', 'x');
      const blockLayoutTemplateId = block.blockLayoutTemplateId ?? block.genericTemplateId;
      const componentContentAreaTemplateId = block.componentContentAreaTemplateId ?? block.componentSampleId;
      const genericTemplate = getAssetById(context.blockLayoutTemplates, blockLayoutTemplateId);
      const componentSample = getAssetById(context.componentContentAreaTemplates, componentContentAreaTemplateId);
      const widget = getBlockWidget(block, context);
      const visualType = getWidgetVisualType(widget);

      if (blockLayoutTemplateId && !genericTemplate) {
        pushFinding(findings, 'error', 'RPT-GENERIC-TEMPLATE-MISSING', `Unknown blockLayoutTemplateId "${blockLayoutTemplateId}".`, `${blockPath}.blockLayoutTemplateId`);
      }

      if (genericTemplate && (genericTemplate.cols !== cols || genericTemplate.rows !== rowsCount)) {
        pushFinding(
          findings,
          'error',
          'RPT-GENERIC-TEMPLATE-SIZE',
          `Block layout template "${genericTemplate.id}" is ${genericTemplate.cols}x${genericTemplate.rows}, but block "${block.id}" is ${cols}x${rowsCount}.`,
          `${blockPath}.blockLayoutTemplateId`,
        );
      }

      if (componentContentAreaTemplateId && !componentSample) {
        pushFinding(findings, 'error', 'RPT-COMPONENT-SAMPLE-MISSING', `Unknown componentContentAreaTemplateId "${componentContentAreaTemplateId}".`, `${blockPath}.componentContentAreaTemplateId`);
      }

      if (visualType && !isWidgetSizeAllowed(visualType, size)) {
        pushFinding(
          findings,
          'error',
          'RPT-WIDGET-SIZE',
          `visualType "${visualType}" cannot be placed in ${size}.`,
          `${blockPath}.widget`,
        );
      }

      if (!widget) {
        if (!block.componentSlots?.length) {
          pushFinding(findings, 'warning', 'RPT-BLOCK-NO-WIDGET', `Block "${block.id}" has no widget, block layout template, or component slots.`, blockPath);
        }
      }

      if (countEnabledPills(widget?.titlePills) > 3) {
        pushFinding(findings, 'error', 'RPT-WIDGET-PILL-LIMIT', `Block "${block.id}" widget has more than 3 enabled title pills.`, `${blockPath}.widget.titlePills`);
      }

      validateSlotFills(block, findings, blockPath);
      validateComponentSlots(block, context, findings, blockPath);
    });

    spans.forEach((span) => {
      if (!blockById.has(span.label)) {
        pushFinding(findings, 'error', 'RPT-LAYOUT-BLOCK-UNCONFIGURED', `Block "${span.label}" is present in layoutRows but has no blueprint block config.`, `${pagePath}.blocks`);
      }
    });
  });

  return findings;
};
