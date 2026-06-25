import type { LayoutBlock, ReportTemplateNav, SizedLayoutBlock, SizedLayoutBlockGroup } from '../types';

const emptyGridMarks = new Set(['.', ' ']);

export const normalizeLayoutRows = (rows?: string[]) => {
  const configuredRows = rows?.filter((row) => row.length > 0) ?? [];

  return configuredRows.length > 0 ? configuredRows : ['A'];
};

const toCellKey = (row: number, column: number) => `${row}:${column}`;

export const buildLayoutBlocks = (rowsToBuild: string[]) => {
  const cells = new Map<string, string>();

  rowsToBuild.forEach((row, rowIndex) => {
    Array.from(row).forEach((label, columnIndex) => {
      if (!emptyGridMarks.has(label)) {
        cells.set(toCellKey(rowIndex, columnIndex), label);
      }
    });
  });

  const visited = new Set<string>();
  const blocks: LayoutBlock[] = [];
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  cells.forEach((label, cellKey) => {
    if (visited.has(cellKey)) {
      return;
    }

    const queue = [cellKey];
    const component: Array<[number, number]> = [];
    visited.add(cellKey);

    while (queue.length > 0) {
      const currentKey = queue.shift();

      if (!currentKey) {
        continue;
      }

      const [row, column] = currentKey.split(':').map(Number);
      component.push([row, column]);

      directions.forEach(([rowOffset, columnOffset]) => {
        const nextKey = toCellKey(row + rowOffset, column + columnOffset);

        if (!visited.has(nextKey) && cells.get(nextKey) === label) {
          visited.add(nextKey);
          queue.push(nextKey);
        }
      });
    }

    const rows = component.map(([row]) => row);
    const columns = component.map(([, column]) => column);
    const minRow = Math.min(...rows);
    const maxRow = Math.max(...rows);
    const minColumn = Math.min(...columns);
    const maxColumn = Math.max(...columns);
    const isRectangle = component.length === (maxRow - minRow + 1) * (maxColumn - minColumn + 1);

    if (isRectangle) {
      blocks.push({
        id: `${label}-${minRow}-${minColumn}`,
        label,
        columnStart: minColumn + 1,
        columnEnd: maxColumn + 2,
        rowStart: minRow + 1,
        rowEnd: maxRow + 2,
      });
      return;
    }

    component.forEach(([row, column]) => {
      blocks.push({
        id: `${label}-${row}-${column}`,
        label,
        columnStart: column + 1,
        columnEnd: column + 2,
        rowStart: row + 1,
        rowEnd: row + 2,
      });
    });
  });

  return blocks.sort((left, right) => left.rowStart - right.rowStart || left.columnStart - right.columnStart);
};

export const getSizeLabel = (cols: number, rows: number) => `${cols}*${rows}`;

export const getSizeId = (cols: number, rows: number) => `${cols}x${rows}`;

type SizedBlockSource = Pick<ReportTemplateNav, 'layoutRows' | 'widgets'>;

export const getNavSizedBlocks = (nav: SizedBlockSource): SizedLayoutBlock[] =>
  buildLayoutBlocks(normalizeLayoutRows(nav.layoutRows))
    .filter((block) => Boolean(nav.widgets?.[block.label]))
    .map((block) => ({
      ...block,
      cols: Math.max(block.columnEnd - block.columnStart, 1),
      rows: Math.max(block.rowEnd - block.rowStart, 1),
    }));

export const groupBlocksBySize = (blocks: SizedLayoutBlock[]): SizedLayoutBlockGroup[] => {
  const groups = new Map<string, SizedLayoutBlock[]>();

  blocks.forEach((block) => {
    const key = getSizeId(block.cols, block.rows);
    const current = groups.get(key) ?? [];
    current.push(block);
    groups.set(key, current);
  });

  return Array.from(groups.entries())
    .map(([key, groupBlocks]) => ({
      key,
      cols: groupBlocks[0].cols,
      rows: groupBlocks[0].rows,
      blocks: groupBlocks,
    }))
    .sort((left, right) => left.rows - right.rows || left.cols - right.cols);
};

const padGridRow = (row: string) => {
  const width = Array.from(row).length;

  return width >= 12 ? row : `${row}${'.'.repeat(12 - width)}`;
};

export const buildSectionRows = (blocks: SizedLayoutBlock[], cols: number, rows: number) => {
  const sectionRows: string[] = [];
  let currentRows = Array.from({ length: rows }, () => '');
  let occupiedCols = 0;

  const flush = () => {
    if (occupiedCols === 0) {
      return;
    }

    currentRows.forEach((row) => sectionRows.push(padGridRow(row)));
    currentRows = Array.from({ length: rows }, () => '');
    occupiedCols = 0;
  };

  blocks.forEach((block) => {
    if (occupiedCols + cols > 12) {
      flush();
    }

    currentRows = currentRows.map((row) => `${row}${block.label.repeat(cols)}`);
    occupiedCols += cols;
  });

  flush();

  return sectionRows;
};
