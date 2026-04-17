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
    <section id="features" className="section-container relative z-10 py-32">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          NEXARA Engineering
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Every vehicle is built on a foundation of uncompromising safety,
          boundary-pushing technology, and sustainable luxury.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sidebar Nav */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {brandFeatures.map((feature) => {
            const Icon = (Icons as any)[feature.icon] || Icons.Circle;
            const isActive = feature.id === activeFeatureId;

            return (
              <button
                key={feature.id}
                onClick={() => setActiveFeatureId(feature.id)}
                className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left ${
                  isActive
                    ? "bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5"
                    : "bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/10"
                }`}
              >
                <div
                  className={`p-3 rounded-xl transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-background text-muted-foreground group-hover:text-foreground"
                  }`}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <div
                    className={`font-semibold text-base transition-colors ${isActive ? "text-primary" : "text-foreground"}`}
                  >
                    {feature.category}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                    {feature.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Display */}
        <div className="lg:col-span-8 glass border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden min-h-100 flex flex-col justify-center">
          {/* Subtle radial background glow based on active feature */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeData.id}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative z-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-primary/20 text-primary border border-primary/20">
                  <ActiveIcon size={32} />
                </div>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  {activeData.title}
                </h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {activeData.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {activeData.details.map((detail, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + idx * 0.05 }}
                    key={idx}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 shrink-0 text-primary">
                      <Icons.CheckCircle2 size={18} />
                    </div>
                    <span className="text-sm font-medium text-foreground/80 leading-snug">
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
