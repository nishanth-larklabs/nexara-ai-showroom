'use client';

import { useState } from 'react';
import { cars } from '@/data/cars';
import Image from 'next/image';
import { useAssistant } from '@/context/AssistantContext';
import { Check, Minus, DivideSquare } from 'lucide-react';

type SpecKey = keyof typeof cars[0]['specs'];

const specLabels: Record<SpecKey, string> = {
  engine: 'Engine',
  power: 'Power',
  torque: 'Torque',
  acceleration: '0-100 km/h',
  topSpeed: 'Top Speed',
  mileage: 'Mileage / Range',
  transmission: 'Transmission',
  seating: 'Seating Capacity',
  safetyRating: 'Safety Rating',
  fuelType: 'Fuel Type',
  bootSpace: 'Boot Space',
};

export default function ComparisonSection() {
  const { comparisonSelection, setComparisonSelection } = useAssistant();
  const [modelA, modelB] = comparisonSelection;

  const carA = cars.find((c) => c.id === modelA)!;
  const carB = cars.find((c) => c.id === modelB)!;

  return (
    <section id="comparison" className="section-container relative z-10 py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
          Compare Models
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Side-by-side specifications to help you find the perfect match.
        </p>
      </div>

      <div className="max-w-5xl mx-auto glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
        {/* Header / Selectors */}
        <div className="grid grid-cols-3 bg-white/5 border-b border-white/10 p-6 items-end">
          <div className="col-span-1 pb-2">
            <h3 className="text-xl font-bold text-foreground uppercase tracking-wider">Specifications</h3>
          </div>
          
          {/* Selector A */}
          <div className="col-span-1 px-4 flex flex-col items-center">
            <div className="relative w-full aspect-[16/9] mb-4">
              <Image src={carA.image} alt={carA.name} fill className="object-contain drop-shadow-xl" />
            </div>
            <select
              value={modelA}
              onChange={(e) => setComparisonSelection([e.target.value, modelB])}
              className="w-full bg-background border border-white/20 text-foreground text-sm rounded-xl py-2 px-3 outline-none focus:border-primary appearance-none text-center font-semibold uppercase tracking-wider"
            >
              {cars.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Selector B */}
          <div className="col-span-1 px-4 flex flex-col items-center">
            <div className="relative w-full aspect-[16/9] mb-4">
              <Image src={carB.image} alt={carB.name} fill className="object-contain drop-shadow-xl" />
            </div>
            <select
              value={modelB}
              onChange={(e) => setComparisonSelection([modelA, e.target.value])}
              className="w-full bg-background border border-white/20 text-foreground text-sm rounded-xl py-2 px-3 outline-none focus:border-primary appearance-none text-center font-semibold uppercase tracking-wider"
            >
              {cars.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
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
                className={`grid grid-cols-3 p-4 transition-colors hover:bg-white/5 ${
                  index !== Object.keys(specLabels).length - 1 ? 'border-b border-white/5' : ''
                }`}
              >
                <div className="col-span-1 flex items-center text-sm text-muted-foreground font-medium">
                  {specLabels[key]}
                </div>
                <div className={`col-span-1 text-center text-sm font-semibold ${isDifferent ? 'text-foreground' : 'text-foreground/70'}`}>
                  {key === 'safetyRating' ? `${valA} Stars` : valA}
                </div>
                <div className={`col-span-1 text-center text-sm font-semibold ${isDifferent ? 'text-primary' : 'text-foreground/70'}`}>
                  {key === 'safetyRating' ? `${valB} Stars` : valB}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
