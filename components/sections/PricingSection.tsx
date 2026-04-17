'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cars } from '@/data/cars';
import { availableCurrencies, currencyInfoMap, formatPrice, formatPriceLakh } from '@/data/currency';
import type { Currency } from '@/types/car';

import { useAssistant } from '@/context/AssistantContext';

export default function PricingSection() {
  const { targetCurrency, setTargetCurrency } = useAssistant();

  return (
    <section id="pricing" className="section-container relative z-10 py-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          Transparent Pricing
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Explore our lineup's global pricing. No hidden fees.
        </p>
      </div>

      {/* Currency Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center p-1 bg-white/5 border border-white/10 rounded-full">
          {availableCurrencies.map((c) => (
            <button
              key={c}
              onClick={() => setTargetCurrency(c)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                targetCurrency === c
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
              }`}
            >
              {c} {currencyInfoMap[c].symbol}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {cars.map((car, idx) => (
            <motion.div
              layout
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass p-8 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-primary/50 transition-colors group relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ background: `linear-gradient(to bottom right, ${car.gradient[0]}, ${car.gradient[1]})` }}
              />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{car.type}</div>
                    <h3 className="text-2xl font-heading font-bold text-foreground">{car.name}</h3>
                  </div>
                  {car.isFlagship && (
                    <span className="px-3 py-1 bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-wider rounded-full border border-gold/30">
                      Flagship
                    </span>
                  )}
                </div>

                <div className="mb-8">
                  <span className="text-sm text-muted-foreground block mb-2">Starting at</span>
                  <div className="text-4xl font-bold text-foreground tracking-tight flex items-baseline gap-2">
                    <motion.span 
                      key={targetCurrency + car.id}
                      initial={{ opacity: 0, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, filter: 'blur(0px)' }}
                    >
                      {formatPrice(car.priceINR, targetCurrency)}
                    </motion.span>
                  </div>
                  {targetCurrency === 'INR' && (
                    <div className="text-sm text-muted-foreground mt-1 font-medium">
                      (or {formatPriceLakh(car.priceINR)})
                    </div>
                  )}
                </div>
              </div>

              <div className="relative z-10 border-t border-white/10 pt-6">
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Delivery in 4-6 weeks
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Comprehensive 5-year warranty
                  </li>
                </ul>
                <a
                  href={`#booking`}
                  className="mt-8 block w-full py-3 text-center rounded-xl bg-white/5 text-foreground font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 ring-1 ring-white/10"
                >
                  Book Now
                </a>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
