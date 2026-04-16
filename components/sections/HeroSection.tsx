'use client';

import { motion } from 'motion/react';
import { ChevronDown, Zap, Shield, Gauge, Leaf } from 'lucide-react';
import { brand } from '@/data/brand';

const stats = [
  { Icon: Gauge, value: '6', label: 'Models' },
  { Icon: Shield, value: '5★', label: 'Safety' },
  { Icon: Zap, value: '520km', label: 'EV Range' },
  { Icon: Leaf, value: '3.9s', label: '0–100 km/h' },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card" />
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[900px] md:h-[600px] rounded-full bg-primary/5 blur-[100px]" />

      {/* Floating accent orbs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 left-1/4 w-48 h-48 rounded-full bg-primary/8 blur-3xl animate-float-delayed" />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20">
        {/* Brand pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          Introducing {brand.fullName}
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tight text-foreground mb-6 leading-[1.1]"
        >
          Beyond the{' '}
          <span className="text-gradient-blue">Drive</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {brand.description}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a
            href="#models"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
          >
            Explore Models
            <ChevronDown
              size={18}
              className="rotate-[-90deg] group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-foreground font-semibold text-base hover:bg-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]"
          >
            Book a Test Drive
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 text-left">
              <div className="p-2 rounded-lg bg-white/5">
                <stat.Icon size={18} className="text-primary" />
              </div>
              <div>
                <div className="text-lg font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#models"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Scroll to models section"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Discover</span>
          <ChevronDown size={18} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
