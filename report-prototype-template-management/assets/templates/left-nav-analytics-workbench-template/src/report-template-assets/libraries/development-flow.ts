import type { ReportTemplateDevelopmentStep } from '../types';

export const reportTemplateDevelopmentFlow: ReportTemplateDevelopmentStep[] = [
  {
    id: 'framework',
    label: '选择框架',
    description: '确定导航、内容画布、筛选、工具栏和整体运行壳层。',
    outputArtifact: 'frameworkId',
    gate: 'framework-exists',
  },
  {
    id: 'page-layout',
    label: '配置页面布局',
    description: '确定设计尺寸、12列网格、行高、滚动策略、背景和分块规则。',
    requiredInputs: ['frameworkId'],
    outputArtifact: 'pageLayoutId + page layoutRows',
    gate: 'page-layout-exists',
  },
  {
    id: 'block-size',
    label: '选择分块尺寸',
    description: '按业务信息密度选择2*2、3*2、4*3等分块尺寸。',
    requiredInputs: ['pageLayoutId', 'layoutRows'],
    outputArtifact: 'blueprint.pages[].blocks[]',
    gate: 'layout-rows-shape',
  },
  {
    id: 'generic-template',
    label: '选择通用模板',
    description: '在目标尺寸下选择AA、AABBB、AABBCC等通用布局骨架，确定块内组件区域数量和比例。',
    requiredInputs: ['blueprint block size'],
    outputArtifact: 'genericTemplateId + componentRegionPattern + slot contract',
    gate: 'asset-size-match',
  },
  {
    id: 'content-sample',
    label: '填充内容物',
    description: '由 agent 参考组件实现样板填充标题、胶囊、辅助信息、模板动态组件槽和说明区。',
    requiredInputs: ['genericTemplateId', 'componentSlots[].templateSlotId', 'componentSlots[].componentSampleId or componentSlots[].widget'],
    outputArtifact: 'ReportBlueprint -> DashboardConfig',
    gate: 'slot-contract + widget schema',
  },
];
