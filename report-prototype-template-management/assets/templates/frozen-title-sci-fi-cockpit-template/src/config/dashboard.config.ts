import { projectReportNav } from '../report-template-assets/business-report-pages';
import type { DashboardConfig } from '../types/dashboard';
import type { DashboardDataSourceRef } from '../types/data-source';

const apiFilterSource = (filterId: string): DashboardDataSourceRef => ({
  id: 'apiData',
  api: {
    url: `/api/filter-options/${filterId}`,
    method: 'GET',
    responsePath: 'data.items',
    query: {
      period: '$filters.period',
      region: '$filters.region',
      project: '$filters.project',
      channel: '$filters.channel',
    },
  },
  labelField: 'label',
  valueField: 'id',
  emptyFilterValues: ['', '__all', 'all'],
});

export const cockpitConfig: DashboardConfig = {
  assets: {
    logoSrc: '/haier-logo.svg',
    logoAlt: 'Haier logo',
    titleBackgroundSrc: '/title-bg.png',
    backgroundSrc: '/cockpit-bg.jpg',
  },

  screen: {
    title: '智慧家庭项目经营分析报告',
    navTitle: '项目报告导航',
    filterTitle: '经营筛选',
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
      navigation: '显示或隐藏项目报告导航',
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
      fullscreen: '全屏',
    },
  },

  nav: projectReportNav,

  filters: [
    {
      id: 'period',
      label: '经营期间',
      defaultValue: '2026-06',
      source: apiFilterSource('period'),
    },
    {
      id: 'region',
      label: '组织区域',
      defaultValue: 'all',
      source: apiFilterSource('region'),
    },
    {
      id: 'project',
      label: '经营项目',
      defaultValue: 'all',
      source: apiFilterSource('project'),
    },
    {
      id: 'channel',
      label: '经营渠道',
      defaultValue: 'all',
      source: apiFilterSource('channel'),
    },
  ],
};
