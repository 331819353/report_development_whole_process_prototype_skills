import {
  defaultProjectReportPage,
  projectReportPages,
  projectReportTopbarNav,
} from '../report-template-assets/business-report-pages';
import type { DashboardConfig } from '../types/dashboard';

export const cockpitConfig: DashboardConfig = {
  assets: {
    logoSrc: '/haier-logo.svg',
    logoAlt: 'Haier logo',
  },

  screen: {
    title: '智慧家庭项目经营分析报告',
    topbarNav: [...projectReportTopbarNav],
    defaultTopbarNavId: 'overview',
    filterTitle: '经营筛选',
    defaultTheme: 'light',
    defaultFiltersOpen: false,

    layout: {
      designWidth: 1920,
      designHeight: 1080,
      topbarHeight: 88,
      contentGap: 0,
    },

    grid: {
      contentStartY: 88,
      contentEndY: 1080,
      rowHeight: 124,
      cellPadding: 6,
      dominantTitleColor: '#0073e5',
      innerBackgroundColor: '#ffffff',
    },

    controls: {
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },

  page: defaultProjectReportPage,
  pages: projectReportPages,

  filters: [
    {
      id: 'period',
      label: '经营期间',
      defaultValue: '2026-06',
      options: [
        { id: '2026-06', label: '2026年6月' },
        { id: '2026-05', label: '2026年5月' },
        { id: '2026-q2', label: '2026年Q2' },
        { id: '2026-h1', label: '2026年上半年' },
      ],
    },
    {
      id: 'region',
      label: '组织区域',
      defaultValue: 'all',
      options: [
        { id: 'all', label: '全部区域' },
        { id: 'east', label: '华东大区' },
        { id: 'south', label: '华南大区' },
        { id: 'north', label: '华北大区' },
        { id: 'overseas', label: '海外市场' },
      ],
    },
    {
      id: 'project',
      label: '经营项目',
      defaultValue: 'all',
      options: [
        { id: 'all', label: '全部项目' },
        { id: 'smart-home', label: '智慧家庭套购增长' },
        { id: 'store-refresh', label: '门店焕新转化' },
        { id: 'engineering', label: '工程客户交付' },
        { id: 'overseas-direct', label: '海外直营提效' },
      ],
    },
    {
      id: 'channel',
      label: '经营渠道',
      defaultValue: 'all',
      options: [
        { id: 'all', label: '全部渠道' },
        { id: 'online', label: '线上直营' },
        { id: 'store', label: '门店零售' },
        { id: 'project', label: '工程客户' },
        { id: 'overseas', label: '海外直营' },
      ],
    },
  ],
};
