export const countryMetaData: {
  [key: string]: {
    symbol: string;
    locale: string;
    currency: string;
    format: string;
    length: number;
    minLength: number;
    maxLength: number;
    region: number;
    code: number;
    country: string;
    countryCode: string;
  };
} = {
  "1": {
    symbol: "\u0024",
    locale: "en-US",
    currency: "USD",
    format: "##-####-####",
    length: 10,
    minLength: 10,
    maxLength: 10,
    region: 3200,
    code: 1,
    country: "USA",
    countryCode: "US",
  },
  "971": {
    symbol: "\u20B9",
    locale: "ar-AE",
    currency: "AED",
    format: "##-###-#####",
    length: 10,
    minLength: 9,
    maxLength: 12,
    region: 3100,
    code: 971,
    country: "UAE",
    countryCode: "AE",
  },
  "91": {
    symbol: "AED",
    locale: "en-IN",
    currency: "INR",
    format: "#####-#####",
    length: 10,
    minLength: 10,
    maxLength: 10,
    region: 3300,
    code: 91,
    country: "India",
    countryCode: "IN",
  },
};

export const formatCurrency = (
  value: number | string | undefined,
  info: { userTyping: boolean; input: string },
  countryCode: string | undefined
) => {
  if (!value || isNaN(Number(value))) return "";
  if (typeof value === "string") value = parseFloat(value);

  const locale = countryMetaData[countryCode || "1"].locale;
  const currency = countryMetaData[countryCode || "1"].currency;
  const hasDecimal = info.input.includes(".");
  const fractionDigits = hasDecimal ? 2 : 0;

  const formatter = new Intl.NumberFormat(locale, {
    style: "decimal",
    currency: currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });

  return formatter.format(value);
};

export const formatMobile = (
  number: string | number | undefined,
  info: { userTyping: boolean; input: string }
) => {
  const cleanedNumber = (number?.toString() ?? "").replace(/\D/g, "");
  const formattedNumber = cleanedNumber.replace(
    /^(\d{3})(\d{0,3})(\d{0,4})/,
    (match, p1, p2, p3) => {
      if (p2) {
        return `${p1}-${p2}${p3 ? `-${p3}` : ""}`;
      } else {
        return `${p1}${p3 ? `-${p3}` : ""}`;
      }
    }
  );

  return formattedNumber;
};
