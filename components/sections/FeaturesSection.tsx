"use client";

import { motion, AnimatePresence } from "motion/react";
import { brandFeatures } from "@/data/features";
import { useAssistantStore } from "@/store/useAssistantStore";
import * as Icons from "lucide-react";

export default function FeaturesSection() {
  const activeFeatureId = useAssistantStore((state) => state.activeFeatureId);
  const setActiveFeatureId = useAssistantStore(
    (state) => state.setActiveFeatureId,
  );

  const activeData =
    brandFeatures.find((f) => f.id === activeFeatureId) || brandFeatures[0];

  // Dynamically render the selected icon
  const ActiveIcon = (Icons as any)[activeData.icon] || Icons.Code;

  return (
    <section id="features" className="py-32 px-6 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#1c1b1b] mb-6 tracking-tight">
            NEXARA Engineering
          </h2>
          <p className="text-[#474545] text-xl max-w-2xl font-medium leading-relaxed">
            Every vehicle is built on a foundation of uncompromising safety,
            boundary-pushing technology, and sustainable luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Sidebar Nav */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            {brandFeatures.map((feature) => {
              const Icon = (Icons as any)[feature.icon] || Icons.Circle;
              const isActive = feature.id === activeFeatureId;

              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveFeatureId(feature.id)}
                  className={`group flex items-center gap-5 p-5 rounded-[1.5rem] transition-all duration-300 text-left ${
                    isActive
                      ? "bg-[#1c1b1b] text-white"
                      : "bg-white border border-[#e5e5e5] hover:bg-[#e5e5e5]/50"
                  }`}
                >
                  <div
                    className={`p-3 rounded-full transition-colors ${
                      isActive
                        ? "bg-white text-[#1c1b1b]"
                        : "bg-[#f3f3f3] text-[#1c1b1b]"
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div
                      className={`font-bold text-lg transition-colors ${isActive ? "text-white" : "text-[#1c1b1b]"}`}
                    >
                      {feature.category}
                    </div>
                    <div
                      className={`text-sm mt-1 font-medium line-clamp-1 ${isActive ? "text-white/70" : "text-[#474545]"}`}
                    >
                      {feature.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Content Display */}
          <div className="lg:col-span-8 bg-white border border-[#e5e5e5] rounded-[2rem] p-10 md:p-16 relative overflow-hidden min-h-125 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeData.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative z-10"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="p-5 rounded-full bg-[#f3f3f3] text-[#1c1b1b]">
                    <ActiveIcon size={36} />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-heading font-bold text-[#1c1b1b] tracking-tight">
                    {activeData.title}
                  </h3>
                </div>

                <p className="text-xl text-[#474545] font-medium leading-relaxed mb-12 max-w-3xl">
                  {activeData.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                  {activeData.details.map((detail, idx) => (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      key={idx}
                      className="flex items-start gap-4"
                    >
                      <div className="mt-1 shrink-0 text-[#1c1b1b]">
                        <Icons.CheckCircle2 size={24} />
                      </div>
                      <span className="text-lg font-semibold text-[#1c1b1b] leading-snug">
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
