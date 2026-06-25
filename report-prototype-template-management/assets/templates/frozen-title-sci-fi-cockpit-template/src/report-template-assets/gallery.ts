import type { DashboardConfig } from '../types/dashboard';
import type { ReportTemplateGallerySection } from './types';
import {
  componentContentAreaTemplateLibraryNavId,
  getComponentContentAreaTemplateGallerySections,
} from './libraries/component-samples';
import {
  blockLayoutTemplateLibraryNavId,
  getBlockLayoutTemplateGallerySections,
} from './libraries/generic-templates';

const templateGalleryNavIds = new Set([componentContentAreaTemplateLibraryNavId, blockLayoutTemplateLibraryNavId]);

export const isTemplateAssetGalleryNav = (navId: string) => templateGalleryNavIds.has(navId);

export const getTemplateGallerySections = (config: DashboardConfig, navId: string): ReportTemplateGallerySection[] => {
  if (navId === componentContentAreaTemplateLibraryNavId) {
    return getComponentContentAreaTemplateGallerySections(config);
  }

  if (navId === blockLayoutTemplateLibraryNavId) {
    return getBlockLayoutTemplateGallerySections(config);
  }

  return [];
};
