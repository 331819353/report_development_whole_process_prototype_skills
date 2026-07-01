import type { DashboardConfig } from '../src/types/dashboard';
import type { DashboardActionConfig } from '../src/types/actions';
import type { DashboardDataSourceRef } from '../src/types/data-source';
import type { RegisteredWidgetConfig, WidgetTitlePillOption } from '../src/widgets/types';

// Template: topbar-light-scroll-dashboard-template
// 用法：复制需要的对象片段到 src/config/dashboard.config.ts。
// 组件 type 需要先在 src/widgets/types.ts 与 src/widgets/registry.ts 中注册。

export const datasetTemplate = {
  filterData: {
    regions: [
      { id: '__all', label: '全部' },
      { id: 'china', label: '中国区' },
      { id: 'overseas', label: '海外区' },
    ],
  },
  businessData: {
    revenueRows: [
      {
        period: '2026-05',
        regionId: 'china',
        productLine: 'refrigerator',
        productLineName: '冰箱',
        amount: 1280.5,
        completion: 96.4,
      },
      {
        period: '2026-03',
        regionId: 'china',
        productLine: 'refrigerator',
        productLineName: '冰箱',
        amount: 1168.2,
        completion: 91.7,
      },
      {
        period: '2026-04',
        regionId: 'china',
        productLine: 'refrigerator',
        productLineName: '冰箱',
        amount: 1212.9,
        completion: 93.8,
      },
    ],
  },
} as const;

export const actionConfigTemplates = {
  rowClick: {
    type: 'rowClick',
    interactionType: 'drilldown',
    triggerOwner: 'componentOwnedEvent',
    targetType: 'drawer',
    target: 'revenue-row-detail',
    params: {
      id: '$event.id',
      productLine: '$event.productLine',
    },
    meta: {
      title: '收入行明细',
    },
  },
  exportCurrentBlock: {
    type: 'exportCurrentBlock',
    targetType: 'export',
    params: {
      blockId: '$context.blockId',
      filters: '$filters',
    },
  },
  crossFilterRegion: {
    type: 'dashboardAction',
    interactionType: 'crossFilter',
    triggerOwner: 'componentOwnedEvent',
    targetType: 'cross-filter',
    params: {
      regionId: '$event.regionId',
    },
  },
  detailModal: {
    type: 'dashboardAction',
    interactionType: 'modal',
    triggerOwner: 'componentOwnedEvent',
    targetType: 'modal',
    target: 'revenue-detail-modal',
    query: {
      id: '$event.id',
      period: '$event.period',
      regionId: '$filters.regionId',
    },
    meta: {
      title: '收入详情',
    },
  },
  jumpToDetail: {
    type: 'dashboardAction',
    interactionType: 'jump',
    triggerOwner: 'componentOwnedEvent',
    targetType: 'route',
    target: '/revenue/detail',
    query: {
      id: '$event.id',
    },
  },
} satisfies Record<string, DashboardActionConfig>;

export const titlePillSwitchTemplates = {
  metricSwitch: [
    {
      id: 'revenue',
      label: '收入',
      params: { metric: 'revenue' },
      filters: { metric: 'revenue' },
      props: { unit: '万元', contentAreaTitle: '收入趋势' },
      dataBinding: {
        mode: 'category-series',
        categoryField: 'period',
        series: [{ name: '收入', valueField: 'amount', type: 'line', smooth: true, unit: '万元' }],
      },
    },
    {
      id: 'completion',
      label: '达成率',
      params: { metric: 'completion' },
      filters: { metric: 'completion' },
      props: { unit: '%', contentAreaTitle: '达成率趋势' },
      dataBinding: {
        mode: 'category-series',
        categoryField: 'period',
        series: [{ name: '达成率', valueField: 'completion', type: 'line', smooth: true, unit: '%' }],
      },
    },
  ],
  displayModeSwitch: [
    { id: 'trend', label: '趋势', props: { chartMode: 'trend' } },
    { id: 'rank', label: '排行', props: { chartMode: 'rank' } },
  ],
  actionSwitch: [
    {
      id: 'detail',
      label: '详情',
      params: { mode: 'detail' },
      actions: {
        titlePillChange: {
          type: 'dashboardAction',
          interactionType: 'drawer',
          triggerOwner: 'widgetEvent',
          targetType: 'drawer',
          target: 'active-pill-detail',
          query: {
            blockId: '$context.blockId',
            pillId: '$context.activeTitlePillId',
            mode: '$context.activeTitlePill.params.mode',
          },
          meta: { title: '当前分块切换详情' },
        },
      },
    },
  ],
} satisfies Record<string, WidgetTitlePillOption[]>;

