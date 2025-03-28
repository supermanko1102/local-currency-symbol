import { currencyMap } from "./map";
import { getCurrencyPosition } from "./positions";
/**
 * Interface for currency symbol position
 */
interface CurrencyPosition {
  symbol: string;
  position: "before" | "after";
}

/**
 * Interface for formatted currency result with value
 */
interface FormattedCurrency {
  symbol: string;
  value: number;
  position: "before" | "after";
}

/**
 * Get currency symbol for a given currency code
 * @param currencyCode Currency code (e.g., 'USD')
 * @returns Currency symbol
 */
export const getCurrencySymbol = (currencyCode: string): string => {
  if (!currencyCode) {
    throw new Error("Currency code is required");
  }
  const code = currencyCode.toUpperCase();
  return currencyMap[code] || code;
};

/**
 * Format currency with value and position
 * @param options Configuration object
 * @param options.value Numeric value to format
 * @param options.currencyCode Currency code (e.g., 'USD')
 * @param options.locale Locale code (default: 'en-US')
 * @returns Formatted currency object containing symbol, value, and position
 */
export const formatCurrencyWithValue = ({
  value,
  currencyCode,
  locale = "en-US",
}: {
  value: number;
  currencyCode: string;
  locale?: string;
}): FormattedCurrency => {
  return {
    symbol: getCurrencySymbol(currencyCode),
    value,
    position: getCurrencyPosition(locale, currencyCode),
  };
};

/**
 * Get currency symbol and position information
 * @param currencyCode Currency code
 * @param locale Locale code
 * @returns Currency symbol and position information
 */
export const getCurrencyInfo = (
  currencyCode: string,
  locale: string = "en-US"
): CurrencyPosition => {
  return {
    symbol: getCurrencySymbol(currencyCode),
    position: getCurrencyPosition(locale, currencyCode),
  };
};
