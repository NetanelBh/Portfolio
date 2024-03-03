const ShekelSymbol = () => {
  const data = new Intl.NumberFormat("il-IL", {
    style: "currency",
    currency: "ILS",
  });

  const parts = data.formatToParts(1);
  const partsValues = parts.map(price => price.value);
  const symbol = partsValues[partsValues.length - 1];

  return symbol;
};

export default ShekelSymbol;
