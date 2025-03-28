interface LocaleRule {
  locales: string[];
  description: string;
}

// Rules for currencies where symbol appears after the number
const afterPositionLocales: LocaleRule[] = [
  {
    locales: ["fr", "fr-fr", "fr-be", "fr-ch", "fr-lu"],
    description: "French-speaking countries",
  },
  {
    locales: ["de", "de-de", "de-at", "de-ch", "de-lu"],
    description: "German-speaking countries",
  },
  {
    locales: ["es", "es-es", "es-mx", "es-ar", "es-co"],
    description: "Spanish-speaking countries",
  },
  {
    locales: ["it", "it-it", "it-ch"],
    description: "Italian-speaking countries",
  },
  {
    locales: ["pt", "pt-pt", "pt-br"],
    description: "Portuguese-speaking countries",
  },
  {
    locales: ["nl", "nl-nl", "nl-be"],
    description: "Dutch-speaking countries",
  },
  {
    locales: ["ru", "ru-ru"],
    description: "Russian-speaking countries",
  },
  {
    locales: ["pl", "pl-pl"],
    description: "Polish-speaking countries",
  },
  {
    locales: ["tr", "tr-tr"],
    description: "Turkish-speaking countries",
  },
];

// Rules for currencies where symbol appears before the number
const beforePositionLocales: LocaleRule[] = [
  {
    locales: ["zh", "zh-cn", "zh-tw", "zh-hk", "zh-sg"],
    description: "Chinese regions",
  },
  {
    locales: ["ja", "ja-jp"],
    description: "Japan",
  },
  {
    locales: ["ko", "ko-kr"],
    description: "Korea",
  },
  {
    locales: [
      "en",
      "en-us",
      "en-gb",
      "en-au",
      "en-ca",
      "en-nz",
      "en-sg",
      "en-hk",
    ],
    description: "English-speaking countries",
  },
  {
    locales: ["th", "th-th"],
    description: "Thailand",
  },
  {
    locales: ["vi", "vi-vn"],
    description: "Vietnam",
  },
];

// Specific currency rules (overrides locale rules)
const currencyRules: Record<string, "before" | "after"> = {
  // North American currencies
  USD: "before",
  CAD: "before",
  MXN: "before",

  // European currencies
  GBP: "before",
  CHF: "before",
  NOK: "after",
  SEK: "after",
  DKK: "after",

  // Asian currencies
  JPY: "before",
  CNY: "before",
  HKD: "before",
  TWD: "before",
  KRW: "before",
  SGD: "before",

  // Oceanian currencies
  AUD: "before",
  NZD: "before",

  // Middle Eastern currencies
  ILS: "before",
  SAR: "before",
  AED: "before",

  // Cryptocurrencies
  BTC: "before",
  ETH: "before",
};

export const getCurrencyPosition = (
  locale: string,
  currencyCode: string
): "before" | "after" => {
  const normalizedLocale = locale.toLowerCase();
  const normalizedCurrency = currencyCode.toUpperCase();

  // Special case for EUR
  if (normalizedCurrency === "EUR") {
    // EUR appears before in Ireland, Malta, and English-speaking contexts
    if (
      normalizedLocale.startsWith("en-ie") ||
      normalizedLocale.startsWith("mt") ||
      normalizedLocale.startsWith("en")
    ) {
      return "before";
    }
    return "after";
  }

  // Check specific currency rules first
  if (currencyRules[normalizedCurrency]) {
    return currencyRules[normalizedCurrency];
  }

  // Check locale-based rules
  const isBeforePosition = beforePositionLocales.some((rule) =>
    rule.locales.some((l) => normalizedLocale.startsWith(l))
  );
  if (isBeforePosition) return "before";

  const isAfterPosition = afterPositionLocales.some((rule) =>
    rule.locales.some((l) => normalizedLocale.startsWith(l))
  );
  if (isAfterPosition) return "after";

  // Default to before if no rules match
  return "before";
};
