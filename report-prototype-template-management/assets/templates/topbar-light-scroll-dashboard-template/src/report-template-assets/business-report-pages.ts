import type { DashboardPageConfig } from '../types/dashboard';
import type { RegisteredWidgetConfig, TemplateCarriedWidgetTone, WidgetMap } from '../widgets/types';

export const businessReportLayoutRows = [
  'AAABBBCCCDDD',
  'AAABBBCCCDDD',
  'EEEEFFFFGGGG',
  'EEEEFFFFGGGG',
  'HHHHIIIIJJJJ',
  'HHHHIIIIJJJJ',
  'KKKKLLLLMMMM',
  'KKKKLLLLMMMM',
];

export const multiSlotTemplateLayoutRows = [
  'AAAAAAAAAAAA',
  'AAAAAAAAAAAA',
  'BBBBBBCCCCCC',
  'BBBBBBCCCCCC',
  'BBBBBBCCCCCC',
  'DDDDEEEEFFFF',
  'DDDDEEEEFFFF',
  'DDDDEEEEFFFF',
];

export const componentContentAreaTemplateLayoutRows = [
  ...businessReportLayoutRows,
  'NNNNNNNNNNNN',
  'NNNNNNNNNNNN',
];

export const launchScenarioLayoutRows = [
  'AAAABBBBCCCC',
  'AAAABBBBCCCC',
  'AAAABBBBCCCC',
  'DDDDDDEEEEEE',
  'DDDDDDEEEEEE',
  'DDDDDDEEEEEE',
  'FFFFFFGGGGGG',
  'FFFFFFGGGGGG',
  'FFFFFFGGGGGG',
];

export const riskClosureLayoutRows = [
  'AAAABBBBCCCC',
  'AAAABBBBCCCC',
  'AAAABBBBCCCC',
  'DDDDDDEEEEEE',
  'DDDDDDEEEEEE',
  'DDDDDDEEEEEE',
  'FFFFFFGGGGGG',
  'FFFFFFGGGGGG',
  'FFFFFFGGGGGG',
];