export const dataSourceTemplates = {
  jsonRevenueRows: {
    id: 'businessData',
    params: {
      key: 'revenueRows',
    },
    requiredFilters: ['regionId'],
  },
  apiRevenueRows: {
    id: 'apiData',
    api: {
      url: '/api/revenue/rows',
      method: 'GET',
      query: {
        regionId: '$filters.regionId',
        period: '$filters.period',
      },
      responsePath: 'data.rows',
      adapter: 'rows',
    },
    requiredFilters: ['regionId'],
  },
  apiRegionOptions: {
    id: 'apiData',
    api: {
      url: '/api/filter-options/regions',
      method: 'GET',
      query: {
        period: '$filters.period',
      },
      responsePath: 'data.options',
      adapter: 'rows',
    },
    labelField: 'label',
    valueField: 'id',
  },
} satisfies Record<string, DashboardDataSourceRef>;

export const widgetTemplates = {
  dataBackedTable: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '收入明细',
    props: {
      precision: 1,
    },
    data: {
      ...dataSourceTemplates.jsonRevenueRows,
    },
    actions: {
      rowClick: actionConfigTemplates.rowClick,
    },
  },
  apiBackedTable: {
    type: 'RevenueTable',
    visualType: 'table',
    title: 'API 收入明细',
    props: {
      precision: 1,
    },
    data: {
      ...dataSourceTemplates.apiRevenueRows,
    },
  },
  dataBackedChart: {
    type: 'RevenueTrendChart',
    visualType: 'line',
    title: '收入趋势',
    props: {
      categoryField: 'period',
      valueField: 'amount',
      sortField: 'period',
      sortDirection: 'asc',
    },
    data: {
      id: 'businessData',
      params: {
        key: 'revenueRows',
      },
    },
  },
  localButtonFilters: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '标题区胶囊筛选',
    props: {},
    data: {
      id: 'businessData',
      params: {
        key: 'revenueRows',
      },
      ignoredFilters: ['regionId'],
      ignoredFilterReasons: {
        regionId: 'This local-filter demo intentionally shows already loaded rows and does not inherit the global region filter.',
      },
    },
    localFilters: [
      {
        id: 'productLine',
        label: '产品线',
        field: 'productLine',
        labelField: 'productLineName',
        mode: 'auto',
        maxButtonOptions: 5,
      },
    ],
  },
  localPanelFilters: {
    type: 'RevenueTable',
    visualType: 'table',
    title: '标题区筛选面板',
    props: {},
    data: {
      id: 'businessData',
      params: {
        key: 'revenueRows',
      },
    },
    localFilters: [
      {
        id: 'productLine',
        label: '产品线',
        field: 'productLine',
        labelField: 'productLineName',
        mode: 'panel',
      },
      {
        id: 'period',
        label: '期间',
        field: 'period',
      },
    ],
  },
  viewportDiagram: {
    type: 'RelationDiagram',
    visualType: 'graph',
    title: '关系图',
    props: {},
    data: {
      id: 'businessData',
      params: {
        key: 'relationRows',
      },
    },
    viewport: {
      pannable: true,
      zoomable: true,
      minZoom: 0.5,
      maxZoom: 2,
      defaultZoom: 1,
      naturalWidth: 1200,
      naturalHeight: 720,
    },
  },
  staticSummary: {
    type: 'SummaryText',
    visualType: 'text-summary',
    title: '经营摘要',
    props: {
      text: '本月收入保持稳定增长。',
    },
    dataPolicy: 'static',
  },
  externalRealtime: {
    type: 'RealtimeMap',
    visualType: 'map',
    title: '实时地图',
    props: {},
    dataPolicy: 'external',
  },
} satisfies Record<string, RegisteredWidgetConfig>;

