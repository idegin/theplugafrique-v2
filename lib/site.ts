// Site-wide constants. Brand facts come from docs/brand.md.
export const site = {
  name: "The Plug Afrique",
  shortName: "TPA",
  title: "The Plug Afrique | Strategic Consulting for Impact in Africa",
  tagline: "Connecting People, Ideas, and Opportunities for Impact.",
  description:
    "The Plug Afrique is a Pan-African consulting practice. We connect people, ideas, and opportunities to bridge strategy and execution for measurable impact.",
  url: "https://www.theplugafrique.org",
  email: "info@theplugafrique.org",
  phone: "+2347045749609",
  phoneDisplay: "+234 704 574 9609",
  socialHandle: "@theplugafrique",
  social: {
    instagram: "https://instagram.com/theplugafrique",
    linkedin: "https://linkedin.com/company/theplugafrique",
    x: "https://twitter.com/theplugafrique",
    facebook: "https://facebook.com/theplugafrique",
  },
  offices: [
    {
      city: "Lagos",
      address:
        "3rd Floor, Bank of Industry Building, Plot 23A, Adeola Odeku Street, Victoria Island, Lagos",
      mapUrl:
        "https://maps.google.com/?q=Bank+of+Industry+Building+Adeola+Odeku+Victoria+Island+Lagos",
    },
    {
      city: "Abuja",
      address: "2nd Floor, Bank of Industry Building, Area 11, Garki, Abuja",
      mapUrl:
        "https://maps.google.com/?q=Bank+of+Industry+Building+Area+11+Garki+Abuja",
    },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
    { label: "Services", href: "/services/" },
    { label: "Insights", href: "/blog/" },
    { label: "Contact", href: "/contact/" },
  ],
  cta: { label: "Let's plug in", href: "/contact/" },
} as const;
