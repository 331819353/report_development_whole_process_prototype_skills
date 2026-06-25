import { businessReportNav } from '../report-template-assets/business-report-pages';
import type { DashboardConfig } from '../types/dashboard';

export const cockpitConfig: DashboardConfig = {
  assets: {
    logoSrc: '/haier-logo.svg',
    logoAlt: 'Haier logo',
    titleBackgroundSrc: '/title-bg.png',
    backgroundSrc: '/cockpit-bg.jpg',
  },

  screen: {
    title: '经营分析驾驶舱',
    navTitle: '报表导航',
    filterTitle: '筛选项',
    defaultTheme: 'dark',
    defaultNavOpen: false,
    defaultFiltersOpen: false,

    layout: {
      designWidth: 1920,
      designHeight: 1080,
      titleBackgroundWidth: 1920,
      titleBackgroundHeight: 164,
      titleVisibleTop: 0,
      titleVisibleHeight: 94,
      titleOffsetY: 8,
      controlSize: 20,
      controlLogoWidth: 48,
      controlLogoOffsetX: 0,
      controlLogoLift: 59,
      controlIconWidth: 30,
      controlGroupGap: 10,
      controlBottom: 1,
      controlInset: 20,
      backgroundTileWidth: 1920,
      backgroundTileHeight: 1080,
      contentGap: 0,
    },

    grid: {
      contentStartY: 94,
      contentEndY: 1080,
      rowHeight: 123.25,
      cellPadding: 5,
      dominantTitleColor: '#20a8ff',
      innerBackgroundColor: 'rgba(32, 168, 255, 0.16)',
    },

    controls: {
      navigation: '显示或隐藏导航栏',
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },

  nav: businessReportNav,

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
