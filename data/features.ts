/** Brand-level feature categories shown in the Features section */
export interface BrandFeature {
  id: string;
  category: string;
  icon: string; // lucide icon name
  title: string;
  description: string;
  details: string[];
}

export const brandFeatures: BrandFeature[] = [
  {
    id: 'safety',
    category: 'Safety',
    icon: 'ShieldCheck',
    title: 'NEXARA SafeGuard™',
    description:
      'Every NEXARA is engineered around a high-strength steel cage with up to 8 airbags, ADAS Level 2+, and a 5-star GNCAP ambition across the lineup.',
    details: [
      'Adaptive cruise control with stop-and-go',
      'Automatic emergency braking (AEB)',
      'Lane keeping assist & departure warning',
      'Blind-spot monitoring with rear cross-traffic alert',
      'Driver attention monitoring via IR camera',
      '360° surround-view camera system',
    ],
  },
  {
    id: 'technology',
    category: 'Technology',
    icon: 'Cpu',
    title: 'NEXARA ConnectOS™',
    description:
      'Our in-house connected platform delivers OTA updates, remote diagnostics, AI-powered navigation, and seamless smartphone integration.',
    details: [
      'Over-the-air software updates',
      'Remote start, lock, and climate control via app',
      'AI-optimised route planning with live traffic',
      'Wireless Apple CarPlay & Android Auto',
      'Voice assistant with natural-language understanding',
      'Embedded 5G connectivity',
    ],
  },
  {
    id: 'performance',
    category: 'Performance',
    icon: 'Gauge',
    title: 'NEXARA DriveTrain™',
    description:
      'From efficient turbo-petrol to instant-torque electric — every powertrain is tuned for responsiveness, efficiency, and driving pleasure.',
    details: [
      'Turbo-petrol, diesel, hybrid, and full-electric options',
      'Multi-mode drive select (Eco, Comfort, Sport, Track)',
      'Adaptive suspension with real-time damping',
      'Torque vectoring for precise cornering',
      'Regenerative braking on hybrid & EV models',
      'Launch control on performance variants',
    ],
  },
  {
    id: 'comfort',
    category: 'Comfort',
    icon: 'Armchair',
    title: 'NEXARA Lounge™',
    description:
      'Interiors designed around you — premium materials, intelligent climate control, and acoustic engineering that transforms every drive into a retreat.',
    details: [
      'Nappa leather and Alcantara upholstery',
      'Ventilated, heated, and powered seats',
      'Multi-zone climate control with air purifier',
      'Acoustic laminated glass for cabin silence',
      'Panoramic sunroof with electrochromic tint',
      'Ambient lighting with 64-colour palette',
    ],
  },
  {
    id: 'sustainability',
    category: 'Sustainability',
    icon: 'Leaf',
    title: 'NEXARA GreenPath™',
    description:
      'We are committed to carbon-neutral manufacturing by 2030, sustainable materials, and an expanding EV lineup.',
    details: [
      'Recycled ocean plastics in interior trims',
      'Sustainably sourced leather and wood',
      'Carbon-neutral factory operations by 2030',
      'Vehicle-to-grid (V2G) capability on EVs',
      'Battery recycling and second-life programme',
      'Solar-panel integrated roof (select models)',
    ],
  },
  {
    id: 'design',
    category: 'Design',
    icon: 'Palette',
    title: 'NEXARA DesignDNA™',
    description:
      'Clean lines, bold presence, and aerodynamic efficiency — our design language is unmistakably NEXARA from any angle.',
    details: [
      'Signature LED light bar connecting headlamps',
      'Flush door handles for reduced drag',
      'Sculpted character lines for muscular stance',
      'Active grille shutters for aerodynamic efficiency',
      'Two-tone roof options on select models',
      'Forged alloy wheels in 17" to 21" sizes',
    ],
  },
];
