import { ArrowUpRight, Camera, Globe, Mail, MessageCircle } from "lucide-react";
import { cars } from "@/data/cars";

type LinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

const linkGroups: LinkGroup[] = [
  {
    title: "Vehicles",
    links: cars.map((m) => ({ label: m.name, href: `#models` })),
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Warranty Info", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Globe, href: "#", label: "Web" },
  { icon: Mail, href: "#", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e5e5e5] pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              className="inline-block text-3xl font-heading font-black tracking-[0.2em] text-[#1c1b1b] mb-8"
              aria-label="NEXARA Motors — return to top"
            >
              NEXARA
            </a>
            <p className="text-[#474545] text-lg mb-10 max-w-sm leading-relaxed font-medium">
              Engineering the future of high-performance electric vehicles.
              Precision, power, and design that moves you forward.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-12 h-12 rounded-full bg-[#f3f3f3] flex items-center justify-center text-[#1c1b1b] hover:bg-[#1c1b1b] hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {linkGroups.map((group, i) => (
            <div key={i}>
              <h4 className="font-bold text-[#1c1b1b] text-xl mb-8">
                {group.title}
              </h4>
              <ul className="space-y-5">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="group flex items-center text-base font-semibold text-[#474545] hover:text-[#1c1b1b] transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight
                        size={16}
                        className="ml-2 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-[#1c1b1b]"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-[#e5e5e5] gap-6">
          <p className="text-sm font-bold text-[#474545] text-center md:text-left tracking-wide">
            &copy; {new Date().getFullYear()} NEXARA Motors Inc. All rights
            reserved.
          </p>
          <div className="flex items-center">
            <span className="text-sm text-[#474545] font-bold tracking-widest uppercase">
              All Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
