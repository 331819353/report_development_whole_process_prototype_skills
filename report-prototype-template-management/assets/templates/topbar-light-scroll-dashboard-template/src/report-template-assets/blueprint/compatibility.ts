import type { RegisteredWidgetConfig, WidgetTitlePillOption, WidgetVisualType } from '../../widgets/types';
import type { ReportTemplateBlockAsset, ReportTemplateComponentSlotContract } from '../types';
import { buildLayoutBlocks, getSizeLabel, normalizeLayoutRows } from '../utils/layout-grid';
import { isWidgetSizeAllowed } from './widget-config-schemas';
import { getComponentExampleConfigSchema } from '../../widgets/templates/component-examples/config';
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
    description: 'Block layout templates and component examples must fit the target block span or declare an allowed visualType fallback.',
  },
  {
    id: 'slot-contract',
    label: 'Slot contract',
    severity: 'error',
    description: 'Block slot fills must target the standard block-layout areas; component slot fills may only target 3 componentArea with component examples.',
  },
];

const knownSlotIds = new Set(['titleArea', 'pillArea', 'componentArea', 'summaryArea']);
const componentExampleSlotFillIds = new Set(['componentArea']);
const standardSlotAreaList = '1-1 titleArea, 1-2 pillArea, 3 componentArea, 4 summaryArea';
const allowedSelfDevelopmentExceptionTypes = new Set(['interactionBehavior', 'customEChartComponent']);
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

const getBlockLayoutTemplate = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  getAssetById(context.blockLayoutTemplates, block.blockLayoutTemplateId);

const getBlockWidget = (block: ReportBlueprintBlock, context: ReportAssetResolutionContext) =>
  block.widget ??
  getAssetById(context.componentExamples, block.componentExampleId)?.widget ??
  getBlockLayoutTemplate(block, context)?.widget;

const getComponentSlotExampleId = (slot: ReportBlueprintComponentSlot) =>
  slot.componentExampleId;

const getComponentSlotWidget = (slot: ReportBlueprintComponentSlot, context: ReportAssetResolutionContext) =>
  getAssetById(context.componentExamples, getComponentSlotExampleId(slot))?.widget ?? slot.widget;

const getWidgetVisualType = (widget?: RegisteredWidgetConfig): WidgetVisualType | undefined => widget?.visualType;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  Boolean(value && typeof value === 'object' && !Array.isArray(value));

const getWidgetProps = (widget?: RegisteredWidgetConfig) =>
  isRecord(widget?.props) ? widget.props : undefined;

const validateComponentExampleWidgetConfig = (
  widget: RegisteredWidgetConfig | undefined,
  findings: ReportCompatibilityFinding[],
  path: string,
) => {
  const schema = getComponentExampleConfigSchema(widget?.type);

  if (!schema) {
    return;
  }

  const props = getWidgetProps(widget);
  const config = props?.config;

  if (!isRecord(config)) {
    pushFinding(
      findings,
      'warning',
      'RPT-COMPONENT-EXAMPLE-CONFIG-MISSING',
      `Component example "${schema.label}" should declare props.config so layout, title, body, and tone decisions are explicit.`,
      `${path}.props.config`,
    );
    return;
  }

  const allowedSections = new Set(schema.configSections);
  Object.keys(config).forEach((section) => {
    if (!allowedSections.has(section as never)) {
      pushFinding(
        findings,
        'error',
        'RPT-COMPONENT-EXAMPLE-CONFIG-SECTION',
        `Component example "${schema.label}" does not support config section "${section}". Allowed sections: ${schema.configSections.join(', ')}.`,
        `${path}.props.config.${section}`,
      );
    }
  });

  schema.requiredConfigSections.forEach((section) => {
    if (!isRecord(config[section])) {
      pushFinding(
        findings,
        'error',
        'RPT-COMPONENT-EXAMPLE-CONFIG-REQUIRED',
        `Component example "${schema.label}" must configure "${section}" before it can be used in a slot.`,
        `${path}.props.config.${section}`,
      );
    }
  });
};

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

    if (slotFill.slotId === 'pillArea' && countEnabledPills(slotFill.pills) > 6) {
      pushFinding(findings, 'warning', 'RPT-SLOT-PILL-DENSE', '1-2 pillArea has more than 6 visible pills; the title area may become crowded.', slotPath);
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
        'Only interactionBehavior and customEChartComponent may be self-developed; all other report areas must use configured templates.',
        `${path}.type`,
      );
      return;
    }

    if (exception.type === 'customEChartComponent') {
      ['sourcePageId', 'sourceBlockId', 'sourceSlotId', 'componentExampleId'].forEach((field) =>
        requireExceptionStringField(exception, field as keyof ReportBlueprintSelfDevelopmentException, findings, path),
      );

      if (
        exception.componentExampleId &&
        !getAssetById(context.componentExamples, exception.componentExampleId)
      ) {
        pushFinding(
          findings,
          'error',
          'RPT-SELFDEV-COMPONENT-EXAMPLE-MISSING',
          `Unknown component example "${exception.componentExampleId}". Register it before using it as a custom ECharts exception.`,
          `${path}.componentExampleId`,
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
      'sourceComponentExampleId',
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
      exception.sourceComponentExampleId &&
      !getAssetById(context.componentExamples, exception.sourceComponentExampleId)
    ) {
      pushFinding(
        findings,
        'error',
        'RPT-SELFDEV-INTERACTION-SOURCE-MISSING',
        `Unknown source component example "${exception.sourceComponentExampleId}".`,
        `${path}.sourceComponentExampleId`,
      );
    }

    if (!hasNonEmptyString(exception.reason)) {
      pushFinding(findings, 'warning', 'RPT-SELFDEV-REASON', 'Self-development exceptions should state why no existing template is sufficient.', `${path}.reason`);
    }
  });
};

