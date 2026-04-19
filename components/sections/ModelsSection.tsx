"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
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
    <section id="models" className="py-32 px-6 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#1c1b1b] mb-6 tracking-tight">
              The NEXARA Lineup
            </h2>
            <p className="text-[#474545] font-medium max-w-2xl text-xl leading-relaxed">
              From zero-emission city cruisers to twin-turbo track weapons. Find
              the instrument that suits your drive.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-base font-bold transition-all duration-300 capitalize ${
                  activeCategory === cat
                    ? "bg-[#1c1b1b] text-white shadow-md"
                    : "bg-white text-[#1c1b1b] border border-[#e5e5e5] hover:bg-[#e5e5e5]/50"
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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                key={car.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`group relative bg-white rounded-[2rem] overflow-hidden border transition-all duration-300 flex flex-col ${
                  highlightedModelId === car.id
                    ? "border-[#1c1b1b] ring-4 ring-[#1c1b1b]/10 shadow-2xl scale-[1.02]"
                    : "border-[#e5e5e5] hover:border-[#1c1b1b]/30 hover:shadow-xl"
                }`}
              >
                {/* Image Container */}
                <div className="relative h-72 w-full overflow-hidden bg-[#1c1b1b]">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {car.isFlagship && (
                    <div className="absolute top-6 right-6 px-4 py-1.5 bg-[#1c1b1b] text-white text-xs font-bold tracking-widest rounded-full uppercase shadow-md">
                      Flagship
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-1.5 bg-white border border-[#e5e5e5] text-[#1c1b1b] text-xs font-bold tracking-widest rounded-full uppercase shadow-sm">
                    {car.type}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex-1 flex flex-col items-start bg-white border-t border-[#e5e5e5]">
                  <h3 className="text-3xl font-heading font-black text-[#1c1b1b] mb-2 tracking-tight">
                    {car.name}
                  </h3>
                  <p className="text-lg text-[#474545] font-medium mb-8 line-clamp-1">
                    {car.tagline}
                  </p>

                  {/* Specs Strip */}
                  <div className="grid grid-cols-3 w-full mb-10 bg-[#f3f3f3] rounded-2xl p-4 border border-[#e5e5e5]">
                    <div className="flex flex-col items-center border-r border-[#e5e5e5] pr-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#474545] mb-1">
                        Power
                      </span>
                      <span className="text-base font-black text-[#1c1b1b]">
                        {car.specs.power}
                      </span>
                    </div>
                    <div className="flex flex-col items-center border-r border-[#e5e5e5] px-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#474545] mb-1">
                        0-100
                      </span>
                      <span className="text-base font-black text-[#1c1b1b]">
                        {car.specs.acceleration.split(" ")[0]}
                      </span>
                    </div>
                    <div className="flex flex-col items-center pl-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#474545] mb-1">
                        Range
                      </span>
                      <span className="text-base font-black text-[#1c1b1b]">
                        {car.type === "electric"
                          ? car.specs.mileage.split(" ")[0] + " km"
                          : car.specs.mileage}
                      </span>
                    </div>
                  </div>

                  {/* Footer mapping layout */}
                  <div className="mt-auto w-full flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-[#474545] mb-1">
                        Starting at
                      </span>
                      <span className="text-2xl font-black text-[#1c1b1b] tracking-tight">
                        <motion.span key={targetCurrency}>
                          {formatPrice(car.priceINR, targetCurrency)}
                        </motion.span>
                      </span>
                    </div>
                    <button className="flex items-center justify-center w-14 h-14 rounded-full bg-[#f3f3f3] border border-[#e5e5e5] text-[#1c1b1b] transition-colors group-hover:bg-[#1c1b1b] group-hover:text-white group-hover:border-[#1c1b1b] active:scale-95">
                      <ArrowRight
                        size={24}
                        className="group-hover:-rotate-45 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
