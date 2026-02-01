export const mainNavItems = [
  { title: "Features", href: "#features" },
  { title: "How It Works", href: "#how-it-works" },
  { title: "Pricing", href: "#pricing" },
  { title: "FAQ", href: "#faq" },
];

export const footerNavItems = {
  product: [
    { title: "Features", href: "#features" },
    { title: "Pricing", href: "#pricing" },
    { title: "FAQ", href: "#faq" },
  ],
  company: [
    { title: "About", href: "/about" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/contact" },
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
