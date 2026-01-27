import {
  LayoutDashboard,
  Users,
  Settings,
  BarChart3,
  FileText,
  Bell,
  CreditCard,
  Shield,
  HelpCircle,
  HouseHeart,
  Globe,
  ImagesIcon,
  Stethoscope,
} from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon?: any;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
  items?: NavItem[]; // Nested items
}

export const dashboardNav: NavItem[] = [
  // Overview
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },

  // Site Structure & Global Content
  {
    title: "Site Content",
    href: "/dashboard/site-content",
    icon: Globe,
  },
  {
    title: "Navigation",
    href: "/dashboard/navigation",
    icon: Globe,
  },
  {
    title: "Pages",
    href: "/dashboard/pages",
    icon: FileText,
  },

  // Homepage / Visual Content
  {
    title: "Hero Slider",
    href: "/dashboard/slides",
    icon: ImagesIcon,
  },
  {
    title: "About & Benefits",
    href: "/dashboard/about-section",
    icon: FileText,
  },

  // Core Business Content
  {
    title: "Departments",
    href: "/dashboard/departments",
    icon: Stethoscope,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: CreditCard,
  },

  // Marketing / Trust Content
  {
    title: "Newsroom",
    href: "/dashboard/articles",
    icon: FileText,
  },
  {
    title: "Testimonials",
    href: "/dashboard/testimonials",
    icon: Shield,
  },
  {
    title: "FAQs",
    href: "/dashboard/faqs",
    icon: HelpCircle,
  },
  {
    title: "Gallery",
    href: "/dashboard/gallery",
    icon: ImagesIcon,
  },
];
