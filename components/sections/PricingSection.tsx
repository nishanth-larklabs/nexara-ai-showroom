"use client";

import { motion, AnimatePresence } from "motion/react";
import { cars } from "@/data/cars";
import {
  availableCurrencies,
  currencyInfoMap,
  formatPrice,
  formatPriceLakh,
} from "@/data/currency";
import { useAssistantStore } from "@/store/useAssistantStore";

export default function PricingSection() {
  const targetCurrency = useAssistantStore((state) => state.targetCurrency);
  const setTargetCurrency = useAssistantStore(
    (state) => state.setTargetCurrency,
  );

  return (
    <section id="pricing" className="py-32 px-6 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#1c1b1b] mb-6 tracking-tight">
            Transparent Pricing
          </h2>
          <p className="text-[#474545] text-xl font-medium max-w-2xl mx-auto">
            Explore our lineup's global pricing. No hidden fees.
          </p>
        </div>

        {/* Currency Toggle */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex items-center p-2 bg-white border border-[#e5e5e5] rounded-full shadow-sm">
            {availableCurrencies.map((c) => (
              <button
                key={c}
                onClick={() => setTargetCurrency(c)}
                className={`px-8 py-3 rounded-full text-base font-bold transition-all duration-300 ${
                  targetCurrency === c
                    ? "bg-[#1c1b1b] text-white shadow-md"
                    : "text-[#474545] hover:text-[#1c1b1b] hover:bg-[#f3f3f3]"
                }`}
              >
                {c} {currencyInfoMap[c].symbol}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {cars.map((car, idx) => (
              <motion.div
                layout
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: idx * 0.05,
                }}
                className="bg-white p-10 rounded-[2rem] border border-[#e5e5e5] flex flex-col justify-between hover:shadow-xl transition-all group"
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <div className="text-sm font-bold text-[#474545] uppercase tracking-widest mb-2">
                        {car.type}
                      </div>
                      <h3 className="text-3xl font-heading font-black text-[#1c1b1b] tracking-tight">
                        {car.name}
                      </h3>
                    </div>
                    {car.isFlagship && (
                      <span className="px-4 py-1.5 bg-[#1c1b1b] text-white text-xs font-bold uppercase tracking-widest rounded-full">
                        Flagship
                      </span>
                    )}
                  </div>

                  <div className="mb-10 p-6 bg-[#f3f3f3] rounded-2xl border border-[#e5e5e5]">
                    <span className="text-base font-bold text-[#474545] block mb-2">
                      Starting at
                    </span>
                    <div className="text-5xl font-black text-[#1c1b1b] tracking-tighter flex items-baseline gap-2">
                      <motion.span
                        key={targetCurrency + car.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {formatPrice(car.priceINR, targetCurrency)}
                      </motion.span>
                    </div>
                    {targetCurrency === "INR" && (
                      <div className="text-lg text-[#474545] mt-2 font-bold">
                        (or {formatPriceLakh(car.priceINR)})
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative z-10 border-t border-[#e5e5e5] pt-8">
                  <ul className="flex flex-col gap-4">
                    <li className="flex items-center gap-4 text-base font-semibold text-[#1c1b1b]">
                      <div className="w-2 h-2 rounded-full bg-[#1c1b1b]" />
                      Delivery in 4-6 weeks
                    </li>
                    <li className="flex items-center gap-4 text-base font-semibold text-[#1c1b1b]">
                      <div className="w-2 h-2 rounded-full bg-[#1c1b1b]" />
                      Comprehensive 5-year warranty
                    </li>
                  </ul>
                  <a
                    href={`#booking`}
                    className="mt-10 block w-full py-5 text-center rounded-full bg-white border-2 border-[#1c1b1b] text-[#1c1b1b] font-bold text-lg hover:bg-[#1c1b1b] hover:text-white transition-all active:scale-[0.98]"
                  >
                    Book Now
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
