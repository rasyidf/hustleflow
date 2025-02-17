const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.79,
  JPY: 144.50,
  IDR: 15450,
};

export function convertCurrency(amount: number, fromCurrency: string, toCurrency: string): number {
  const fromRate = EXCHANGE_RATES[fromCurrency] || 1;
  const toRate = EXCHANGE_RATES[toCurrency] || 1;
  return (amount / fromRate) * toRate;
}

export function formatCurrency(amount: number, currency: string): string {
  const localeMap: Record<string, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    JPY: 'ja-JP',
    IDR: 'id-ID',
    // Add more mappings as needed
  };

  return new Intl.NumberFormat(localeMap[currency] || 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
