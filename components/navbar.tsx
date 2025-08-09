"use client";

import Link from "next/link";
import { ModeSwitcher } from "./mode-switcher";
import { Button } from "./ui/button";
import { Sprout, Home, Menu, X, LucideIcon, LogIn } from "lucide-react";
import React from "react";
import DropdownMenuWithIcon from "./dropdown-menu";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Sprout,
};

const menuItems = [
  { icon: "Sprout", name: "Plants", href: "/plants" },
  { icon: "Home", name: "Home", href: "/" },
];

export default function Navbar({ session }: any) {
  const [menuState, setMenuState] = React.useState(false);

  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full border-b bg-white backdrop-blur dark:bg-zinc-950/50 lg:dark:bg-transparent"
      >
        <div className="m-auto max-w-7xl px-6 py-2 h-[66px] lg:px-4 lg:py-0">
          <div className="flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="text-xl font-bold text-primary font-mono tracking-wider"
              >
                🌱 Plantventory
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <ul className="space-y-6 text-base lg:flex lg:gap-2 lg:space-y-0 lg:text-sm">
                {menuItems.map((item, index) => {
                  const Icon = item.icon ? iconMap[item.icon] : null;

                  return (
                    <li key={index}>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={item.href}>
                          <span className="flex flex-row gap-2 items-center">
                            {Icon && <Icon className="w-5 h-5" />}
                            {item.name}
                          </span>
                        </Link>
                      </Button>
                    </li>
                  );
                })}

                <div className="flex flex-row gap-2 ml-2 items-center lg:gap-6">
                  <div className="lg:border-r lg:pr-6">
                    <ModeSwitcher />
                  </div>
                  {session ? (
                    <DropdownMenuWithIcon session={session} />
                  ) : (
                    <Button variant="outline" size="sm" asChild>
                      <Link
                        href="/sign-in"
                        className="flex flex-row gap-2 items-center"
                      >
                        <LogIn strokeWidth={2.25} size={18} />
                        <span>Sign In</span>
                      </Link>
                    </Button>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
