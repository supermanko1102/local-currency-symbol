import { getCurrencyPosition } from "../positions";

describe("Currency Position Tests", () => {
  describe("EUR special cases", () => {
    it("should position EUR before for Irish English", () => {
      expect(getCurrencyPosition("en-IE", "EUR")).toBe("before");
    });

    it("should position EUR after for French", () => {
      expect(getCurrencyPosition("fr-FR", "EUR")).toBe("after");
    });
  });

  describe("Asian currencies", () => {
    it("should position JPY before for Japanese locale", () => {
      expect(getCurrencyPosition("ja-JP", "JPY")).toBe("before");
    });

    it("should position CNY before for Chinese locale", () => {
      expect(getCurrencyPosition("zh-CN", "CNY")).toBe("before");
    });
  });

  describe("European currencies", () => {
    it("should position SEK after for Swedish locale", () => {
      expect(getCurrencyPosition("sv-SE", "SEK")).toBe("after");
    });

    it("should position NOK after for Norwegian locale", () => {
      expect(getCurrencyPosition("nb-NO", "NOK")).toBe("after");
    });
  });

  describe("Default behavior", () => {
    it("should default to before for unknown currency/locale combinations", () => {
      expect(getCurrencyPosition("xx-XX", "XXX")).toBe("before");
    });
  });
});