export const componentSlotBindingTemplates = {
  lineChartSlot: {
    componentExampleId: 'component-example-catalog:line-chart-card',
    props: {
      unit: '万元',
      config: {
        title: { visible: false },
        chart: { legendVisible: true, smooth: true },
      },
    },
    data: {
      ...dataSourceTemplates.jsonRevenueRows,
    },
    filterScope: ['revenue'],
    dataBinding: {
      mode: 'category-series',
      categoryField: 'period',
      series: [
        { name: '收入', valueField: 'amount', type: 'line', smooth: true, unit: '万元' },
        { name: '达成率', valueField: 'completion', type: 'line', unit: '%' },
      ],
    },
    actions: {
      chartClick: actionConfigTemplates.detailModal,
      legendClick: actionConfigTemplates.crossFilterRegion,
    },
  },
  detailTableSlot: {
    componentExampleId: 'component-example-catalog:detail-table-card',
    props: {
      unit: '万元',
      rowKey: 'id',
      columns: [
        { key: 'period', label: '期间', field: 'period' },
        { key: 'productLineName', label: '产品线', field: 'productLineName' },
        { key: 'amount', label: '收入', field: 'amount', align: 'right' },
      ],
    },
    data: {
      ...dataSourceTemplates.apiRevenueRows,
    },
    filterScope: ['revenue'],
    dataBinding: {
      mode: 'rows',
      rowsProp: 'rows',
    },
    actions: {
      rowClick: actionConfigTemplates.rowClick,
    },
  },
} as const;

export const singlePageLightConfigTemplate = {
  assets: {
    logoSrc: '/haier-logo-original.svg',
    logoAlt: 'Haier logo',
    backgroundSrc: '/cockpit-bg.jpg',
  },
  screen: {
    title: '经营驾驶舱',
    filterTitle: '筛选项',
    defaultTheme: 'light',
    defaultFiltersOpen: false,
    layout: {
      designWidth: 1920,
      designHeight: 1080,
      topbarHeight: 160,
      contentGap: 0,
    },
    grid: {
      contentStartY: 160,
      contentEndY: 1080,
      rowHeight: 115,
      cellPadding: 6,
      dominantTitleColor: '#20a8ff',
      innerBackgroundColor: 'rgba(255, 255, 255, 0.92)',
    },
    controls: {
      filters: '筛选',
      download: '下载',
      refresh: '刷新',
    },
  },
  page: {
    layoutRows: [
      'AAABBBCCCDDD',
      'AAABBBCCCDDD',
      'EEEFFFGGGHHH',
      'EEEFFFGGGHHH',
      'IIIJJJKKKLLL',
      'IIIJJJKKKLLL',
      'MMNNOOPPQQRR',
      'SSUUVVWWXXYY',
    ],
    widgets: {
      A: widgetTemplates.dataBackedTable,
      B: widgetTemplates.localButtonFilters,
      C: widgetTemplates.localPanelFilters,
      D: widgetTemplates.viewportDiagram,
      E: widgetTemplates.staticSummary,
      F: widgetTemplates.externalRealtime,
    },
  },
  filters: [
    {
      id: 'regionId',
      label: '区域',
      defaultValue: '',
      source: {
        id: 'filterData',
        params: {
          key: 'regions',
        },
        labelField: 'label',
        valueField: 'id',
      },
    },
  ],
} satisfies DashboardConfig;