const businessReportWidgets: WidgetMap = {
  A: {
    type: 'MetricValueWidget',
    visualType: 'metric-card',
    dataPolicy: 'static',
    displayTitle: '营业收入',
    titlePills: [
      { id: 'month', label: '本月' },
      { id: 'target', label: '目标' },
      { id: 'yoy', label: '同比' },
    ],
    bodySummary: '结论：收入保持稳健增长，线上直营和华东区域贡献最突出。',
    auxMetrics: [
      { label: '上期', value: '119,860,000' },
      { label: '目标', value: '135,000,000' },
      { label: '单位', value: '元' },
    ],
    props: {
      value: 128063459,
      unit: '元',
      yearOverYear: '+12.6%',
      monthOverMonth: '+4.8%',
      maxDecimals: 0,
    },
  },
  B: {
    type: 'MetricValueWidget',
    visualType: 'metric-card',
    dataPolicy: 'static',
    displayTitle: '经营利润',
    titlePills: [
      { id: 'profit', label: '利润' },
      { id: 'margin', label: '毛利' },
      { id: 'cost', label: '费用' },
    ],
    bodySummary: '结论：利润增速高于收入增速，费用率下降带动盈利改善。',
    auxMetrics: [
      { label: '上期', value: '21,940,000' },
      { label: '目标', value: '26,000,000' },
      { label: '单位', value: '元' },
    ],
    props: {
      value: 24860000,
      unit: '元',
      yearOverYear: '+15.2%',
      monthOverMonth: '+6.1%',
      maxDecimals: 0,
    },
  },
  C: {
    type: 'UniversalCardWidget',
    visualType: 'text-summary',
    dataPolicy: 'static',
    displayTitle: '目标达成',
    titlePills: [
      { id: 'actual', label: '实际' },
      { id: 'target', label: '目标' },
      { id: 'gap', label: '差距' },
    ],
    bodySummary: '结论：整体达成率为86%，利润达成较好，收入端仍有冲刺空间。',
    props: {
      cardKind: 'target',
      value: '86',
      unit: '%',
      target: '135,000,000元',
      status: '128,063,459元',
      gap: '6,936,541元',
      rows: [
        { label: '目标', value: '1.35亿' },
        { label: '当前', value: '1.28亿' },
        { label: '差距', value: '693.65万', tone: 'warning' },
      ],
      displayBudget: {
        rowHeightPx: 32,
        visibleRowCount: 3,
        maxVisibleItems: 3,
        overflowStrategy: 'show target, current, gap and achievement progress in one compact report card',
      },
    },
  },
  D: {
    type: 'RankingCardWidget',
    visualType: 'ranking-list',
    dataPolicy: 'static',
    displayTitle: '区域收入排名',
    titlePills: [
      { id: 'region', label: '区域' },
      { id: 'amount', label: '收入' },
      { id: 'growth', label: '增速' },
    ],
    bodySummary: '结论：华东保持第一，海外市场增速最快，华北需要补齐转化缺口。',
    auxMetrics: [
      { label: 'Top1', value: '25.5%' },
      { label: '对象', value: '5' },
      { label: '单位', value: '元' },
    ],
    props: {
      valueUnit: '元',
      displayBudget: {
        rowHeightPx: 32,
        visibleRowCount: 5,
        maxVisibleItems: 5,
        overflowStrategy: 'show top 5 operating regions with medal rank colors',
      },
      items: [
        { rank: 1, label: '华东大区', value: 32680000 },
        { rank: 2, label: '线上渠道', value: 28460000 },
        { rank: 3, label: '华南大区', value: 21930000 },
        { rank: 4, label: '海外市场', value: 18750000 },
        { rank: 5, label: '华北大区', value: 15320000 },
      ],
    },
  },
  E: {
    type: 'TemplateEChartWidget',
    visualType: 'line',
    dataPolicy: 'static',
    displayTitle: '收入利润趋势',
    titlePills: [
      { id: 'revenue', label: '收入' },
      { id: 'profit', label: '利润' },
      { id: 'forecast', label: '预测' },
    ],
    bodySummary: '结论：近6个月收入持续上行，利润曲线稳定改善。',
    auxMetrics: [
      { label: '峰值', value: '12806' },
      { label: '低值', value: '8740' },
      { label: '单位', value: '万元' },
    ],
    props: {
      chartKind: 'line',
      seriesName: '营业收入',
      unit: '万元',
      categories: ['1月', '2月', '3月', '4月', '5月', '6月'],
      values: [8740, 9320, 10180, 10890, 11986, 12806],
      tone: 'primary',
    },
  },
  F: {
    type: 'TemplateEChartWidget',
    visualType: 'pie',
    dataPolicy: 'static',
    displayTitle: '渠道收入结构',
    titlePills: [
      { id: 'channel', label: '渠道' },
      { id: 'share', label: '占比' },
      { id: 'growth', label: '增长' },
    ],
    bodySummary: '结论：线上直营占比最高，经销渠道保持稳定，门店增长恢复。',
    auxMetrics: [
      { label: '最大', value: '42%' },
      { label: '渠道', value: '4' },
      { label: '单位', value: '%' },
    ],
    props: {
      chartKind: 'pie',
      seriesName: '渠道收入',
      unit: '%',
      pieData: [
        { name: '线上直营', value: 42 },
        { name: '门店零售', value: 31 },
        { name: '经销渠道', value: 18 },
        { name: '工程客户', value: 9 },
      ],
      tone: 'primary',
    },
  },
  G: {
    type: 'TemplateEChartWidget',
    visualType: 'scatter',
    dataPolicy: 'static',
    displayTitle: '客户价值象限',
    titlePills: [
      { id: 'value', label: '价值' },
      { id: 'growth', label: '成长' },
      { id: 'risk', label: '风险' },
    ],
    bodySummary: '结论：高价值高成长客户集中在右上象限，需优先保障供给和服务。',
    auxMetrics: [
      { label: '样本', value: '6' },
      { label: '重点', value: '3' },
      { label: '单位', value: '分' },
    ],
    props: {
      chartKind: 'scatter',
      seriesName: '客户分群',
      unit: '分',
      points: [
        { name: '战略客户', value: [86, 88, 30] },
        { name: '成长客户', value: [72, 81, 24] },
        { name: '效率客户', value: [68, 62, 18] },
        { name: '观察客户', value: [45, 48, 12] },
        { name: '潜力客户', value: [57, 74, 20] },
        { name: '风险客户', value: [52, 31, 14] },
      ],
      tone: 'primary',
    },
  },
  H: {
    type: 'AdvancedEChartWidget',
    visualType: 'heatmap',
    dataPolicy: 'static',
    displayTitle: '费用与利润热力',
    titlePills: [
      { id: 'quarter', label: '季度' },
      { id: 'cost', label: '费用' },
      { id: 'profit', label: '利润' },
    ],
    bodySummary: '结论：Q3费用压力最高，Q4利润热度回升，需要继续压降营销投放偏差。',
    auxMetrics: [
      { label: '峰值', value: '91' },
      { label: '异常', value: '1' },
      { label: '单位', value: '分' },
    ],
    props: {
      chartKind: 'heatmap',
      seriesName: '经营热力',
      unit: '分',
    },
  },
  I: {
    type: 'AdvancedEChartWidget',
    visualType: 'radar',
    dataPolicy: 'static',
    displayTitle: '经营健康度',
    titlePills: [
      { id: 'health', label: '健康' },
      { id: 'ability', label: '能力' },
      { id: 'risk', label: '风险' },
    ],
    bodySummary: '结论：增长、盈利和现金表现较好，库存周转仍是主要短板。',
    auxMetrics: [
      { label: '最高', value: '91' },
      { label: '最低', value: '64' },
      { label: '单位', value: '分' },
    ],
    props: {
      chartKind: 'radar',
      seriesName: '经营健康度',
      unit: '分',
      radarIndicators: [
        { name: '增长', max: 100 },
        { name: '盈利', max: 100 },
        { name: '现金', max: 100 },
        { name: '库存', max: 100 },
        { name: '风险', max: 100 },
      ],
      radarValues: [88, 91, 83, 64, 72],
    },
  },
  J: {
    type: 'UniversalCardWidget',
    visualType: 'text-summary',
    dataPolicy: 'static',
    displayTitle: '异常预警',
    titlePills: [
      { id: 'risk', label: '风险' },
      { id: 'reason', label: '原因' },
      { id: 'owner', label: '责任' },
    ],
    bodySummary: '结论：逾期金额超过预警上限，需要本周完成客户回款复核。',
    props: {
      cardKind: 'warning',
      riskLevel: '高风险',
      metricName: '逾期金额',
      value: '245',
      unit: '万',
      target: '150万',
      gap: '+63%',
      status: '163%',
      rows: [
        { label: '较上月', value: '+63%', tone: 'danger' },
        { label: '预警上限', value: '150万' },
        { label: '触发规则', value: '超过上限', tone: 'danger' },
      ],
      displayBudget: {
        rowHeightPx: 32,
        visibleRowCount: 3,
        maxVisibleItems: 3,
        overflowStrategy: 'show high risk level, overdue amount, explanation metrics and over-limit progress',
      },
    },
  },
  K: {
    type: 'StatusRowsWidget',
    visualType: 'operational-list',
    dataPolicy: 'static',
    displayTitle: '重点行动清单',
    titlePills: [
      { id: 'all', label: '全部' },
      { id: 'doing', label: '推进' },
      { id: 'risk', label: '风险' },
    ],
    bodySummary: '结论：四项关键动作已明确责任人，回款和库存动作优先级最高。',
    props: {
      tone: 'primary',
      displayBudget: {
        rowHeightPx: 32,
        visibleRowCount: 5,
        maxVisibleItems: 5,
        overflowStrategy: 'show top 5 operating actions with compact adaptive rows',
      },
      items: [
        { label: '逾期客户回款复核', value: '今日闭环', status: 'danger' },
        { label: '华北门店转化提升', value: '推进中', status: 'warning' },
        { label: '高毛利新品补货', value: '已排产', status: 'success' },
        { label: '费用投放复盘', value: '本周完成', status: 'primary' },
        { label: '重点客户满意度回访', value: '已启动', status: 'success' },
      ],
    },
  },
  L: {
    type: 'UniversalCardWidget',
    visualType: 'funnel',
    dataPolicy: 'static',
    displayTitle: '商机转化漏斗',
    titlePills: [
      { id: 'lead', label: '线索' },
      { id: 'opp', label: '商机' },
      { id: 'deal', label: '成交' },
    ],
    bodySummary: '结论：线索到商机转化稳定，成交转化仍有约8个百分点提升空间。',
    auxMetrics: [
      { label: '转化', value: '33%' },
      { label: '流失', value: '440' },
      { label: '单位', value: '个' },
    ],
    props: {
      cardKind: 'funnel',
      rows: [
        { label: '有效线索', value: '1,280', percent: 100 },
        { label: '确认商机', value: '860', percent: 67 },
        { label: '成交订单', value: '420', percent: 33 },
      ],
      displayBudget: {
        rowHeightPx: 32,
        visibleRowCount: 3,
        maxVisibleItems: 3,
        overflowStrategy: 'show three key conversion stages with adaptive funnel chart',
      },
    },
  },
  M: {
    type: 'UniversalCardWidget',
    visualType: 'text-summary',
    dataPolicy: 'static',
    displayTitle: '经营结论',
    titlePills: [
      { id: 'summary', label: '结论' },
      { id: 'proof', label: '依据' },
      { id: 'action', label: '动作' },
    ],
    props: {
      cardKind: 'summary',
      headline: '经营质量',
      value: '稳中向好',
      unit: '',
      rows: [
        { label: '收入同比提升', value: '12.6%', tone: 'primary' },
        { label: '利润率继续改善', value: '1.8pct', tone: 'primary' },
        { label: '回款风险需跟进', value: '本周闭环', tone: 'warning' },
      ],
      displayBudget: {
        rowHeightPx: 32,
        visibleRowCount: 3,
        maxVisibleItems: 3,
        overflowStrategy: 'show executive conclusion and three evidence/action bullets',
      },
    },
  },
};

