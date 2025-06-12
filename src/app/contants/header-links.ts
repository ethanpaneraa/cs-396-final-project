interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const mainNavItems: NavItem[] = [
  {
    id: "home",
    label: "HOME",
    href: "/",
  },
  { id: "about", label: "ABOUT", href: "/about" },
  {
    id: "simulation",
    label: "SIMULATION",
    href: "/simulation",
  },
];
