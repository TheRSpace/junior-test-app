const ToCurrency = (number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    signDisplay: "never",
    //maximumFractionDigits: 0,
    //useGrouping: false,
  });
  //console.log(formatter.format(number));
  return formatter.format(number); //.replace(/,/g, " ");
};

export default ToCurrency;
/**
 * {"locale":"de-DE","currency":"EUR"}
 * {"locale":"en-US","currency":"USD"}
 */
