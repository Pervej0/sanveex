// Navigation types for consistent typing across the application

export interface BaseNavItem {
  id: string;
  title: string;
  description?: string | null;
  href?: string | null;
  pageId?: string | null;
  parentId?: string | null;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface DynamicNavItem {
  id: string;
  title: string;
  description?: string | null;
  href?: string | null;
  children?: DynamicNavItem[];
}

export interface NavItemWithChildren extends BaseNavItem {
  children: BaseNavItem[];
  pageId?: string | null; // Add this field for the modal
}

export interface CreateNavItemInput {
  title: string;
  description?: string;
  href?: string;
  pageId?: string;
  parentId?: string;
  order?: number;
}

export interface UpdateNavItemInput extends Partial<CreateNavItemInput> {
  id: string;
}

export interface PageOption {
  label: string;
  value: string;
  slug: string;
}
