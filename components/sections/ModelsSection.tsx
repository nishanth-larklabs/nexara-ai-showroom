"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight } from "lucide-react";
import { cars } from "@/data/cars";
import { formatPrice } from "@/data/currency";
import { useAssistantStore } from "@/store/useAssistantStore";
import Image from "next/image";

const categories = ["all", "sedan", "suv", "electric", "coupe", "hatchback"];

export default function ModelsSection() {
  const modelFilters = useAssistantStore((state) => state.modelFilters);
  const highlightedModelId = useAssistantStore(
    (state) => state.highlightedModelId,
  );
  const targetCurrency = useAssistantStore((state) => state.targetCurrency);

  const [activeCategory, setActiveCategory] = useState("all");

  // Sync activeCategory if AI pushed a single type filter
  useEffect(() => {
    if (modelFilters.types && modelFilters.types.length === 1) {
      setActiveCategory(modelFilters.types[0].toLowerCase());
    } else if (Object.keys(modelFilters).length === 0) {
      setActiveCategory("all");
    }
  }, [modelFilters]);

  const filteredCars = cars.filter((car) => {
    if (activeCategory !== "all" && car.type !== activeCategory) return false;

    if (modelFilters.maxPrice && car.priceINR > modelFilters.maxPrice)
      return false;
    if (modelFilters.minPrice && car.priceINR < modelFilters.minPrice)
      return false;
    if (
      modelFilters.fuelTypes &&
      modelFilters.fuelTypes.length > 0 &&
      !modelFilters.fuelTypes.includes(car.specs.fuelType)
    )
      return false;
    if (modelFilters.minSeating && car.specs.seating < modelFilters.minSeating)
      return false;

    return true;
  });

  return (
    <section id="models" className="section-container relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
            The NEXARA Lineup
          </h2>
          <p className="text-muted-foreground max-w-xl text-lg">
            From zero-emission city cruisers to twin-turbo track weapons. Find
            the instrument that suits your drive.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-lg shadow-white/10"
                  : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredCars.map((car) => (
            <motion.div
              key={car.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className={`group relative rounded-3xl overflow-hidden glass border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl flex flex-col ${
                highlightedModelId === car.id
                  ? "border-primary ring-2 ring-primary/50 shadow-primary/20 scale-[1.02]"
                  : "border-white/10 hover:border-white/20 hover:shadow-blue-500/10"
              }`}
            >
              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-linear-to-b from-white/5 to-transparent">
                <div
                  className="absolute inset-0 opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                  style={{
                    background: `linear-gradient(to top, ${car.gradient[0]}, transparent)`,
                  }}
                />
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  className="object-cover object-center scale-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {car.isFlagship && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gold/20 backdrop-blur-md border border-gold/30 text-gold text-xs font-bold tracking-wider rounded-full uppercase">
                    Flagship
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 text-white/90 text-xs font-semibold tracking-wider rounded-full uppercase">
                  {car.type}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col items-start">
                <h3 className="text-2xl font-heading font-bold text-foreground mb-1 uppercase tracking-wide">
                  {car.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-1">
                  {car.tagline}
                </p>

                {/* Specs Strip */}
                <div className="grid grid-cols-3 gap-2 w-full mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      Power
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {car.specs.power}
                    </span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      0-100
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {car.specs.acceleration.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex flex-col border-l border-white/10 pl-2">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                      Range/Mil
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {car.type === "electric"
                        ? car.specs.mileage.split(" ")[0] + " km"
                        : car.specs.mileage}
                    </span>
                  </div>
                </div>

                {/* Footer mapping layout */}
                <div className="mt-auto w-full flex items-center justify-between pt-4 border-t border-white/10 h-16">
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground mb-0.5">
                      Starting at
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      <motion.span key={targetCurrency}>
                        {formatPrice(car.priceINR, targetCurrency)}
                      </motion.span>
                    </span>
                  </div>
                  <button className="flex items-center justify-center p-3 rounded-xl bg-white/5 text-foreground hover:bg-white/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <ChevronRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
