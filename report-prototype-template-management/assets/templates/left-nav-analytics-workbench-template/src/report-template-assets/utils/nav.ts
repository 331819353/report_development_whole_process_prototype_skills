import type { DashboardConfig } from '../../types/dashboard';
import type { ReportTemplateNav, ReportTemplatePageConfig } from '../types';

type RuntimeDashboardConfig = DashboardConfig & {
  nav?: ReportTemplateNav[];
  page?: ReportTemplatePageConfig;
  pages?: Record<string, ReportTemplatePageConfig>;
  screen: DashboardConfig['screen'] & {
    topbarNav?: Array<{ id: string; label: string; icon?: string }>;
    defaultTopbarNavId?: string;
  };
};

export const getReportTemplateNavs = (config: DashboardConfig): ReportTemplateNav[] => {
  const runtimeConfig = config as RuntimeDashboardConfig;

  if (Array.isArray(runtimeConfig.nav)) {
    return runtimeConfig.nav;
  }

  const pages = runtimeConfig.pages;
  const topbarNav = (runtimeConfig.screen.topbarNav ?? []) as Array<{ id: string; label: string; icon?: string }>;

  if (pages) {
    return Object.entries(pages).map(([id, page]) => {
      const navMeta = topbarNav.find((item) => item.id === id);

      return {
        id,
        label: navMeta?.label ?? id,
        icon: navMeta?.icon,
        layoutRows: page.layoutRows,
        widgets: page.widgets,
      };
    });
  }

  if (runtimeConfig.page) {
    const id = runtimeConfig.screen.defaultTopbarNavId ?? topbarNav[0]?.id ?? 'page';
    const navMeta = topbarNav.find((item) => item.id === id) ?? topbarNav[0];

    return [{
      id,
      label: navMeta?.label ?? id,
      icon: navMeta?.icon,
      layoutRows: runtimeConfig.page.layoutRows,
      widgets: runtimeConfig.page.widgets,
    }];
  }

  return [];
};

export const getNavById = (config: DashboardConfig, navId: string) =>
  getReportTemplateNavs(config).find((item) => item.id === navId);
