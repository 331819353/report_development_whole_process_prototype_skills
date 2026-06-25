import type { ReportPageLayoutAsset } from '../types';

export const pageLayoutLibrary: ReportPageLayoutAsset[] = [
  {
    id: '12x8-1920x1080',
    label: '1920*1080 / 12*8',
    description: '固定 1920*1080 设计稿，顶部栏下方内容区按 12 列、8 个首屏行单元进行分块。',
    designWidth: 1920,
    designHeight: 1080,
    gridColumns: 12,
    gridRows: 8,
  },
];