const componentContentAreaTemplateLibraryNavId = 'component-library';

const createComponentContentAreaTemplateWidget = (
  type: RegisteredWidgetConfig['type'],
  visualType: RegisteredWidgetConfig['visualType'],
  metricName: string,
  templateFile: string,
): RegisteredWidgetConfig =>
  ({
    type,
    visualType,
    dataPolicy: 'static',
    metricName,
    props: {
      templateFile,
      contentAreaTitle: metricName,
      showContentTitle: true,
    },
  }) as RegisteredWidgetConfig;

const componentContentAreaTemplateWidgets: WidgetMap = {
  A: createComponentContentAreaTemplateWidget(
    'OperatingRevenueMetricContentAreaTemplate',
    'metric-card',
    '营业收入',
    'src/widgets/templates/component-content-areas/OperatingRevenueMetricContentAreaTemplate.vue',
  ),
  B: createComponentContentAreaTemplateWidget(
    'OperatingProfitMetricContentAreaTemplate',
    'metric-card',
    '经营利润',
    'src/widgets/templates/component-content-areas/OperatingProfitMetricContentAreaTemplate.vue',
  ),
  C: createComponentContentAreaTemplateWidget(
    'TargetAchievementContentAreaTemplate',
    'text-summary',
    '目标达成',
    'src/widgets/templates/component-content-areas/TargetAchievementContentAreaTemplate.vue',
  ),
  D: createComponentContentAreaTemplateWidget(
    'RegionalRevenueRankingContentAreaTemplate',
    'ranking-list',
    '区域收入排名',
    'src/widgets/templates/component-content-areas/RegionalRevenueRankingContentAreaTemplate.vue',
  ),
  E: createComponentContentAreaTemplateWidget(
    'RevenueProfitTrendContentAreaTemplate',
    'line',
    '收入利润趋势',
    'src/widgets/templates/component-content-areas/RevenueProfitTrendContentAreaTemplate.vue',
  ),
  F: createComponentContentAreaTemplateWidget(
    'ChannelRevenueStructureContentAreaTemplate',
    'pie',
    '渠道收入结构',
    'src/widgets/templates/component-content-areas/ChannelRevenueStructureContentAreaTemplate.vue',
  ),
  G: createComponentContentAreaTemplateWidget(
    'CustomerValueScatterContentAreaTemplate',
    'scatter',
    '客户价值象限',
    'src/widgets/templates/component-content-areas/CustomerValueScatterContentAreaTemplate.vue',
  ),
  H: createComponentContentAreaTemplateWidget(
    'CostProfitHeatmapContentAreaTemplate',
    'heatmap',
    '费用与利润热力',
    'src/widgets/templates/component-content-areas/CostProfitHeatmapContentAreaTemplate.vue',
  ),
  I: createComponentContentAreaTemplateWidget(
    'OperatingHealthRadarContentAreaTemplate',
    'radar',
    '经营健康度',
    'src/widgets/templates/component-content-areas/OperatingHealthRadarContentAreaTemplate.vue',
  ),
  J: createComponentContentAreaTemplateWidget(
    'ExceptionWarningContentAreaTemplate',
    'text-summary',
    '异常预警',
    'src/widgets/templates/component-content-areas/ExceptionWarningContentAreaTemplate.vue',
  ),
  K: createComponentContentAreaTemplateWidget(
    'KeyActionListContentAreaTemplate',
    'operational-list',
    '重点行动清单',
    'src/widgets/templates/component-content-areas/KeyActionListContentAreaTemplate.vue',
  ),
  L: createComponentContentAreaTemplateWidget(
    'OpportunityFunnelContentAreaTemplate',
    'funnel',
    '商机转化漏斗',
    'src/widgets/templates/component-content-areas/OpportunityFunnelContentAreaTemplate.vue',
  ),
  M: createComponentContentAreaTemplateWidget(
    'OperatingConclusionContentAreaTemplate',
    'text-summary',
    '经营结论',
    'src/widgets/templates/component-content-areas/OperatingConclusionContentAreaTemplate.vue',
  ),
  N: createComponentContentAreaTemplateWidget(
    'LaunchConversionWaterfallContentAreaTemplate',
    'bar',
    '新品铺货转化路径',
    'src/widgets/templates/component-content-areas/LaunchConversionWaterfallContentAreaTemplate.vue',
  ),
};

