"use client";

import { cars } from "@/data/cars";
import Image from "next/image";
import { useAssistantStore } from "@/store/useAssistantStore";

type SpecKey = keyof (typeof cars)[0]["specs"];

const specLabels: Record<SpecKey, string> = {
  engine: "Engine",
  power: "Power",
  torque: "Torque",
  acceleration: "0-100 km/h",
  topSpeed: "Top Speed",
  mileage: "Mileage / Range",
  transmission: "Transmission",
  seating: "Seating Capacity",
  safetyRating: "Safety Rating",
  fuelType: "Fuel Type",
  bootSpace: "Boot Space",
};

export default function ComparisonSection() {
  const comparisonSelection = useAssistantStore(
    (state) => state.comparisonSelection,
  );
  const setComparisonSelection = useAssistantStore(
    (state) => state.setComparisonSelection,
  );

  const [modelA, modelB] = comparisonSelection;

  const carA = cars.find((c) => c.id === modelA) || cars[0];
  const carB = cars.find((c) => c.id === modelB) || cars[1];

  return (
    <section id="comparison" className="py-32 px-6 bg-[#f3f3f3]">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-heading font-bold text-[#1c1b1b] mb-6 tracking-tight">
            Compare Models
          </h2>
          <p className="text-[#474545] text-xl max-w-2xl font-medium leading-relaxed">
            Side-by-side specifications to help you find the perfect match.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] border border-[#e5e5e5] overflow-hidden">
          {/* Header / Selectors */}
          <div className="grid grid-cols-3 bg-[#f3f3f3] border-b border-[#e5e5e5] p-8 items-end gap-8">
            <div className="col-span-1 pb-4">
              <h3 className="text-2xl font-bold text-[#1c1b1b] tracking-tight">
                Specifications
              </h3>
            </div>

            {/* Selector A */}
            <div className="col-span-1 flex flex-col items-center group">
              <div className="relative w-full aspect-video mb-6 bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#1c1b1b] shadow-sm">
                <Image
                  src={carA.image}
                  alt={carA.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <select
                value={modelA}
                onChange={(e) =>
                  setComparisonSelection([e.target.value, modelB])
                }
                className="w-full bg-white border border-[#e5e5e5] text-[#1c1b1b] text-base rounded-full py-4 px-6 outline-none focus:ring-2 focus:ring-[#1c1b1b] appearance-none text-center font-bold tracking-wide transition-colors hover:bg-[#f3f3f3]"
              >
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Selector B */}
            <div className="col-span-1 flex flex-col items-center group">
              <div className="relative w-full aspect-video mb-6 bg-[#1c1b1b] rounded-2xl overflow-hidden border border-[#1c1b1b] shadow-sm">
                <Image
                  src={carB.image}
                  alt={carB.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <select
                value={modelB}
                onChange={(e) =>
                  setComparisonSelection([modelA, e.target.value])
                }
                className="w-full bg-white border border-[#e5e5e5] text-[#1c1b1b] text-base rounded-full py-4 px-6 outline-none focus:ring-2 focus:ring-[#1c1b1b] appearance-none text-center font-bold tracking-wide transition-colors hover:bg-[#f3f3f3]"
              >
                {cars.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Specs Rows */}
          <div className="flex flex-col">
            {(Object.keys(specLabels) as SpecKey[]).map((key, index) => {
              const valA = carA.specs[key];
              const valB = carB.specs[key];
              const isDifferent = valA !== valB;

              return (
                <div
                  key={key}
                  className={`grid grid-cols-3 p-8 transition-colors hover:bg-[#f3f3f3]/50 items-center ${
                    index !== Object.keys(specLabels).length - 1
                      ? "border-b border-[#e5e5e5]"
                      : ""
                  }`}
                >
                  <div className="col-span-1 text-lg text-[#474545] font-semibold">
                    {specLabels[key]}
                  </div>
                  <div
                    className={`col-span-1 text-center text-lg ${isDifferent ? "font-bold text-[#1c1b1b]" : "font-medium text-[#474545]"}`}
                  >
                    {key === "safetyRating" ? `${valA} Stars` : valA}
                  </div>
                  <div
                    className={`col-span-1 text-center text-lg ${isDifferent ? "font-bold text-[#1c1b1b]" : "font-medium text-[#474545]"}`}
                  >
                    {key === "safetyRating" ? `${valB} Stars` : valB}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
