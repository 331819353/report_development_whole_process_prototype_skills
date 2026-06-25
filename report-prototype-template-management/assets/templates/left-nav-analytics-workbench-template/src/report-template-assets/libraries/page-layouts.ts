import type { ReportPageLayoutAsset } from '../types';

export const pageLayoutLibrary: ReportPageLayoutAsset[] = [
  {
    id: '12x8-1920x1080',
    label: '1920*1080 / 12*8',
    description: '固定1920*1080设计稿，右侧内容区按12列、8个首屏行单元进行分块。',
    designWidth: 1920,
    designHeight: 1080,
    gridColumns: 12,
    gridRows: 8,
  },
];
