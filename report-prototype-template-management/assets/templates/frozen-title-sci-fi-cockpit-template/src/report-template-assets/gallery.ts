import type { DashboardConfig } from '../types/dashboard';
import type { ReportTemplateGallerySection } from './types';
import { componentSampleLibraryNavId, getComponentSampleGallerySections } from './libraries/component-samples';
import { genericTemplateLibraryNavId, getGenericTemplateGallerySections } from './libraries/generic-templates';

const templateGalleryNavIds = new Set([componentSampleLibraryNavId, genericTemplateLibraryNavId]);

export const isTemplateAssetGalleryNav = (navId: string) => templateGalleryNavIds.has(navId);

export const getTemplateGallerySections = (config: DashboardConfig, navId: string): ReportTemplateGallerySection[] => {
  if (navId === componentSampleLibraryNavId) {
    return getComponentSampleGallerySections(config);
  }

  if (navId === genericTemplateLibraryNavId) {
    return getGenericTemplateGallerySections(config);
  }

  return [];
};
