/** NEXARA brand constants */
export const brand = {
  name: 'NEXARA',
  fullName: 'NEXARA Motors',
  tagline: 'Beyond the Drive',
  founded: '2019',
  headquarters: 'Bangalore, India',
  description:
    'NEXARA Motors is a new-generation Indian automotive brand building intelligent, sustainable vehicles for the global market. From city hatchbacks to flagship sedans, every NEXARA is designed to move you — in every sense of the word.',
} as const;

/** Contact details for the Contact section */
export const contactInfo = {
  address: {
    line1: 'NEXARA Motors Pvt. Ltd.',
    line2: '12th Floor, Infinity Tower',
    line3: 'Outer Ring Road, Bellandur',
    city: 'Bangalore',
    state: 'Karnataka',
    zip: '560103',
    country: 'India',
  },
  phone: '+91 80 4567 8900',
  email: 'hello@nexara.in',
  salesEmail: 'sales@nexara.in',
  supportEmail: 'support@nexara.in',
  hours: 'Mon – Sat: 9:00 AM – 7:00 PM IST',
  social: {
    twitter: 'https://x.com/nexaramotors',
    instagram: 'https://instagram.com/nexaramotors',
    youtube: 'https://youtube.com/@nexaramotors',
    linkedin: 'https://linkedin.com/company/nexaramotors',
  },
} as const;

/** Available cities for test drive booking */
export const testDriveCities = [
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Chennai',
  'Hyderabad',
  'Pune',
  'Kochi',
  'Kolkata',
  'Ahmedabad',
  'Jaipur',
] as const;

export type TestDriveCity = (typeof testDriveCities)[number];
