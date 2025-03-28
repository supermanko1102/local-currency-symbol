# local-currency-symbol

A simple npm package for mapping currency codes to their symbols and handling currency symbol positioning based on locale settings.

## Installation

```bash
npm install local-currency-symbol
```

## Usage

```typescript
import {
  getCurrencySymbol,
  formatCurrencyWithValue,
} from "local-currency-symbol";

// Get currency symbol only
const symbol = getCurrencySymbol("USD"); // Returns '$'
const symbol2 = getCurrencySymbol("EUR"); // Returns '€'

// Get formatted currency with value and position information
const formatted = formatCurrencyWithValue({
  value: 1234.56,
  currencyCode: "USD",
  locale: "en-US",
}); // Returns { symbol: '$', value: 1234.56, position: 'before' }

const formatted2 = formatCurrencyWithValue({
  value: 1234.56,
  currencyCode: "EUR",
  locale: "fr-FR",
}); // Returns { symbol: '€', value: 1234.56, position: 'after' }
```

## API

### getCurrencySymbol(currencyCode: string): string

Returns the symbol for a given currency code. If the currency code is not found, returns the code itself.

### formatCurrencyWithValue(options: FormatOptions): FormattedCurrency

Returns an object containing:

- `symbol`: The currency symbol
- `value`: The numeric value (if provided)
- `position`: Where the symbol should appear ('before' or 'after' the number)

#### Options

- `value`: The numeric value to format
- `currencyCode`: The currency code (e.g., 'USD')
- `locale`: The locale code (default: 'en-US')

## Supported Currencies

This package supports over 150 currency codes, including:

- USD ($)
- EUR (€)
- GBP (£)
- JPY (¥)
- CNY (¥)
- TWD (NT$)
- HKD (HK$)
- KRW (₩)
  And many more...

## License

MIT
