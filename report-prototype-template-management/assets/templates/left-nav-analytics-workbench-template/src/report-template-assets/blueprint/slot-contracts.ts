import type { ReportTemplateSlotContract, ReportTemplateSlotId } from './types';

export const reportTemplateSlotContracts: ReportTemplateSlotContract[] = [
  {
    id: 'titleArea',
    regionCode: '1-1',
    label: '1-1 标题区',
    alignment: 'left',
    role: 'block-chrome',
    required: true,
    accepts: ['displayTitle', 'title', 'metricName'],
    widthRatio: '2/3 of top area when pillArea exists',
    heightRatio: '33px top area',
    description: 'Block layout template title area, left aligned. It owns the readable block title, not the chart body or component slot content.',
  },
  {
    id: 'pillArea',
    regionCode: '1-2',
    label: '1-2 胶囊按钮区',
    alignment: 'right',
    role: 'block-chrome',
    required: false,
    accepts: ['titlePills'],
    maxItems: 3,
    widthRatio: '1/3 of top area',
    heightRatio: '30px',
    description: 'Block layout template pill-button area, right aligned. Hide the slot when no pill options exist.',
  },
  {
    id: 'componentArea',
    regionCode: '3',
    label: '3 组件区',
    alignment: 'fill',
    role: 'component-content',
    required: true,
    accepts: ['componentSlots matching selected block layout template', 'componentExampleId', 'component example props.config', 'data binding'],
    heightRatio: '6/9 of body area, or expands when optional slots are hidden',
    description: 'Block layout template component area. It contains component slots, and each slot may only be filled with a configured component example; parent block title, pills, and summary stay on the block layout template, while component-owned title, unit, auxMetrics, and chart/table/list body stay inside the registered component example.',
  },
  {
    id: 'summaryArea',
    regionCode: '4',
    label: '4 说明区',
    alignment: 'left',
    role: 'supporting-content',
    required: false,
    accepts: ['bodySummary', 'analysisInsightContract summary'],
    heightRatio: '2/9 of body area',
    description: 'Block layout template explanation and conclusion area, left aligned. Hide the slot when no summary exists so the component area can expand.',
  },
];

export const getReportTemplateSlotContract = (slotId: ReportTemplateSlotId) =>
  reportTemplateSlotContracts.find((slot) => slot.id === slotId);