type TemplateSlotRole = 'primary' | 'secondary' | 'supporting';
type ComponentContentAreaTemplateBlockId =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N';

interface ScenarioComponentSlot {
  id: string;
  label: string;
  regionKey: string;
  widthUnits: number;
  role: TemplateSlotRole;
  componentTemplateBlockId: ComponentContentAreaTemplateBlockId;
}

interface ScenarioBlockTemplateOptions {
  type: RegisteredWidgetConfig['type'];
  title: string;
  pattern: string;
  slots: ScenarioComponentSlot[];
  rows: number;
  auxMetrics: Array<{ label: string; value: string }>;
  titlePills: Array<{ id: string; label: string }>;
  summary: string;
  note: string;
}

const blockLayoutTemplateTypeByPattern: Record<string, RegisteredWidgetConfig['type']> = {
  '04x03:AAAA': 'Span04x03SingleSlotLayout',
  '04x03:AABB': 'Span04x03DoubleSlotLayout',
  '04x03:AABC': 'Span04x03CompactTripleSlotLayout',
  '06x03:AAAAAA': 'Span06x03SingleSlotLayout',
  '06x03:AAABBB': 'Span06x03DoubleSlotLayout',
  '06x03:AABBCC': 'Span06x03TripleSlotLayout',
};

const getBlockLayoutTemplateType = (
  type: RegisteredWidgetConfig['type'],
  pattern: string,
): RegisteredWidgetConfig['type'] => {
  const match = /^Span(\d{2}x\d{2})Layout$/.exec(type);

  return match ? blockLayoutTemplateTypeByPattern[`${match[1]}:${pattern}`] ?? type : type;
};

interface TemplateKpiSlot {
  id: string;
  label: string;
  widthUnits: number;
  role: TemplateSlotRole;
  value: string;
  unit: string;
  delta: string;
  tone: TemplateCarriedWidgetTone;
}

interface BlockTemplateWidgetOptions {
  type: RegisteredWidgetConfig['type'];
  title: string;
  pattern: string;
  slots: TemplateKpiSlot[];
  cols: number;
  rows: number;
  summary: string;
  auxMode: string;
  note: string;
}

const kpiComponentContentAreaTemplateId = 'kpi-metric-widget-content-area';

const createKpiComponentContentWidget = (slot: TemplateKpiSlot): RegisteredWidgetConfig => ({
  type: 'KpiMetricWidget',
  visualType: 'metric-card',
  dataPolicy: 'static',
  displayTitle: slot.label,
  props: {
    label: slot.label,
    value: slot.value,
    unit: slot.unit,
    delta: slot.delta,
    tone: slot.tone,
  },
} as RegisteredWidgetConfig);

const createComponentSlotContracts = (slots: TemplateKpiSlot[], rows: number) =>
  slots.map((slot, index) => ({
    id: slot.id,
    label: `${slot.id} ${slot.label}`,
    regionKey: slot.id,
    role: slot.role,
    order: index + 1,
    widthUnits: slot.widthUnits,
    heightUnits: rows,
    minSize: `${slot.widthUnits}x${rows}`,
    required: true,
  }));

const createScenarioComponentSlotContracts = (slots: ScenarioComponentSlot[], rows: number) =>
  slots.map((slot, index) => ({
    id: slot.id,
    label: `${slot.id} ${slot.label}`,
    regionKey: slot.regionKey,
    role: slot.role,
    order: index + 1,
    widthUnits: slot.widthUnits,
    heightUnits: rows,
    minSize: `${slot.widthUnits}x${rows}`,
    required: true,
  }));

const createComponentSlots = (slots: TemplateKpiSlot[]) =>
  slots.map((slot) => ({
    id: slot.id,
    templateSlotId: slot.id,
    label: `${slot.id} ${slot.label}`,
    regionKey: slot.id,
    role: slot.role,
    componentContentAreaTemplateId: kpiComponentContentAreaTemplateId,
    widget: createKpiComponentContentWidget(slot),
    content: {
      type: 'kpi' as const,
      label: slot.label,
      value: slot.value,
      unit: slot.unit,
      delta: slot.delta,
      tone: slot.tone,
    },
  }));

