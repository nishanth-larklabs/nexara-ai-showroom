import { ArrowUpRight, Camera, Globe, Mail, MessageCircle } from 'lucide-react';
import { cars } from '@/data/cars';

type LinkGroup = {
  title: string;
  links: { label: string; href: string }[];
};

const linkGroups: LinkGroup[] = [
  {
    title: 'Vehicles',
    links: cars.map((m) => ({ label: m.name, href: `#models` })),
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Sustainability', href: '#' },
      { label: 'Press', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Cookie Policy', href: '#' },
      { label: 'Warranty Info', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: Camera, href: '#', label: 'Instagram' },
  { icon: MessageCircle, href: '#', label: 'Twitter' },
  { icon: Globe, href: '#', label: 'Web' },
  { icon: Mail, href: '#', label: 'Contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-background border-t border-white/5 pt-20 pb-10 overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-32 bg-primary/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              className="inline-block text-2xl font-heading font-bold tracking-[0.2em] text-foreground hover:text-primary transition-colors mb-6"
              aria-label="NEXARA Motors — return to top"
            >
              NEXARA
            </a>
            <p className="text-muted-foreground mb-8 max-w-sm leading-relaxed">
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
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-white/20 hover:bg-white/5 transition-all"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          {linkGroups.map((group, i) => (
            <div key={i}>
              <h4 className="font-heading font-semibold text-foreground mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href={link.href}
                      className="group flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                      <ArrowUpRight 
                        size={12} 
                        className="ml-1 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" 
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-sm text-muted-foreground/60 text-center md:text-left">
            &copy; {new Date().getFullYear()} NEXARA Motors Inc. All rights reserved. <br className="md:hidden" />
            Designed for the future.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted-foreground/60 font-medium tracking-wider uppercase text-xs">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
