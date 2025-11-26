"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Oncology",
    href: "/products/oncology",
    description: "Advanced treatments for various types of cancer.",
  },
  {
    title: "Cardiology",
    href: "/products/cardiology",
    description: "Medications for heart health and cardiovascular conditions.",
  },
  {
    title: "Neurology",
    href: "/products/neurology",
    description: "Solutions for neurological disorders and brain health.",
  },
  {
    title: "Dermatology",
    href: "/products/dermatology",
    description: "Skincare and treatment for dermatological conditions.",
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 transition-all duration-300",
        isScrolled ? "shadow-lg shadow-primary/5 py-0" : "py-2"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg shadow-primary/20 group-hover:shadow-xl group-hover:shadow-primary/30 transition-all duration-300">
            S
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent tracking-tight">
            Sanveex
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-primary/5 hover:text-primary")}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-primary/5 hover:text-primary")}>
                    About Us
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-primary/5 hover:text-primary">Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                    <li className="col-span-2 mt-2">
                      <Link
                        href="/products"
                        className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 p-6 no-underline outline-none focus:shadow-md hover:shadow-lg transition-all duration-300 border border-primary/10"
                      >
                        <div className="mb-2 mt-4 text-lg font-semibold text-primary">
                          View All Products
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Explore our complete range of pharmaceutical solutions.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/research" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-primary/5 hover:text-primary")}>
                    R&D
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "hover:bg-primary/5 hover:text-primary")}>
                    Contact
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-10 h-9 bg-secondary/50 border-border/50 focus:border-primary focus:bg-background transition-all"
            />
          </div>
          <Button className="gap-2 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 bg-gradient-primary hover:opacity-90">
            <Phone className="h-4 w-4" />
            Get in Touch
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/5">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-6">
                <Link href="/" className="flex items-center gap-2.5 mb-4">
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-xl shadow-lg">
                    S
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Sanveex</span>
                </Link>
                
                {/* Mobile Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10"
                  />
                </div>

                {/* Mobile Navigation Links */}
                <div className="flex flex-col gap-4">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/5">
                    Home
                  </Link>
                  <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/5">
                    About Us
                  </Link>
                  <Link href="/products" className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/5">
                    Products
                  </Link>
                  <Link href="/research" className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/5">
                    R&D
                  </Link>
                  <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors px-2 py-1 rounded-md hover:bg-primary/5">
                    Contact
                  </Link>
                </div>
                
                <div className="mt-auto pt-6 border-t">
                  <Button className="w-full gap-2 shadow-lg shadow-primary/20 bg-gradient-primary">
                    <Phone className="h-4 w-4" />
                    Contact Support
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-primary/5 hover:text-primary focus:bg-primary/5 focus:text-primary border border-transparent hover:border-primary/10",
            className
          )}
          {...props}
        >
          <div className="text-sm font-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