const createScenarioComponentSlots = (slots: ScenarioComponentSlot[]) =>
  slots.map((slot) => {
    const widget = componentContentAreaTemplateWidgets[slot.componentTemplateBlockId];

    return {
      id: slot.id,
      templateSlotId: slot.id,
      label: `${slot.id} ${slot.label}`,
      regionKey: slot.regionKey,
      role: slot.role,
      componentContentAreaTemplateId: `${componentContentAreaTemplateLibraryNavId}:${slot.componentTemplateBlockId}`,
      widget,
    };
  });

const createBlockTemplateWidget = ({
  type,
  title,
  pattern,
  slots,
  cols,
  rows,
  summary,
  auxMode,
  note,
}: BlockTemplateWidgetOptions): RegisteredWidgetConfig => ({
  type: getBlockLayoutTemplateType(type, pattern),
  visualType: 'other',
  dataPolicy: 'static',
  displayTitle: title,
  titlePills: [
    { id: 'pattern', label: pattern },
    { id: 'slots', label: `${slots.length}槽位` },
    { id: 'size', label: `${cols}*${rows}` },
  ],
  bodySummary: summary,
  auxMetrics: [
    { label: '2-1 附加信息区', value: auxMode },
    { label: '3 组件区', value: slots.map((slot) => slot.id).join('/') },
    { label: '单位', value: '2-2' },
  ],
  props: {
    title,
    note,
    showChrome: false,
    showFooter: false,
    secondary: false,
    density: 'roomy',
    placeholder: '3 组件区',
    componentRegionPattern: pattern,
    componentSlotContracts: createComponentSlotContracts(slots, rows),
    componentSlots: createComponentSlots(slots),
  },
} as RegisteredWidgetConfig);

const createScenarioBlockTemplateWidget = ({
  type,
  title,
  pattern,
  slots,
  rows,
  auxMetrics,
  titlePills,
  summary,
  note,
}: ScenarioBlockTemplateOptions): RegisteredWidgetConfig => ({
  type: getBlockLayoutTemplateType(type, pattern),
  visualType: 'other',
  dataPolicy: 'static',
  displayTitle: title,
  titlePills,
  bodySummary: summary,
  auxMetrics,
  props: {
    title,
    note,
    showChrome: false,
    showFooter: false,
    secondary: false,
    density: 'roomy',
    placeholder: '3 组件区',
    componentRegionPattern: pattern,
    componentSlotContracts: createScenarioComponentSlotContracts(slots, rows),
    componentSlots: createScenarioComponentSlots(slots),
  },
} as RegisteredWidgetConfig);

