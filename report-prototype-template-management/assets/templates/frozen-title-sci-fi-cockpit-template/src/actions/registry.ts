import type { DashboardActionConfig, DashboardRuntimeContext, DashboardWidgetActionEvent } from '../types/actions';

export interface DashboardActionControls {
  // 全局层面保留页面级工具能力；弹窗、跳转、下钻也可由壳层默认 action 执行。
  print: () => void;
  fullscreen: () => Promise<void>;
  refresh: () => void;
}

export interface DashboardActionHandlerRuntime {
  action: DashboardActionConfig;
  event: DashboardWidgetActionEvent;
  context: DashboardRuntimeContext;
  filters: Record<string, string>;
  controls: DashboardActionControls;
}

export type DashboardActionHandler = (
  runtime: DashboardActionHandlerRuntime,
) => void | Promise<void>;

// 全局动作扩展接口。
// DashboardShell 会先匹配这里的自定义处理器；没有匹配时执行内置 action。
// 需要覆盖默认弹窗、页面跳转、下钻、交叉筛选，或把事件抛给外部系统时，
// 可按 action.type / event.name 注册处理器，或注册 dashboardAction 作为兜底处理器。
//
// 示例：
// export const customActionRegistry = {
//   dashboardAction: ({ action, event, context }) => {
//     console.log(action, event, context);
//   },
// };
export const customActionRegistry: Record<string, DashboardActionHandler | undefined> = {};
