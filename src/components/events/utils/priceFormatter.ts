export type PriceFormatterConfig = {
  /** Currency symbol like € */
  symbol: string;
  /** ISO local for Intl */
  locale: string;
  /** ISO-4217 currency code for Intl, like 'EUR'. https://en.wikipedia.org/wiki/ISO_4217#List_of_ISO_4217_currency_codes */
  code: string;
};

export class PriceFormatter {
  private readonly pricePresentationalMultiplier = 100; // internal prices are in cents
  private readonly locale: PriceFormatterConfig["locale"] = "";
  private readonly code: PriceFormatterConfig["code"] = "";
  private readonly symbol: PriceFormatterConfig["symbol"] = "";

  constructor({ locale, code, symbol }: PriceFormatterConfig) {
    // set the currency info
    this.symbol = symbol;
    this.locale = locale;
    this.code = code;
  }

  /**
   * Formats the price to the local currency
   * @param price Price to be formatted
   * @param asCurrency Default `false`. If true, the currency symbol will be added
   * @param decimalPlaces Default `2`. Number accuracy
   * @returns A Intl formatted number or currency. Note: containes special whitespace chars!
   */
  toFormatted(price: number, asCurrency = false, decimalPlaces = 2): string {
    let formatterConfig = {};
    if (asCurrency) {
      formatterConfig = {
        style: "currency",
        currency: this.code,
      };
    }
    const formatter = new Intl.NumberFormat(this.locale, {
      ...formatterConfig,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    const divided = price / this.pricePresentationalMultiplier;
    return formatter.format(divided);
  }
}
