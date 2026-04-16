import type { Car } from '@/types/car';

/**
 * NEXARA Motors — Complete vehicle lineup.
 *
 * 6 models spanning sedan, SUV (×2), electric, coupe, and hatchback
 * segments. Prices are in INR. Every model has a unique gradient
 * for its card/hero treatment.
 */
export const cars: Car[] = [
  {
    id: 'zenith',
    name: 'Nexara Zenith',
    tagline: 'Where luxury meets intelligence',
    type: 'sedan',
    priceINR: 3800000,
    specs: {
      engine: '2.0L Twin-Turbo Hybrid',
      power: '380 HP',
      torque: '450 Nm',
      acceleration: '4.8s (0-100 km/h)',
      topSpeed: '250 km/h',
      mileage: '18 km/l',
      transmission: '8-speed Automatic',
      seating: 5,
      safetyRating: 5,
      fuelType: 'hybrid',
      bootSpace: '520 L',
    },
    features: [
      {
        icon: 'Sparkles',
        title: 'Matrix LED Headlights',
        description:
          'Adaptive beam pattern that illuminates the road without blinding oncoming traffic.',
      },
      {
        icon: 'Wind',
        title: 'Air Suspension',
        description:
          'Electronically controlled air springs adapt ride height and firmness to every road.',
      },
      {
        icon: 'Monitor',
        title: '12.3" Infotainment',
        description:
          'Curved OLED display with haptic feedback, wireless CarPlay and Android Auto.',
      },
      {
        icon: 'ShieldCheck',
        title: 'ADAS Level 2+',
        description:
          'Adaptive cruise, lane keeping, blind-spot monitoring, and automatic emergency braking.',
      },
    ],
    shortDescription:
      'The flagship sedan that redefines luxury with a twin-turbo hybrid powertrain and a cabin crafted from premium leather and sustainably sourced wood.',
    longDescription:
      'The Nexara Zenith is our statement of intent — a full-size luxury sedan that pairs a 380 HP twin-turbo hybrid drivetrain with an interior that rivals first-class air travel. Every surface is finished in hand-stitched Nappa leather or open-pore walnut, while a 22-speaker Meridian sound system fills the cabin with concert-hall clarity. ADAS Level 2+ keeps you safe, and the air suspension keeps you comfortable on any surface.',
    gradient: ['#1a1a2e', '#16213e'],
    isFlagship: true,
    image: '/cars/zenith.webp',
    gallery: ['/cars/zenith-1.webp', '/cars/zenith-2.webp', '/cars/zenith-3.webp'],
  },

  {
    id: 'titan',
    name: 'Nexara Titan',
    tagline: 'Command every terrain',
    type: 'suv',
    priceINR: 3200000,
    specs: {
      engine: '2.0L Turbo Diesel',
      power: '320 HP',
      torque: '520 Nm',
      acceleration: '6.2s (0-100 km/h)',
      topSpeed: '220 km/h',
      mileage: '15 km/l',
      transmission: '9-speed Automatic AWD',
      seating: 7,
      safetyRating: 5,
      fuelType: 'diesel',
      bootSpace: '680 L',
    },
    features: [
      {
        icon: 'Mountain',
        title: 'Terrain Response',
        description:
          'Five driving modes — Sand, Mud, Snow, Rock, and Road — each calibrating throttle, traction, and suspension.',
      },
      {
        icon: 'Camera',
        title: '360° Camera System',
        description:
          'Bird-eye view stitched from four cameras for effortless parking and off-road visibility.',
      },
      {
        icon: 'Armchair',
        title: 'Captain Seats',
        description:
          'Second-row captain chairs with heating, cooling, and powered recline for VIP comfort.',
      },
      {
        icon: 'Tv',
        title: 'Rear Entertainment',
        description:
          '10.4" dual rear screens with streaming apps and wireless headphone pairing.',
      },
    ],
    shortDescription:
      'A commanding full-size SUV with 7 seats, intelligent all-wheel drive, and a diesel heart that conquers highways and trails alike.',
    longDescription:
      'The Nexara Titan is built for families who refuse to compromise. Its 320 HP turbo-diesel engine delivers effortless highway cruising and serious off-road torque, while the Terrain Response system adapts to any surface. Inside, three rows of seating — including second-row captain chairs — ensure every passenger arrives relaxed, and the 680 L boot swallows luggage for any adventure.',
    gradient: ['#0f3460', '#1a1a2e'],
    isFlagship: false,
    image: '/cars/titan.webp',
    gallery: ['/cars/titan-1.webp', '/cars/titan-2.webp', '/cars/titan-3.webp'],
  },

  {
    id: 'volt',
    name: 'Nexara Volt',
    tagline: 'Pure energy, zero emissions',
    type: 'electric',
    priceINR: 2850000,
    specs: {
      engine: 'Dual Electric Motors',
      power: '340 HP',
      torque: '580 Nm',
      acceleration: '5.1s (0-100 km/h)',
      topSpeed: '200 km/h',
      mileage: '520 km range (ARAI)',
      transmission: 'Single-speed Automatic',
      seating: 5,
      safetyRating: 5,
      fuelType: 'electric',
      bootSpace: '450 L',
    },
    features: [
      {
        icon: 'Zap',
        title: 'DC Fast Charging',
        description:
          '0-80% in just 35 minutes at any CCS2-compatible station.',
      },
      {
        icon: 'RefreshCw',
        title: 'Regenerative Braking',
        description:
          'Three-level regen recovers energy on every deceleration, extending range by up to 15%.',
      },
      {
        icon: 'Wifi',
        title: 'OTA Updates',
        description:
          'Over-the-air software updates add features and improve performance while you sleep.',
      },
      {
        icon: 'Route',
        title: 'AI Route Planning',
        description:
          'Intelligent range-optimised navigation that factors in elevation, weather, and charging stops.',
      },
    ],
    shortDescription:
      'Our all-electric crossover delivers 520 km of range, instant torque, and a whisper-quiet cabin — the future, today.',
    longDescription:
      'The Nexara Volt is engineered for the electric age. Twin motors deliver 580 Nm of instant torque through an intelligent AWD system, while the 78 kWh battery provides a real-world range of over 500 km. DC fast charging gets you back on the road in 35 minutes, and over-the-air updates mean your Volt gets better with every update. The panoramic glass roof floods the cabin with light, and the front trunk (frunk) adds 60 L of extra storage.',
    gradient: ['#00b4d8', '#023e8a'],
    isFlagship: false,
    image: '/cars/volt.webp',
    gallery: ['/cars/volt-1.webp', '/cars/volt-2.webp', '/cars/volt-3.webp'],
  },

  {
    id: 'drift',
    name: 'Nexara Drift',
    tagline: 'Born for the apex',
    type: 'coupe',
    priceINR: 4500000,
    specs: {
      engine: '3.0L V6 Twin-Turbo',
      power: '450 HP',
      torque: '550 Nm',
      acceleration: '3.9s (0-100 km/h)',
      topSpeed: '280 km/h',
      mileage: '10 km/l',
      transmission: '7-speed Dual-Clutch',
      seating: 4,
      safetyRating: 4,
      fuelType: 'petrol',
      bootSpace: '280 L',
    },
    features: [
      {
        icon: 'Gauge',
        title: 'Launch Control',
        description:
          'Hold both pedals and release — the electronics deliver the perfect launch every time.',
      },
      {
        icon: 'Flame',
        title: 'Active Aero',
        description:
          'Rear spoiler and front splitter adjust automatically for downforce or drag reduction.',
      },
      {
        icon: 'Timer',
        title: 'Track Mode',
        description:
          'Disables traction nannies, firms the dampers, and sharpens every input for circuit driving.',
      },
      {
        icon: 'Volume2',
        title: 'Sport Exhaust',
        description:
          'Valve-controlled titanium exhaust delivers a soundtrack worthy of the autobahn.',
      },
    ],
    shortDescription:
      'A V6 twin-turbo coupe with 450 HP, active aero, and a dual-clutch gearbox that lives for corners.',
    longDescription:
      'The Nexara Drift exists for one reason: the joy of driving. A 3.0L twin-turbo V6 sends 450 HP through a lightning-fast 7-speed dual-clutch gearbox to the rear wheels. Active aerodynamics adjust in real time, carbon ceramic brakes haul you down from any speed, and Track Mode transforms the Drift into a focused circuit weapon. The 2+2 cabin keeps it practical enough for weekend getaways, but make no mistake — this car was born at the apex.',
    gradient: ['#e63946', '#1d3557'],
    isFlagship: false,
    image: '/cars/drift.webp',
    gallery: ['/cars/drift-1.webp', '/cars/drift-2.webp', '/cars/drift-3.webp'],
  },

  {
    id: 'evo',
    name: 'Nexara Evo',
    tagline: 'Adventure starts here',
    type: 'suv',
    priceINR: 1550000,
    specs: {
      engine: '1.5L Turbo Petrol',
      power: '160 HP',
      torque: '250 Nm',
      acceleration: '8.5s (0-100 km/h)',
      topSpeed: '190 km/h',
      mileage: '18 km/l',
      transmission: '6-speed Automatic',
      seating: 5,
      safetyRating: 5,
      fuelType: 'petrol',
      bootSpace: '420 L',
    },
    features: [
      {
        icon: 'Sun',
        title: 'Panoramic Sunroof',
        description:
          'A vast single-pane glass roof that opens up the cabin to the sky.',
      },
      {
        icon: 'Smartphone',
        title: 'Connected Car Suite',
        description:
          'Remote start, geo-fencing, vehicle tracking, and diagnostics from your phone.',
      },
      {
        icon: 'ArrowDownToLine',
        title: 'Hill Descent Control',
        description:
          'Automated speed control on steep descents — just steer, the car handles the brakes.',
      },
      {
        icon: 'Fan',
        title: 'Ventilated Seats',
        description:
          'Perforated leather seats with three-stage cooling for Indian summers.',
      },
    ],
    shortDescription:
      'A compact SUV that packs premium features, a spirited turbo engine, and 5-star safety into a city-friendly footprint.',
    longDescription:
      'The Nexara Evo proves that adventure doesn\'t need a premium price tag. Its 1.5L turbo engine is eager and efficient, the connected car suite keeps you in control from anywhere, and 5-star safety means the whole family rides with confidence. A panoramic sunroof, ventilated seats, and a crisp 10.25" touchscreen make the Evo feel like a car from a class above.',
    gradient: ['#2d6a4f', '#1b4332'],
    isFlagship: false,
    image: '/cars/evo.webp',
    gallery: ['/cars/evo-1.webp', '/cars/evo-2.webp', '/cars/evo-3.webp'],
  },

  {
    id: 'pulse',
    name: 'Nexara Pulse',
    tagline: 'City smart, highway ready',
    type: 'hatchback',
    priceINR: 850000,
    specs: {
      engine: '1.2L Turbo Petrol',
      power: '120 HP',
      torque: '175 Nm',
      acceleration: '9.8s (0-100 km/h)',
      topSpeed: '180 km/h',
      mileage: '22 km/l',
      transmission: '6-speed Manual / CVT',
      seating: 5,
      safetyRating: 4,
      fuelType: 'petrol',
      bootSpace: '320 L',
    },
    features: [
      {
        icon: 'Radio',
        title: 'Wireless CarPlay & Android Auto',
        description:
          'Seamless phone mirroring without cables on a 9" floating touchscreen.',
      },
      {
        icon: 'Lightbulb',
        title: 'LED DRLs & Tail Lamps',
        description:
          'Distinctive LED signature front and rear for a modern, premium look.',
      },
      {
        icon: 'Navigation',
        title: 'Cruise Control',
        description:
          'Set your speed and relax — ideal for long highway stretches.',
      },
      {
        icon: 'KeyRound',
        title: 'Keyless Entry & Go',
        description:
          'Walk up, grab the handle, push the button, and drive — the key stays in your pocket.',
      },
    ],
    shortDescription:
      'The spirited city hatchback that delivers 22 km/l, connected tech, and genuine fun-to-drive character.',
    longDescription:
      'The Nexara Pulse turns every commute into a small joy. Its peppy 1.2L turbo returns an impressive 22 km/l while still delivering enough punch for confident overtakes. Wireless CarPlay and Android Auto keep you connected, LED lighting gives it unmistakable road presence, and the tight turning circle makes city parking effortless. It\'s proof that your first NEXARA can still be a great NEXARA.',
    gradient: ['#ff6b6b', '#c44569'],
    isFlagship: false,
    image: '/cars/pulse.webp',
    gallery: ['/cars/pulse-1.webp', '/cars/pulse-2.webp', '/cars/pulse-3.webp'],
  },
];

/**
 * Quick lookup by car ID.
 * O(1) access for AI mutation handlers.
 */
export const carMap = new Map(cars.map((car) => [car.id, car]));

/**
 * Get car models matching given filters.
 * Used by the filter_models mutation.
 */
export function filterCars(opts: {
  types?: string[];
  maxPrice?: number;
  minPrice?: number;
  fuelTypes?: string[];
  minSeating?: number;
}): Car[] {
  return cars.filter((car) => {
    if (opts.types?.length && !opts.types.includes(car.type)) return false;
    if (opts.maxPrice != null && car.priceINR > opts.maxPrice) return false;
    if (opts.minPrice != null && car.priceINR < opts.minPrice) return false;
    if (opts.fuelTypes?.length && !opts.fuelTypes.includes(car.specs.fuelType))
      return false;
    if (opts.minSeating != null && car.specs.seating < opts.minSeating)
      return false;
    return true;
  });
}
