import type { ReportTemplateSlotContract, ReportTemplateSlotId } from './types';

export const reportTemplateSlotContracts: ReportTemplateSlotContract[] = [
  {
    id: 'titleArea',
    label: '标题区',
    role: 'block-chrome',
    required: true,
    accepts: ['displayTitle', 'title', 'metricName'],
    widthRatio: '2/3 of top area when pillArea exists',
    heightRatio: '33px top area',
    description: 'Block title area with the meteor decoration. It owns the readable title, not the chart body.',
  },
  {
    id: 'pillArea',
    label: '胶囊按钮区',
    role: 'block-chrome',
    required: false,
    accepts: ['titlePills'],
    maxItems: 3,
    widthRatio: '1/3 of top area',
    heightRatio: '30px',
    description: 'Optional local mode switch. Hide the slot when no pill options exist.',
  },
  {
    id: 'auxMetricArea',
    label: '辅助信息区（指标）',
    role: 'supporting-content',
    required: false,
    accepts: ['auxMetrics except unit'],
    maxItems: 2,
    widthRatio: '(block width - 1) / block width when unitArea exists',
    heightRatio: '1/9 of body area',
    description: 'Top body support metrics. In a 2*N block it shows at most 2 non-unit metrics; every extra column adds 3.',
  },
  {
    id: 'unitArea',
    label: '辅助信息区（单位）',
    role: 'supporting-content',
    required: false,
    accepts: ['unit metric'],
    maxItems: 1,
    widthRatio: '1 / block width when auxMetricArea exists',
    heightRatio: '1/9 of body area',
    description: 'The unit is always placed at the end of auxiliary metrics and consumes only one width unit.',
  },
  {
    id: 'componentArea',
    label: '组件区域',
    role: 'component-content',
    required: true,
    accepts: ['single registered widget', 'componentSlots matching selected generic template', 'componentRegionPattern', 'data binding', 'local filters'],
    heightRatio: '6/9 of body area, or expands when optional slots are hidden',
    description: 'The main visual area may contain one widget or dynamic component slots declared by the selected generic template. It receives a 3px inner padding from the host block.',
  },
  {
    id: 'summaryArea',
    label: '说明区（说明、结论）',
    role: 'supporting-content',
    required: false,
    accepts: ['bodySummary', 'analysisInsightContract summary'],
    heightRatio: '2/9 of body area',
    description: 'Conclusion and explanatory copy. Hide the slot when no summary exists so the component area can expand.',
  },
];

export const getReportTemplateSlotContract = (slotId: ReportTemplateSlotId) =>
  reportTemplateSlotContracts.find((slot) => slot.id === slotId);
