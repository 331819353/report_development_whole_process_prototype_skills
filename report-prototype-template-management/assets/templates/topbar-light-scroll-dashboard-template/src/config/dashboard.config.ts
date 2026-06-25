import { businessReportPage, businessReportPages } from '../report-template-assets/business-report-pages';
import type { DashboardConfig } from '../types/dashboard';

export const cockpitConfig: DashboardConfig = {
  assets: {
    logoSrc: '/haier-logo.svg',
    logoAlt: 'Haier logo',
  },

  screen: {
    title: '经营分析报表',
    topbarNav: [
      { id: 'dashboard', label: '经营总览' },
      { id: 'analytics', label: '指标分析' },
      { id: 'overview', label: '管理摘要' },
      { id: 'sales', label: '收入分析' },
      { id: 'customers', label: '客户分析' },
      { id: 'products', label: '产品分析' },
      { id: 'channels', label: '渠道分析' },
      { id: 'regions', label: '区域分析' },
    ],
    defaultTopbarNavId: 'dashboard',
    filterTitle: '筛选项',
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

  page: businessReportPage,
  pages: businessReportPages,

  filters: [
    {
      id: 'period',
      label: '经营期间',
      defaultValue: '2026-06',
      options: [
        { id: '2026-06', label: '2026年6月' },
        { id: '2026-05', label: '2026年5月' },
        { id: '2026-q2', label: '2026年Q2' },
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
      id: 'channel',
      label: '经营渠道',
      defaultValue: 'all',
      options: [
        { id: 'all', label: '全部渠道' },
        { id: 'online', label: '线上直营' },
        { id: 'store', label: '门店零售' },
        { id: 'dealer', label: '经销渠道' },
        { id: 'project', label: '工程客户' },
      ],
    },
  ],
};
