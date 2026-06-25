export type LayoutSpanId =
  | '02x02'
  | '03x02'
  | '04x02'
  | '05x02'
  | '06x02'
  | '07x02'
  | '08x02'
  | '09x02'
  | '10x02'
  | '11x02'
  | '12x02'
  | '03x03'
  | '04x03'
  | '05x03'
  | '06x03'
  | '07x03'
  | '08x03'
  | '09x03'
  | '10x03'
  | '11x03'
  | '12x03'
  | '04x04'
  | '05x04'
  | '06x04'
  | '07x04'
  | '08x04'
  | '09x04'
  | '10x04'
  | '11x04'
  | '12x04'
  | '05x05'
  | '06x05'
  | '07x05'
  | '08x05'
  | '09x05'
  | '10x05'
  | '11x05'
  | '12x05'
  | '06x06'
  | '07x06'
  | '08x06'
  | '09x06'
  | '10x06'
  | '11x06'
  | '12x06'
  | '07x07'
  | '08x07'
  | '09x07'
  | '10x07'
  | '11x07'
  | '12x07'
  | '08x08'
  | '09x08'
  | '10x08'
  | '11x08'
  | '12x08';

export type LayoutDensityBand = 'compact' | 'standard' | 'roomy' | 'workspace';
export type LayoutOrientation = 'balanced' | 'wide' | 'full-width';
export type LayoutMode = 'header-body' | 'header-body-footer' | 'primary-secondary' | 'workspace-grid';

export interface LayoutSpanSpec {
  id: LayoutSpanId;
  cols: number;
  rows: number;
  area: number;
  widthPx: number;
  heightPx: number;
  widthPercent: number;
  heightPercentOfFirstScreen: number;
  ratio: number;
  densityBand: LayoutDensityBand;
  orientation: LayoutOrientation;
  mode: LayoutMode;
  minReadableChrome: boolean;
  recommendedZoneCount: number;
  zonePattern: string;
  fitRule: string;
}

export const layoutGridContract = {
  designWidth: 1920,
  sidebarWidth: 256,
  contentWidth: 1664,
  columns: 12,
  visibleRows: 8,
  minColumns: 2,
  minRows: 2,
  rowHeight: 135,
  cellPadding: 3,
  requireColumnsGteRows: true,
};

export const layoutSpanIds = ['02x02', '03x02', '04x02', '05x02', '06x02', '07x02', '08x02', '09x02', '10x02', '11x02', '12x02', '03x03', '04x03', '05x03', '06x03', '07x03', '08x03', '09x03', '10x03', '11x03', '12x03', '04x04', '05x04', '06x04', '07x04', '08x04', '09x04', '10x04', '11x04', '12x04', '05x05', '06x05', '07x05', '08x05', '09x05', '10x05', '11x05', '12x05', '06x06', '07x06', '08x06', '09x06', '10x06', '11x06', '12x06', '07x07', '08x07', '09x07', '10x07', '11x07', '12x07', '08x08', '09x08', '10x08', '11x08', '12x08'] as const satisfies readonly LayoutSpanId[];

const round = (value: number) => Math.round(value * 10) / 10;

const assertLegalSpan = (cols: number, rows: number) => {
  if (cols < layoutGridContract.minColumns || rows < layoutGridContract.minRows) {
    throw new Error('Layout span must be at least 2x2.');
  }

  if (cols < rows) {
    throw new Error('Layout span must satisfy M >= N.');
  }
};

const getDensityBand = (cols: number, rows: number): LayoutDensityBand => {
  const area = cols * rows;

  if (area <= 6) {
    return 'compact';
  }

  if (area <= 16) {
    return 'standard';
  }

  if (area <= 32) {
    return 'roomy';
  }

  return 'workspace';
};

const getOrientation = (cols: number, rows: number): LayoutOrientation => {
  if (cols >= 10) {
    return 'full-width';
  }

  if (cols >= rows * 2) {
    return 'wide';
  }

  return 'balanced';
};

const getMode = (cols: number, rows: number): LayoutMode => {
  const area = cols * rows;

  if (area <= 8) {
    return 'header-body';
  }

  if (cols >= 6 && rows >= 3) {
    return 'workspace-grid';
  }

  if (cols >= 5 && rows >= 2) {
    return 'primary-secondary';
  }

  return 'header-body-footer';
};

const getZonePattern = (mode: LayoutMode, cols: number, rows: number) => {
  if (mode === 'header-body') {
    return 'compact header plus one flexible body zone';
  }

  if (mode === 'primary-secondary') {
    return cols >= 8 ? 'primary body plus right auxiliary rail' : 'primary body plus compact auxiliary strip';
  }

  if (mode === 'workspace-grid') {
    return rows >= 4 ? 'header, primary workspace, secondary rail, footer control zone' : 'header, primary workspace, secondary support zone';
  }

  return 'header, body, footer with no fixed component assumption';
};

const getFitRule = (cols: number, rows: number, mode: LayoutMode) => {
  if (mode === 'primary-secondary') {
    return 'reserve the largest zone for primary content and keep secondary content summary-only';
  }

  if (mode === 'workspace-grid') {
    return 'allow internal scrolling or nested grid only inside the primary workspace zone';
  }

  if (cols === rows) {
    return 'keep the content balanced; use a single primary zone before adding supporting chrome';
  }

  return 'use a clear header/body rhythm and keep overflow inside the body zone';
};

const getRecommendedZoneCount = (mode: LayoutMode) => {
  if (mode === 'primary-secondary') {
    return 2;
  }

  if (mode === 'workspace-grid') {
    return 4;
  }

  return 3;
};

export const createLayoutSpanSpec = (cols: number, rows: number): LayoutSpanSpec => {
  assertLegalSpan(cols, rows);
  const id = (String(cols).padStart(2, '0') + 'x' + String(rows).padStart(2, '0')) as LayoutSpanId;
  const contentWidth = layoutGridContract.contentWidth / layoutGridContract.columns;
  const widthPx = round(contentWidth * cols - layoutGridContract.cellPadding * 2);
  const heightPx = round(layoutGridContract.rowHeight * rows - layoutGridContract.cellPadding * 2);
  const mode = getMode(cols, rows);

  return {
    id,
    cols,
    rows,
    area: cols * rows,
    widthPx,
    heightPx,
    widthPercent: round((cols / layoutGridContract.columns) * 100),
    heightPercentOfFirstScreen: round((rows / layoutGridContract.visibleRows) * 100),
    ratio: round(widthPx / Math.max(heightPx, 1)),
    densityBand: getDensityBand(cols, rows),
    orientation: getOrientation(cols, rows),
    mode,
    minReadableChrome: widthPx >= 260 && heightPx >= 170,
    recommendedZoneCount: getRecommendedZoneCount(mode),
    zonePattern: getZonePattern(mode, cols, rows),
    fitRule: getFitRule(cols, rows, mode),
  };
};

export const layoutSpanSpecs: LayoutSpanSpec[] = Array.from({ length: layoutGridContract.visibleRows - layoutGridContract.minRows + 1 }, (_, rowIndex) => {
  const rows = rowIndex + layoutGridContract.minRows;
  return Array.from({ length: layoutGridContract.columns - rows + 1 }, (_, colIndex) =>
    createLayoutSpanSpec(colIndex + rows, rows),
  );
}).flat();

export const layoutSpanSpecMap = Object.fromEntries(layoutSpanSpecs.map((spec) => [spec.id, spec])) as Record<LayoutSpanId, LayoutSpanSpec>;

export const getLayoutSpanSpec = (id: LayoutSpanId) => layoutSpanSpecMap[id];
