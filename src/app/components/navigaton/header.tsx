"use client";

import { ReactNode, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import MobileMenu from "@/app/components/navigaton/mobile-menu";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { mainNavItems } from "@/app/contants/header-links";
import { cn } from "@/lib/utils";

const NavItem = ({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick?: (e: React.MouseEvent) => void;
  children: ReactNode;
}) => (
  <NavigationMenuLink
    asChild
    className="px-4 py-2 font-mono text-black hover:text-white hover:bg-black transition-colors rounded-md"
    onClick={onClick}
  >
    <Link href={href}>{children}</Link>
  </NavigationMenuLink>
);

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = useCallback(
    (e: React.MouseEvent, sectionId: string) => {
      e.preventDefault();
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          document
            .getElementById(sectionId)
            ?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document
          .getElementById(sectionId)
          ?.scrollIntoView({ behavior: "smooth" });
      }
    },
    [pathname, router]
  );

  return (
    <header className="fixed top-4 md:top-6 z-100 w-full">
      <div className="mx-auto max-w-[1550px] px-6">
        <nav
          aria-label="Main navigation"
          className={cn(
            "grid grid-cols-3 items-center",
            "bg-white border-2 border-black shadow-lg rounded-none md:rounded-xl",
            "h-16 md:h-20 px-4"
          )}
        >
          <Link href="/" className="flex items-center gap-2 justify-self-start">
            <div className="size-6 bg-black" />
            <span className="font-mono font-bold text-lg text-black">
              EDGE DETECTION LAB
            </span>
          </Link>
          <div className="hidden md:flex justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex gap-1">
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <NavItem
                      href={item.href}
                      onClick={
                        item.href.startsWith("#")
                          ? (e) => handleNavigation(e, item.id)
                          : undefined
                      }
                    >
                      {item.label}
                    </NavItem>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2 justify-self-end">
            {/* mobile menu toggle */}
            <div className="md:hidden">
              <MobileMenu />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
