import type { ReportBlueprintComponentSlot, ReportComponentRegionPatternOption } from './types';
import type { ReportComponentSlotRole, ReportTemplateComponentSlotContract } from '../types';

export const defaultComponentRegionPattern = 'AA';

export const normalizeComponentRegionPattern = (pattern?: string) =>
  pattern && /^[A-Z]{2,12}$/.test(pattern) ? pattern : defaultComponentRegionPattern;

export const getComponentRegionKeys = (pattern?: string) =>
  Array.from(new Set(Array.from(normalizeComponentRegionPattern(pattern))));

export const getComponentSlotRegionKey = (slot: ReportBlueprintComponentSlot, index: number) =>
  (slot.regionKey ?? slot.id ?? String.fromCharCode(65 + index)).trim().toUpperCase().slice(0, 1);

export const buildComponentRegionPatternFromSlots = (slots: ReportBlueprintComponentSlot[] = []) => {
  if (slots.length <= 1) {
    return defaultComponentRegionPattern;
  }

  return slots.map((slot, index) => getComponentSlotRegionKey(slot, index)).join('');
};

const createCompositions = (total: number, parts: number, minPart: number): number[][] => {
  if (parts === 1) {
    return total >= minPart ? [[total]] : [];
  }

  const result: number[][] = [];
  const maxFirst = total - minPart * (parts - 1);

  for (let first = minPart; first <= maxFirst; first += 1) {
    createCompositions(total - first, parts - 1, minPart).forEach((rest) => {
      result.push([first, ...rest]);
    });
  }

  return result;
};

const buildPattern = (widths: number[], labels = ['A', 'B', 'C', 'D']) =>
  widths.map((width, index) => labels[index].repeat(width)).join('');

const describePattern = (widths: number[]) =>
  widths.map((width, index) => `${String.fromCharCode(65 + index)}:${width}`).join(' / ');

const getSlotRole = (index: number): ReportComponentSlotRole => {
  if (index === 0) {
    return 'primary';
  }

  if (index === 1) {
    return 'secondary';
  }

  return 'supporting';
};

export const getComponentRegionSegments = (pattern?: string) => {
  const segments: Array<{ key: string; widthUnits: number }> = [];

  Array.from(normalizeComponentRegionPattern(pattern)).forEach((rawKey) => {
    const key = rawKey.toUpperCase();
    const previous = segments[segments.length - 1];

    if (previous?.key === key) {
      previous.widthUnits += 1;
      return;
    }

    segments.push({ key, widthUnits: 1 });
  });

  return segments;
};

export const buildComponentSlotContractsFromPattern = (
  pattern?: string,
  rows?: number,
): ReportTemplateComponentSlotContract[] =>
  getComponentRegionSegments(pattern).map((segment, index) => ({
    id: segment.key,
    label: `槽位${segment.key}`,
    regionKey: segment.key,
    role: getSlotRole(index),
    order: index + 1,
    widthUnits: segment.widthUnits,
    heightUnits: rows,
    minSize: `${segment.widthUnits}x${rows ?? 2}`,
    accepts: ['component-content-area-template', 'inline-component-content'],
    required: true,
    description: `Fill slot ${segment.key} inside 3 componentArea with component content area template only.`,
  }));

export const createComponentRegionPatternOptions = (
  cols: number,
  rows: number,
  minSlotWidth = 2,
  maxSlots = 4,
): ReportComponentRegionPatternOption[] => {
  const options = new Map<string, ReportComponentRegionPatternOption>();
  const maxSlotCount = Math.min(maxSlots, Math.floor(cols / minSlotWidth));

  for (let slotCount = 1; slotCount <= maxSlotCount; slotCount += 1) {
    createCompositions(cols, slotCount, minSlotWidth).forEach((widths) => {
      const patternVariants = [{ pattern: buildPattern(widths), widths }];

      if (slotCount === 2 && widths[0] !== widths[1]) {
        const reversedWidths = [...widths].reverse();
        patternVariants.push({ pattern: buildPattern(reversedWidths, ['B', 'A']), widths: reversedWidths });
      }

      patternVariants.forEach(({ pattern, widths: patternWidths }) => {
        options.set(pattern, {
          id: `${cols}x${rows}:${pattern}`,
          size: `${cols}x${rows}`,
          cols,
          rows,
          pattern,
          slotCount,
          widths: patternWidths,
          slotContracts: buildComponentSlotContractsFromPattern(pattern, rows),
          description: `${cols}x${rows} block layout template 3 componentArea slots: ${describePattern(patternWidths)}.`,
        });
      });
    });
  }

  return Array.from(options.values());
};

export const getComponentRegionPatternOptions = (
  minCols = 2,
  maxCols = 12,
  minRows = 2,
  maxRows = 8,
) =>
  Array.from({ length: maxRows - minRows + 1 }, (_, rowIndex) => rowIndex + minRows)
    .flatMap((rows) =>
      Array.from({ length: maxCols - Math.max(minCols, rows) + 1 }, (_, colIndex) => colIndex + Math.max(minCols, rows))
        .flatMap((cols) => createComponentRegionPatternOptions(cols, rows)),
    );

export const getComponentRegionPatternOptionsForSize = (cols: number, rows: number) =>
  createComponentRegionPatternOptions(cols, rows);
