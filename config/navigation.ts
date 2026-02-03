export const mainNavItems = [
  { title: "Properties", href: "#properties" },
  { title: "Services", href: "#services" },
  { title: "About", href: "#about" },
  { title: "Contact", href: "#contact" },
];

export const footerNavItems = {
  properties: [
    { title: "Browse Properties", href: "#properties" },
    { title: "Luxury Homes", href: "#luxury" },
    { title: "Commercial", href: "#commercial" },
  ],
  company: [
    { title: "About Us", href: "#about" },
    { title: "Our Team", href: "#team" },
    { title: "Contact", href: "#contact" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
  ],
};

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
};
