"use client";

import { motion } from "motion/react";
import { ArrowDownRight, Zap, Shield, Gauge, Leaf } from "lucide-react";
import { brand } from "@/data/brand";

const stats = [
  { Icon: Gauge, value: "6", label: "Models" },
  { Icon: Shield, value: "5★", label: "Safety" },
  { Icon: Zap, value: "520km", label: "EV Range" },
  { Icon: Leaf, value: "3.9s", label: "0–100 km/h" },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-32 pb-20 bg-[#f3f3f3] overflow-hidden"
    >
      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-start text-left">
        {/* Editorial Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="mb-10"
        >
          <h2 className="flex items-center gap-4 text-sm font-bold text-[#474545] uppercase tracking-[0.2em]">
            <span className="w-12 h-0.5 bg-[#1c1b1b]/30"></span>
            Introducing {brand.fullName}
          </h2>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.1,
          }}
          className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-heading font-black tracking-tighter text-[#1c1b1b] mb-8 leading-[0.9]"
        >
          Beyond the <br /> Drive.
        </motion.h1>

        {/* Subtitle & CTA Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between w-full gap-12 border-t border-[#e5e5e5] pt-12 mt-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.2,
            }}
            className="text-xl md:text-2xl text-[#474545] font-medium max-w-2xl leading-relaxed"
          >
            {brand.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.3,
            }}
            className="flex flex-col sm:flex-row gap-4 shrink-0"
          >
            <a
              href="#models"
              className="group inline-flex items-center justify-between gap-4 px-8 py-5 rounded-full bg-[#1c1b1b] text-white font-bold text-lg hover:bg-[#333] transition-all active:scale-[0.98]"
            >
              Explore Models
              <ArrowDownRight
                size={20}
                className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"
              />
            </a>
            <a
              href="#booking"
              className="inline-flex items-center justify-center px-8 py-5 rounded-full bg-white border border-[#e5e5e5] text-[#1c1b1b] font-bold text-lg hover:bg-white/60 transition-all active:scale-[0.98]"
            >
              Book a Test Drive
            </a>
          </motion.div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            delay: 0.4,
          }}
          className="flex flex-wrap items-center gap-12 md:gap-20 mt-20"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-white border border-[#e5e5e5]">
                <stat.Icon size={24} className="text-[#1c1b1b]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#1c1b1b]">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#474545] uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
