import { getCurrencySymbol, formatCurrencyWithValue } from "../index";

describe("Currency Symbol Package", () => {
  describe("getCurrencySymbol", () => {
    it("should return correct symbol for valid currency codes", () => {
      expect(getCurrencySymbol("USD")).toBe("$");
      expect(getCurrencySymbol("EUR")).toBe("€");
      expect(getCurrencySymbol("GBP")).toBe("£");
      expect(getCurrencySymbol("JPY")).toBe("¥");
    });

    it("should handle lowercase currency codes", () => {
      expect(getCurrencySymbol("usd")).toBe("$");
      expect(getCurrencySymbol("eur")).toBe("€");
    });

    it("should return currency code for unknown currencies", () => {
      expect(getCurrencySymbol("XXX")).toBe("XXX");
    });

    it("should throw error for empty currency code", () => {
      expect(() => getCurrencySymbol("")).toThrow("Currency code is required");
    });
  });

  describe("formatCurrencyWithValue", () => {
    it("should format USD correctly", () => {
      const result = formatCurrencyWithValue({
        value: 1234.56,
        currencyCode: "USD",
        locale: "en-US",
      });
      expect(result).toEqual({
        symbol: "$",
        value: 1234.56,
        position: "before",
      });
    });

    it("should format EUR correctly for French locale", () => {
      const result = formatCurrencyWithValue({
        value: 1234.56,
        currencyCode: "EUR",
        locale: "fr-FR",
      });
      expect(result).toEqual({
        symbol: "€",
        value: 1234.56,
        position: "after",
      });
    });

    it("should use default locale if not provided", () => {
      const result = formatCurrencyWithValue({
        value: 1234.56,
        currencyCode: "USD",
      });
      expect(result).toEqual({
        symbol: "$",
        value: 1234.56,
        position: "before",
      });
    });

    it("should handle Asian currencies correctly", () => {
      const result = formatCurrencyWithValue({
        value: 1234.56,
        currencyCode: "JPY",
        locale: "ja-JP",
      });
      expect(result).toEqual({
        symbol: "¥",
        value: 1234.56,
        position: "before",
      });
    });
  });
});
