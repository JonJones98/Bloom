"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import DashboardIcon from '@mui/icons-material/Dashboard';

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Resume",
    href: "/services/resume",
    description: "A tool to create and manage professional resumes online.",
  },
  {
    title: "Business Card",
    href: "/services/business-card",
    description:
      "A tool to create and manage professional business cards online.",
  },
  {
    title: "Budget Planner",
    href: "/services/budget-planner",
    description:
      "A tool to help users manage their finances and plan their budgets effectively.",
  },
  {
    title: "Business Plan",
    href: "/services/business-plan",
    description:
      "A comprehensive plan outlining business goals and strategies.",
  },
];

export function Navbar() {
  return (
    <main className="flex items-center justify-between w-full px-6">
      <Link href="/">
        <h1 className="text-xl font-bold">Bloom</h1>
      </Link>
      <div className="flex flex-row items-center gap-4 ">
        <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/dashboard"><DashboardIcon fontSize="large" /></Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
          <NavigationMenuLink asChild>
              <Popover> 
          <PopoverTrigger asChild>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback><PersonOutlineIcon /></AvatarFallback>
              </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-fit">
            <div className="flex flex-col space-y-2 w-fit">
              <Link href="/profile" className="text-sm font-medium hover:underline">
                Profile
              </Link>
              <Link href="/settings" className="text-sm font-medium hover:underline">
                Settings
              </Link>
            </div>
          </PopoverContent>
        </Popover>
            </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
        
        
        
      </div>
    </main>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
