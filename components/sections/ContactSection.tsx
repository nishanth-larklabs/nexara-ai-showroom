import { contactInfo } from '@/data/brand';
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-container relative z-10 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
            Get in Touch
          </h2>
          <p className="text-muted-foreground text-lg mb-12 max-w-lg leading-relaxed">
            Whether you are looking to book a test drive, request a service, or explore partnership opportunities, our concierge team is always here to assist you.
          </p>

          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <div className="p-4 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0 h-min">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-2">Headquarters</h4>
                <address className="not-italic text-muted-foreground leading-relaxed">
                  {contactInfo.address.line1}<br />
                  {contactInfo.address.line2}<br />
                  {contactInfo.address.line3}<br />
                  {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zip}<br />
                  {contactInfo.address.country}
                </address>
              </div>
            </div>

            <div className="border-t border-white/10" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-white/5 text-muted-foreground shrink-0 h-min">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider text-muted-foreground">Phone</h4>
                  <p className="text-foreground font-medium">{contactInfo.phone}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-white/5 text-muted-foreground shrink-0 h-min">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider text-muted-foreground">Hours</h4>
                  <p className="text-foreground font-medium">{contactInfo.hours}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 rounded-full bg-white/5 text-muted-foreground shrink-0 h-min">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider text-muted-foreground">Email</h4>
                  <p className="text-foreground font-medium">{contactInfo.email}</p>
                  <p className="text-muted-foreground font-medium text-sm mt-1">{contactInfo.salesEmail}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Map / Asset */}
        <div className="w-full relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-[3rem] overflow-hidden glass border border-white/10 shadow-2xl p-8 flex flex-col justify-between group">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start">
            <h3 className="text-2xl font-heading font-bold text-foreground max-w-[200px]">Visit our Experience Centre</h3>
            <div className="p-3 rounded-full bg-white/10 text-foreground backdrop-blur-md">
              <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex gap-6 border-b border-white/10 pb-4">
              {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href={(contactInfo.social as any)[social.toLowerCase()]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Experience the future of mobility in person. Private viewings available by appointment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