const countEnabledPills = (pills?: WidgetTitlePillOption[]) =>
  pills?.filter((pill) => !pill.hidden && !pill.disabled).length ?? 0;

const getComponentSlotIdentity = (slot: ReportBlueprintComponentSlot, index: number) =>
  slot.templateSlotId ?? slot.id ?? slot.regionKey ?? String.fromCharCode(65 + index);

const getBlockComponentPattern = (
  block: ReportBlueprintBlock,
  blockLayoutTemplate?: ReportTemplateBlockAsset,
) =>
  normalizeComponentRegionPattern(
    block.componentRegionPattern ??
    blockLayoutTemplate?.componentRegionPattern ??
    buildComponentRegionPatternFromSlots(block.componentSlots),
  );

const getBlockComponentSlotContracts = (
  block: ReportBlueprintBlock,
  blockLayoutTemplate?: ReportTemplateBlockAsset,
): ReportTemplateComponentSlotContract[] => {
  if (blockLayoutTemplate?.componentSlotContracts?.length) {
    return blockLayoutTemplate.componentSlotContracts;
  }

  if (block.componentRegionPattern || block.componentSlots?.length) {
    return buildComponentSlotContractsFromPattern(getBlockComponentPattern(block, blockLayoutTemplate));
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
  const blockLayoutTemplate = getBlockLayoutTemplate(block, context);
  const slotContracts = getBlockComponentSlotContracts(block, blockLayoutTemplate);

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

  if (block.componentRegionPattern || blockLayoutTemplate?.componentRegionPattern) {
    const regionKeys = getComponentRegionKeys(getBlockComponentPattern(block, blockLayoutTemplate));
    const configuredKeys = new Set(slots.map((slot, index) => (slot.regionKey ?? String.fromCharCode(65 + index)).toUpperCase().slice(0, 1)));

    regionKeys.forEach((key) => {
      if (!configuredKeys.has(key)) {
        pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-UNFILLED', `Region "${key}" is declared in the block layout template pattern but has no component slot.`, `${path}.componentSlots`);
      }
    });
  }

  slots.forEach((slot, slotIndex) => {
    const slotPath = `${path}.componentSlots[${slotIndex}]`;
    const componentExampleId = getComponentSlotExampleId(slot);
    const componentExample = getAssetById(context.componentExamples, componentExampleId);
    const widget = getComponentSlotWidget(slot, context);
    const visualType = getWidgetVisualType(widget);
    const slotContract = findSlotContract(slot, slotContracts, slotIndex);
    const effectiveSize = slot.size ?? slotContract?.minSize;

    if (!componentExampleId) {
      pushFinding(
        findings,
        'error',
        'RPT-COMPONENT-SLOT-EXAMPLE-ID-MISSING',
        `Component slot "${slot.id}" must declare a registered componentExampleId; text/prose/inline widget fills are not valid component examples.`,
        `${slotPath}.componentExampleId`,
      );
    } else if (!componentExample) {
      pushFinding(
        findings,
        'error',
        'RPT-COMPONENT-SLOT-EXAMPLE-MISSING',
        `Unknown component example "${componentExampleId}".`,
        `${slotPath}.componentExampleId`,
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
      pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-NO-WIDGET', `Component slot "${slot.id}" has no component example widget.`, slotPath);
    }

    if (countEnabledPills(widget?.titlePills) > 6) {
      pushFinding(findings, 'warning', 'RPT-COMPONENT-SLOT-PILL-DENSE', `Component slot "${slot.id}" widget has more than 6 visible title pills.`, `${slotPath}.widget.titlePills`);
    }

    validateComponentExampleWidgetConfig(widget, findings, `${slotPath}.widget`);

    slot.slotFills?.forEach((slotFill, index) => {
      const slotFillPath = `${slotPath}.slotFills[${index}]`;

      if (!knownSlotIds.has(slotFill.slotId)) {
        pushFinding(findings, 'error', 'RPT-COMPONENT-SLOT-FILL-UNKNOWN', `Unknown slot "${slotFill.slotId}". Use one of: ${standardSlotAreaList}.`, slotFillPath);
      }

      if (knownSlotIds.has(slotFill.slotId) && !componentExampleSlotFillIds.has(slotFill.slotId)) {
        pushFinding(
          findings,
          'error',
          'RPT-COMPONENT-SLOT-FILL-SUPPORTING-AREA',
          'Component slot fills may only target 3 componentArea. Move parent title, pills, and summary to the block layout template; keep component-owned unit and auxMetrics inside component props/config.',
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

    if (pageLayout && rows.length < pageLayout.gridRows) {
      pushFinding(
        findings,
        'error',
        'RPT-LAYOUT-MIN-ROW-COUNT',
        `Page "${page.id}" uses ${rows.length} rows; 12*N layout "${pageLayout.id}" requires at least ${pageLayout.gridRows} visible-grid rows.`,
        `${pagePath}.layoutRows`,
      );
    }

    rows.forEach((row, rowIndex) => {
      const width = Array.from(row).length;

      if (pageLayout && width > pageLayout.gridColumns) {
        pushFinding(
          findings,
          'error',
          'RPT-LAYOUT-COLUMN-OVERFLOW',
          `layoutRows[${rowIndex}] uses ${width} columns; row width must not exceed ${pageLayout.gridColumns}.`,
          `${pagePath}.layoutRows[${rowIndex}]`,
        );
      } else if (pageLayout && width < pageLayout.gridColumns) {
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
      const blockLayoutTemplateId = block.blockLayoutTemplateId;
      const componentExampleId = block.componentExampleId;
      const blockLayoutTemplate = getAssetById(context.blockLayoutTemplates, blockLayoutTemplateId);
      const componentExample = getAssetById(context.componentExamples, componentExampleId);
      const widget = getBlockWidget(block, context);
      const visualType = getWidgetVisualType(widget);

      if (blockLayoutTemplateId && !blockLayoutTemplate) {
        pushFinding(findings, 'error', 'RPT-BLOCK-LAYOUT-TEMPLATE-MISSING', `Unknown blockLayoutTemplateId "${blockLayoutTemplateId}".`, `${blockPath}.blockLayoutTemplateId`);
      }

      if (blockLayoutTemplate && (blockLayoutTemplate.cols !== cols || blockLayoutTemplate.rows !== rowsCount)) {
        pushFinding(
          findings,
          'error',
          'RPT-BLOCK-LAYOUT-TEMPLATE-SIZE',
          `Block layout template "${blockLayoutTemplate.id}" is ${blockLayoutTemplate.cols}x${blockLayoutTemplate.rows}, but block "${block.id}" is ${cols}x${rowsCount}.`,
          `${blockPath}.blockLayoutTemplateId`,
        );
      }

      if (componentExampleId && !componentExample) {
        pushFinding(findings, 'error', 'RPT-COMPONENT-EXAMPLE-MISSING', `Unknown componentExampleId "${componentExampleId}".`, `${blockPath}.componentExampleId`);
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

      if (countEnabledPills(widget?.titlePills) > 6) {
        pushFinding(findings, 'warning', 'RPT-WIDGET-PILL-DENSE', `Block "${block.id}" widget has more than 6 visible title pills.`, `${blockPath}.widget.titlePills`);
      }

      validateComponentExampleWidgetConfig(widget, findings, `${blockPath}.widget`);

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
