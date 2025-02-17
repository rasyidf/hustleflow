import { useSettingsStore, Currency, type ExchangeRates } from './store';

export function convertCurrency(amount: number, fromCurrency: Currency, toCurrency: Currency): number {
  const { exchangeRates, rates } = useSettingsStore.getState();
  
  // If converting between base rates, use the stored rate for each currency
  if (amount === rates[fromCurrency]?.amount) {
    return rates[toCurrency]?.amount ?? convertWithRates(amount, fromCurrency, toCurrency, exchangeRates);
  }
  
  return convertWithRates(amount, fromCurrency, toCurrency, exchangeRates);
}

export function convertWithRates(amount: number, fromCurrency: Currency, toCurrency: Currency, rates: ExchangeRates): number {
  if (fromCurrency === toCurrency) return amount;
  
  // Convert to USD first (our base currency for conversions)
  const usdAmount = amount / rates[fromCurrency];
  return usdAmount * rates[toCurrency];
}

export function formatCurrency(amount: number, currency: Currency): string {
  const localeMap: Record<Currency, string> = {
    USD: 'en-US',
    EUR: 'de-DE',
    GBP: 'en-GB',
    IDR: 'id-ID',
  };

  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: currency === 'IDR' ? 0 : 2,
    maximumFractionDigits: currency === 'IDR' ? 0 : 2,
  };

  return new Intl.NumberFormat(localeMap[currency] || 'en-US', options).format(amount);
}

export function getBaseRate(currency: Currency): number {
  const { rates } = useSettingsStore.getState();
  return rates[currency]?.amount ?? rates.USD.amount;
}