const launchScenarioWidgets: WidgetMap = {
  A: createScenarioBlockTemplateWidget({
    type: 'Span04x03SingleSlotLayout',
    title: '新品首月达成',
    pattern: 'AAAA',
    rows: 3,
    titlePills: [
      { id: 'launch', label: '上市月' },
      { id: 'target', label: '目标' },
      { id: 'gap', label: '差距' },
    ],
    auxMetrics: [
      { label: '计划', value: '1,500万' },
      { label: '达成', value: '86%' },
      { label: '单位', value: '%' },
    ],
    summary: '结论：上市首月达成率 86%，主推渠道已完成铺货，仍需补齐复购转化。',
    note: '流程 3：4*3 A 单槽分块布局模板；流程 8：选择目标达成组件内容区模板。',
    slots: [
      { id: 'A', label: '达成进度', regionKey: 'A', widthUnits: 4, role: 'primary', componentTemplateBlockId: 'C' },
    ],
  }),
  B: createScenarioBlockTemplateWidget({
    type: 'Span04x03SingleSlotLayout',
    title: '首月GMV',
    pattern: 'AAAA',
    rows: 3,
    titlePills: [
      { id: 'gmv', label: 'GMV' },
      { id: 'yoy', label: '同比' },
      { id: 'mom', label: '环比' },
    ],
    auxMetrics: [
      { label: '上期', value: '1,198万' },
      { label: '目标', value: '1,500万' },
      { label: '单位', value: '元' },
    ],
    summary: '结论：新品 GMV 已进入放量区间，直播和门店联动贡献最明显。',
    note: '流程 8：复用营业收入指标值组件内容区模板。',
    slots: [
      { id: 'A', label: 'GMV 指标', regionKey: 'A', widthUnits: 4, role: 'primary', componentTemplateBlockId: 'A' },
    ],
  }),
  C: createScenarioBlockTemplateWidget({
    type: 'Span04x03SingleSlotLayout',
    title: '毛利贡献',
    pattern: 'AAAA',
    rows: 3,
    titlePills: [
      { id: 'profit', label: '毛利' },
      { id: 'cost', label: '费用' },
      { id: 'roi', label: 'ROI' },
    ],
    auxMetrics: [
      { label: '毛利率', value: '21.4%' },
      { label: '费用率', value: '8.6%' },
      { label: '单位', value: '元' },
    ],
    summary: '结论：新品毛利贡献高于预期，费用投放仍需按渠道继续压降。',
    note: '流程 8：复用经营利润指标值组件内容区模板。',
    slots: [
      { id: 'A', label: '利润指标', regionKey: 'A', widthUnits: 4, role: 'primary', componentTemplateBlockId: 'B' },
    ],
  }),
  D: createScenarioBlockTemplateWidget({
    type: 'Span06x03DoubleSlotLayout',
    title: '渠道铺货结构',
    pattern: 'AAABBB',
    rows: 3,
    titlePills: [
      { id: 'channel', label: '渠道' },
      { id: 'region', label: '区域' },
      { id: 'mix', label: '结构' },
    ],
    auxMetrics: [
      { label: '覆盖渠道', value: '4' },
      { label: 'Top 区域', value: '华东' },
      { label: '单位', value: '%' },
    ],
    summary: '结论：线上直营承担声量，门店零售承担转化，华东和华南优先补货。',
    note: '流程 3：6*3 AB 双槽分块布局模板；流程 8：复用饼图与排名两个组件内容区模板。',
    slots: [
      { id: 'A', label: '渠道结构', regionKey: 'A', widthUnits: 3, role: 'primary', componentTemplateBlockId: 'F' },
      { id: 'B', label: '区域排名', regionKey: 'B', widthUnits: 3, role: 'secondary', componentTemplateBlockId: 'D' },
    ],
  }),
  E: createScenarioBlockTemplateWidget({
    type: 'Span06x03SingleSlotLayout',
    title: '铺货到成交转化',
    pattern: 'AAAAAA',
    rows: 3,
    titlePills: [
      { id: 'coverage', label: '铺货' },
      { id: 'sellout', label: '动销' },
      { id: 'repeat', label: '复购' },
    ],
    auxMetrics: [
      { label: '覆盖门店', value: '1,260' },
      { label: '高频门店', value: '426' },
      { label: '单位', value: '家' },
    ],
    summary: '结论：现有模板没有铺货转化路径图，因此按流程使用 ECharts 自开发新的组件内容区模板。',
    note: '流程 8 兜底：无合适组件内容区模板 -> 自开发 ECharts 独立 Vue 模板。',
    slots: [
      { id: 'A', label: '转化路径', regionKey: 'A', widthUnits: 6, role: 'primary', componentTemplateBlockId: 'N' },
    ],
  }),
  F: createScenarioBlockTemplateWidget({
    type: 'Span06x03DoubleSlotLayout',
    title: '客群与经营健康',
    pattern: 'AAABBB',
    rows: 3,
    titlePills: [
      { id: 'customer', label: '客群' },
      { id: 'health', label: '健康' },
      { id: 'priority', label: '优先级' },
    ],
    auxMetrics: [
      { label: '重点客群', value: '3' },
      { label: '健康短板', value: '库存' },
      { label: '单位', value: '分' },
    ],
    summary: '结论：高价值客群已聚拢，库存周转和高频复购是下一轮经营重点。',
    note: '流程 8：复用散点象限与雷达健康度组件内容区模板。',
    slots: [
      { id: 'A', label: '客群象限', regionKey: 'A', widthUnits: 3, role: 'primary', componentTemplateBlockId: 'G' },
      { id: 'B', label: '健康雷达', regionKey: 'B', widthUnits: 3, role: 'secondary', componentTemplateBlockId: 'I' },
    ],
  }),
  G: createScenarioBlockTemplateWidget({
    type: 'Span06x03DoubleSlotLayout',
    title: '风险与行动闭环',
    pattern: 'AAABBB',
    rows: 3,
    titlePills: [
      { id: 'risk', label: '风险' },
      { id: 'action', label: '行动' },
      { id: 'owner', label: '责任' },
    ],
    auxMetrics: [
      { label: '高风险', value: '1' },
      { label: '行动项', value: '5' },
      { label: '单位', value: '项' },
    ],
    summary: '结论：风险集中在回款和库存，行动清单已经按日闭环推进。',
    note: '流程 8：复用异常预警与行动清单组件内容区模板。',
    slots: [
      { id: 'A', label: '异常预警', regionKey: 'A', widthUnits: 3, role: 'primary', componentTemplateBlockId: 'J' },
      { id: 'B', label: '行动清单', regionKey: 'B', widthUnits: 3, role: 'secondary', componentTemplateBlockId: 'K' },
    ],
  }),
};

