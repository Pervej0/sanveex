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
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Site Content",
    href: "/dashboard/site-content",
    icon: Globe,
  },

  {
    title: "Hero Slider",
    href: "/dashboard/slides",
    icon: ImagesIcon, // Using ImagesIcon for now, could be better
  },
  {
    title: "About & Benefits",
    href: "/dashboard/about-section",
    icon: FileText,
  },
  {
    title: "Departments",
    href: "/dashboard/departments",
    icon: Stethoscope,
  },
  {
    title: "Testimonials",
    href: "/dashboard/testimonials",
    icon: Shield,
  },
  {
    title: "Newsroom",
    href: "/dashboard/articles",
    icon: FileText,
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
