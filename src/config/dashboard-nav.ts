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
];