const riskClosureWidgets: WidgetMap = {
  A: createScenarioBlockTemplateWidget({
    type: 'Span04x03SingleSlotLayout',
    title: '预警总览',
    pattern: 'AAAA',
    rows: 3,
    titlePills: [
      { id: 'risk', label: '风险' },
      { id: 'rule', label: '规则' },
      { id: 'owner', label: '责任' },
    ],
    auxMetrics: [
      { label: '高风险', value: '1' },
      { label: '触发规则', value: '3' },
      { label: '单位', value: '项' },
    ],
    summary: '结论：回款逾期和库存周转是本轮预警主因，需要在本周形成责任闭环。',
    note: '流程 3：选择 4*3 A 单槽分块布局模板；流程 8：复用异常预警组件内容区模板，单槽隐藏组件内容区标题。',
    slots: [
      { id: 'A', label: '异常预警', regionKey: 'A', widthUnits: 4, role: 'primary', componentTemplateBlockId: 'J' },
    ],
  }),
  B: createScenarioBlockTemplateWidget({
    type: 'Span04x03SingleSlotLayout',
    title: '行动闭环',
    pattern: 'AAAA',
    rows: 3,
    titlePills: [
      { id: 'today', label: '今日' },
      { id: 'week', label: '本周' },
      { id: 'owner', label: '责任人' },
    ],
    auxMetrics: [
      { label: '动作', value: '5' },
      { label: '逾期', value: '1' },
      { label: '单位', value: '项' },
    ],
    summary: '结论：五项动作已拆到责任人，逾期客户复核必须今日完成。',
    note: '流程 4-7：标题、胶囊、附加信息和单位均配置在分块布局模板；流程 8：槽位只挂行动清单内容区。',
    slots: [
      { id: 'A', label: '行动清单', regionKey: 'A', widthUnits: 4, role: 'primary', componentTemplateBlockId: 'K' },
    ],
  }),
  C: createScenarioBlockTemplateWidget({
    type: 'Span04x03SingleSlotLayout',
    title: '健康短板',
    pattern: 'AAAA',
    rows: 3,
    titlePills: [
      { id: 'health', label: '健康' },
      { id: 'weakness', label: '短板' },
      { id: 'trend', label: '趋势' },
    ],
    auxMetrics: [
      { label: '最低项', value: '库存' },
      { label: '健康分', value: '72' },
      { label: '单位', value: '分' },
    ],
    summary: '结论：库存周转拖累整体健康度，需和新品补货、滞销清理联动处理。',
    note: '流程 8：复用经营健康雷达组件内容区模板；辅助信息不下发到组件槽位。',
    slots: [
      { id: 'A', label: '健康雷达', regionKey: 'A', widthUnits: 4, role: 'primary', componentTemplateBlockId: 'I' },
    ],
  }),
  D: createScenarioBlockTemplateWidget({
    type: 'Span06x03DoubleSlotLayout',
    title: '收入利润联动',
    pattern: 'AAABBB',
    rows: 3,
    titlePills: [
      { id: 'trend', label: '趋势' },
      { id: 'mix', label: '结构' },
      { id: 'gap', label: '缺口' },
    ],
    auxMetrics: [
      { label: '收入峰值', value: '12806' },
      { label: '渠道数', value: '4' },
      { label: '单位', value: '万元/%' },
    ],
    summary: '结论：收入保持上行，但结构侧仍依赖线上直营，利润改善需要继续压费用。',
    note: '流程 3：选择 6*3 AB 双槽分块布局模板；流程 8：A 槽复用趋势图，B 槽复用渠道结构图。',
    slots: [
      { id: 'A', label: '收入利润趋势', regionKey: 'A', widthUnits: 3, role: 'primary', componentTemplateBlockId: 'E' },
      { id: 'B', label: '渠道结构', regionKey: 'B', widthUnits: 3, role: 'secondary', componentTemplateBlockId: 'F' },
    ],
  }),
  E: createScenarioBlockTemplateWidget({
    type: 'Span06x03DoubleSlotLayout',
    title: '区域客户定位',
    pattern: 'AAABBB',
    rows: 3,
    titlePills: [
      { id: 'region', label: '区域' },
      { id: 'customer', label: '客户' },
      { id: 'priority', label: '优先级' },
    ],
    auxMetrics: [
      { label: 'Top区域', value: '华东' },
      { label: '重点客群', value: '3' },
      { label: '单位', value: '个' },
    ],
    summary: '结论：华东贡献稳定，高价值客户集中在右上象限，需优先保障服务和供给。',
    note: '流程 8：A/B 两个槽位分别选择区域排名和客户价值散点组件内容区模板。',
    slots: [
      { id: 'A', label: '区域排名', regionKey: 'A', widthUnits: 3, role: 'primary', componentTemplateBlockId: 'D' },
      { id: 'B', label: '客户象限', regionKey: 'B', widthUnits: 3, role: 'secondary', componentTemplateBlockId: 'G' },
    ],
  }),
  F: createScenarioBlockTemplateWidget({
    type: 'Span06x03SingleSlotLayout',
    title: '转化漏斗复核',
    pattern: 'AAAAAA',
    rows: 3,
    titlePills: [
      { id: 'lead', label: '线索' },
      { id: 'deal', label: '成交' },
      { id: 'loss', label: '流失' },
    ],
    auxMetrics: [
      { label: '转化', value: '33%' },
      { label: '流失', value: '440' },
      { label: '单位', value: '个' },
    ],
    summary: '结论：成交转化仍有约 8 个百分点提升空间，需把商机跟进动作绑定到责任人。',
    note: '流程 8：现有漏斗组件内容区模板适配，无需新增 ECharts 自开发模板。',
    slots: [
      { id: 'A', label: '商机漏斗', regionKey: 'A', widthUnits: 6, role: 'primary', componentTemplateBlockId: 'L' },
    ],
  }),
  G: createScenarioBlockTemplateWidget({
    type: 'Span06x03SingleSlotLayout',
    title: '闭环结论',
    pattern: 'AAAAAA',
    rows: 3,
    titlePills: [],
    auxMetrics: [
      { label: '流程字段', value: '9/9' },
      { label: '组件槽位', value: '仅3区' },
    ],
    summary: '结论：本页完成框架、页面布局、分块模板、支撑区域、组件槽位和说明区的全链路配置。',
    note: '流程 5/7/9：本块不配置胶囊和单位区；说明留在 4 summaryArea，组件槽位只挂经营结论内容区。',
    slots: [
      { id: 'A', label: '经营结论', regionKey: 'A', widthUnits: 6, role: 'primary', componentTemplateBlockId: 'M' },
    ],
  }),
};

