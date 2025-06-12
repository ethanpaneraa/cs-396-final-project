"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { mainNavItems } from "@/app/contants/header-links";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  const MobileNavItem = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => (
    <SheetClose asChild>
      <Link
        href={href}
        className="block py-3 px-1 font-mono text-black hover:bg-black hover:text-white rounded-md transition-colors"
      >
        {children}
      </Link>
    </SheetClose>
  );

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="text-black"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[80vw] max-w-xs bg-white border-l-2 border-black"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between pb-4 border-b border-black">
            <span className="font-mono font-bold text-xl">EDGE-LAB</span>
            <SheetClose asChild>
              <button
                aria-label="Close"
                className="font-mono text-sm underline"
              >
                close
              </button>
            </SheetClose>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 space-y-2">
            {mainNavItems.map((nav) => (
              <MobileNavItem key={nav.id} href={nav.href}>
                {nav.label}
              </MobileNavItem>
            ))}
          </nav>

          <div className="pt-4 border-t border-black">
            <SheetClose asChild>
              <Button
                className="w-full bg-black text-white font-mono hover:bg-black/90"
                asChild
              >
                <a
                  href="https://github.com/your-org/edge-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
