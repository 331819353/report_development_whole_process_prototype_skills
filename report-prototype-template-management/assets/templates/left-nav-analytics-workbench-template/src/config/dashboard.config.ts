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
  },

  screen: {
    title: '智慧家庭项目经营分析报告',
    navTitle: '项目报告导航',
    filterTitle: '经营筛选',
    defaultTheme: 'light',
    defaultNavOpen: true,
    defaultFiltersOpen: false,

    layout: {
      designWidth: 1920,
      designHeight: 1080,
      sidebarWidth: 256,
      sidebarCollapsedWidth: 80,
      contentGap: 0,
    },

    grid: {
      contentStartY: 0,
      contentEndY: 1080,
      rowHeight: 135,
      cellPadding: 3,
      dominantTitleColor: '#0057d9',
      innerBackgroundColor: '#ffffff',
    },

    controls: {
      navigation: '收起',
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