const multiSlotTemplateWidgets: WidgetMap = {
  A: {
    type: 'UniversalCardWidget',
    visualType: 'text-summary',
    dataPolicy: 'static',
    displayTitle: '分块模板实现路径',
    titlePills: [
      { id: 'framework', label: '框架模板' },
      { id: 'page-layout', label: '页面布局' },
      { id: 'block-template', label: '分块模板' },
    ],
    bodySummary: '结论：先选框架模板、页面布局和分块布局模板，再配置标题、胶囊、附加信息与单位；随后填充组件内容区模板，最后配置说明区。',
    auxMetrics: [
      { label: '路径', value: '9步' },
      { label: '标准区', value: '6' },
      { label: '单位', value: '区' },
    ],
    props: {
      cardKind: 'summary',
      headline: '最新流程',
      value: '9',
      unit: '步',
      rows: [
        { label: '1 框架模板', value: '先定运行壳层' },
        { label: '2-3 布局/分块', value: '页面布局 -> 分块模板' },
        { label: '4-7 支撑区域', value: '标题/胶囊/附加/单位' },
        { label: '8-9 组件/说明', value: '组件内容区模板 -> 说明区', tone: 'primary' },
      ],
      displayBudget: {
        rowHeightPx: 28,
        visibleRowCount: 4,
        maxVisibleItems: 4,
        overflowStrategy: 'show the current report template implementation path in four compact rows',
      },
    },
  },
  B: {
    ...createBlockTemplateWidget({
      type: 'Span06x03DoubleSlotLayout',
      title: '6*3 AB 双槽分块模板',
      pattern: 'AAABBB',
      cols: 6,
      rows: 3,
      auxMode: '等分',
      summary: '4 说明区：A/B 两个槽位只接组件内容区模板；标题、胶囊、附加信息和单位都留在父级分块模板。',
      note: '3 组件区：A/B 两个组件内容槽位，适合主指标 + 对比指标。',
      slots: [
        { id: 'A', label: '主指标', widthUnits: 3, role: 'primary', value: '12806', unit: '万', delta: '+12.6%', tone: 'primary' },
        { id: 'B', label: '对比指标', widthUnits: 3, role: 'secondary', value: '86.4', unit: '%', delta: '达成率', tone: 'warning' },
      ],
    }),
  },
  C: {
    ...createBlockTemplateWidget({
      type: 'Span06x03TripleSlotLayout',
      title: '6*3 ABC 三槽分块模板',
      pattern: 'AABBCC',
      cols: 6,
      rows: 3,
      auxMode: '均分',
      summary: '4 说明区：三个组件内容槽位并列展示，附加信息区只在分块模板层配置，不随槽位下发。',
      note: '3 组件区：A/B/C 三个组件内容槽位，适合同口径指标组。',
      slots: [
        { id: 'A', label: '收入', widthUnits: 2, role: 'primary', value: '1.28', unit: '亿', delta: '同比+', tone: 'primary' },
        { id: 'B', label: '利润', widthUnits: 2, role: 'secondary', value: '2486', unit: '万', delta: '环比+', tone: 'success' },
        { id: 'C', label: '风险', widthUnits: 2, role: 'supporting', value: '7', unit: '项', delta: '待处理', tone: 'danger' },
      ],
    }),
  },
  D: {
    ...createBlockTemplateWidget({
      type: 'Span04x03SingleSlotLayout',
      title: '4*3 A 单槽分块模板',
      pattern: 'AAAA',
      cols: 4,
      rows: 3,
      auxMode: '单焦点',
      summary: '4 说明区：单槽模板用于一个强指标或组件；说明区承载结论，组件槽只承载组件内容。',
      note: '3 组件区：一个组件内容区占满组件区域。',
      slots: [
        { id: 'A', label: '核心KPI', widthUnits: 4, role: 'primary', value: '92.8', unit: '%', delta: '稳定', tone: 'primary' },
      ],
    }),
  },
  E: {
    ...createBlockTemplateWidget({
      type: 'Span04x03DoubleSlotLayout',
      title: '4*3 AB 双槽分块模板',
      pattern: 'AABB',
      cols: 4,
      rows: 3,
      auxMode: '主辅',
      summary: '4 说明区：双槽模板适合主指标与附加信息并排；单位仍属于 2-2 区域。',
      note: '3 组件区：A/B 两个组件内容槽位，保持分块层和组件内容层分离。',
      slots: [
        { id: 'A', label: '实际', widthUnits: 2, role: 'primary', value: '86', unit: '%', delta: '当前', tone: 'primary' },
        { id: 'B', label: '目标', widthUnits: 2, role: 'secondary', value: '95', unit: '%', delta: '目标', tone: 'warning' },
      ],
    }),
  },
  F: {
    ...createBlockTemplateWidget({
      type: 'Span04x03CompactTripleSlotLayout',
      title: '4*3 ABC 紧凑分块模板',
      pattern: 'AABC',
      cols: 4,
      rows: 3,
      auxMode: '2/1/1',
      summary: '4 说明区：紧凑三槽只放短组件内容；超出口径应拆块，不把说明塞进组件槽。',
      note: '3 组件区：A 主槽 + B/C 窄槽，仅填核心组件内容。',
      slots: [
        { id: 'A', label: '主项', widthUnits: 2, role: 'primary', value: '6区', unit: '', delta: '模板', tone: 'primary' },
        { id: 'B', label: '填充', widthUnits: 1, role: 'secondary', value: 'KPI', unit: '', delta: 'only', tone: 'success' },
        { id: 'C', label: '边界', widthUnits: 1, role: 'supporting', value: '0', unit: '混放', delta: '校验', tone: 'danger' },
      ],
    }),
  },
};

export const businessReportPage: DashboardPageConfig = {
  layoutRows: businessReportLayoutRows,
  widgets: businessReportWidgets,
};

export const launchScenarioPage: DashboardPageConfig = {
  layoutRows: launchScenarioLayoutRows,
  widgets: launchScenarioWidgets,
};

export const riskClosurePage: DashboardPageConfig = {
  layoutRows: riskClosureLayoutRows,
  widgets: riskClosureWidgets,
};

export const componentContentAreaTemplatePage: DashboardPageConfig = {
  layoutRows: componentContentAreaTemplateLayoutRows,
  widgets: componentContentAreaTemplateWidgets,
};

export const multiSlotTemplatePage: DashboardPageConfig = {
  layoutRows: multiSlotTemplateLayoutRows,
  widgets: multiSlotTemplateWidgets,
};

export const businessReportPages: Record<string, DashboardPageConfig> = {
  dashboard: businessReportPage,
  'launch-scenario': launchScenarioPage,
  'risk-closure': riskClosurePage,
  [componentContentAreaTemplateLibraryNavId]: componentContentAreaTemplatePage,
  analytics: businessReportPage,
  overview: businessReportPage,
  sales: businessReportPage,
  customers: businessReportPage,
  products: businessReportPage,
  channels: businessReportPage,
  regions: businessReportPage,
  'multi-slot-12x4': multiSlotTemplatePage,
};
