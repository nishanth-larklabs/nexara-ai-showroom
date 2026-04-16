/** Vehicle body style categories */
export type CarType = 'sedan' | 'suv' | 'coupe' | 'hatchback' | 'electric';

/** Fuel/powertrain type */
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';

/** Supported display currencies */
export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

/** Technical specifications for a vehicle */
export interface CarSpecs {
  engine: string;
  power: string;
  torque: string;
  acceleration: string; // 0-100 km/h
  topSpeed: string;
  mileage: string; // km/l or range for EVs
  transmission: string;
  seating: number;
  safetyRating: number; // out of 5
  fuelType: FuelType;
  bootSpace: string;
}

/** A single highlight feature of a vehicle */
export interface CarFeature {
  icon: string; // lucide icon name
  title: string;
  description: string;
}

/** Complete car model definition */
export interface Car {
  id: string;
  name: string;
  tagline: string;
  type: CarType;
  /** Base price in INR (paise-free, whole rupees) */
  priceINR: number;
  specs: CarSpecs;
  features: CarFeature[];
  /** Short marketing description (1-2 sentences) */
  shortDescription: string;
  /** Longer description for detail views */
  longDescription: string;
  /** Gradient colors for card backgrounds [from, to] */
  gradient: [string, string];
  /** Whether this is the flagship/promoted model */
  isFlagship: boolean;
  /** Image path relative to /public */
  image: string;
  /** Gallery image paths */
  gallery: string[];
}

/** Currency conversion rates from INR */
export interface CurrencyRates {
  INR: number;
  USD: number;
  EUR: number;
  GBP: number;
}

/** Currency display metadata */
export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  locale: string;
}
