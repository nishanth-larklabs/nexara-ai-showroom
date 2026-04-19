import { contactInfo } from "@/data/brand";
import { MapPin, Phone, Mail, Clock, ArrowUpRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div>
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#1c1b1b] mb-8 tracking-tight">
            Get in Touch
          </h2>
          <p className="text-[#474545] text-xl mb-16 max-w-lg leading-relaxed font-medium">
            Whether you are looking to book a test drive, request a service, or
            explore partnership opportunities, our concierge team is always here
            to assist you.
          </p>

          <div className="flex flex-col gap-10">
            <div className="flex gap-6">
              <div className="p-5 rounded-full bg-white text-[#1c1b1b] border border-[#e5e5e5] shrink-0 h-min">
                <MapPin size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-[#1c1b1b] mb-3">
                  Headquarters
                </h4>
                <address className="not-italic text-[#474545] text-lg leading-relaxed font-medium">
                  {contactInfo.address.line1}
                  <br />
                  {contactInfo.address.line2}
                  <br />
                  {contactInfo.address.line3}
                  <br />
                  {contactInfo.address.city}, {contactInfo.address.state}{" "}
                  {contactInfo.address.zip}
                  <br />
                  {contactInfo.address.country}
                </address>
              </div>
            </div>

            <div className="border-t border-[#e5e5e5]" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div className="flex gap-5">
                <div className="p-4 rounded-full bg-white border border-[#e5e5e5] text-[#1c1b1b] shrink-0 h-min">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1 uppercase tracking-wider text-[#474545]">
                    Phone
                  </h4>
                  <p className="text-[#1c1b1b] font-bold text-lg">
                    {contactInfo.phone}
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="p-4 rounded-full bg-white border border-[#e5e5e5] text-[#1c1b1b] shrink-0 h-min">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1 uppercase tracking-wider text-[#474545]">
                    Hours
                  </h4>
                  <p className="text-[#1c1b1b] font-bold text-lg">
                    {contactInfo.hours}
                  </p>
                </div>
              </div>
              <div className="flex gap-5">
                <div className="p-4 rounded-full bg-white border border-[#e5e5e5] text-[#1c1b1b] shrink-0 h-min">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold mb-1 uppercase tracking-wider text-[#474545]">
                    Email
                  </h4>
                  <p className="text-[#1c1b1b] font-bold text-lg">
                    {contactInfo.email}
                  </p>
                  <p className="text-[#474545] font-medium text-base mt-1">
                    {contactInfo.salesEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Map / Asset */}
        <div className="w-full relative aspect-square md:aspect-4/3 lg:aspect-square rounded-[2rem] overflow-hidden bg-[#1c1b1b] p-12 flex flex-col justify-between group">
          <div className="relative z-10 flex justify-between items-start">
            <h3 className="text-4xl font-heading font-bold text-white max-w-62.5 leading-tight">
              Visit our Experience Centre
            </h3>
            <div className="p-4 rounded-full bg-white text-[#1c1b1b]">
              <ArrowUpRight
                size={28}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </div>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex gap-8 border-b border-white/20 pb-6">
              {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href={(contactInfo.social as any)[social.toLowerCase()]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-bold text-white/70 hover:text-white transition-colors uppercase tracking-wider"
                >
                  {social}
                </a>
              ))}
            </div>
            <p className="text-base text-white/70 max-w-md leading-relaxed font-medium">
              Experience the future of mobility in person. Private viewings
              available by appointment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
