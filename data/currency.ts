import type { Currency, CurrencyInfo, CurrencyRates } from '@/types/car';

/**
 * Exchange rates from INR.
 * These are approximate mid-market rates for display purposes.
 * In production, these would come from an API.
 */
export const currencyRates: CurrencyRates = {
  INR: 1,
  USD: 0.012,    // 1 INR ≈ 0.012 USD (₹83 per $1)
  EUR: 0.011,    // 1 INR ≈ 0.011 EUR (₹90 per €1)
  GBP: 0.0095,   // 1 INR ≈ 0.0095 GBP (₹105 per £1)
};

/** Display metadata for each supported currency */
export const currencyInfoMap: Record<Currency, CurrencyInfo> = {
  INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', locale: 'en-US' },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', locale: 'en-GB' },
};

/**
 * Convert a price from INR to the target currency.
 * Returns a formatted string with the currency symbol.
 */
export function formatPrice(priceINR: number, currency: Currency): string {
  const info = currencyInfoMap[currency];
  const converted = priceINR * currencyRates[currency];

  return new Intl.NumberFormat(info.locale, {
    style: 'currency',
    currency: info.code,
    maximumFractionDigits: currency === 'INR' ? 0 : 0,
    minimumFractionDigits: 0,
  }).format(converted);
}

/**
 * Format an INR price in lakh notation (e.g. "₹38.00 Lakh").
 * This is the default display format for the Indian market.
 */
export function formatPriceLakh(priceINR: number): string {
  const lakhs = priceINR / 100000;
  return `₹${lakhs.toFixed(2)} Lakh`;
}

/** All selectable currencies, ordered for display */
export const availableCurrencies: Currency[] = ['INR', 'USD', 'EUR', 'GBP'];
