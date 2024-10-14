import React, { useState, useEffect } from "react";
import ScrollableAnchor from "react-scrollable-anchor";

const ExchangeRates = () => {
  const [baseCurrency, setBaseCurrency] = useState("GBP");
  const [rates, setRates] = useState({});
  const [currencies, setCurrencies] = useState([]);

  // Fetch the list of currencies and rates when the component mounts
  useEffect(() => {
    const host = "api.frankfurter.app";

    fetch(`https://${host}/latest`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data["rates"]).sort());
        setRates(data["rates"]);
      })
      .catch((error) => console.error("Error fetching rates:", error));
  }, []); // Empty dependency array ensures this runs only once

  // Handle base currency change
  const handleChange = (event) => {
    const selectedCurrency = event.target.value;
    setBaseCurrency(selectedCurrency);
  };

  // Render the list of currency options
  const currencyChoice = currencies.map((currency) => (
    <option key={currency} value={currency}>
      {currency}
    </option>
  ));

  // Render the list of rates based on the selected base currency
  const currencyList = Object.entries(rates).map(([currency, rate]) => (
    <div key={currency}>
      {currency}: {(rate / rates[baseCurrency]).toFixed(4)} {/* Converting to selected baseCurrency */}
    </div>
  ));

  return (
    <div className="exchange-box border">
      <ScrollableAnchor id={"exchangeRates"}>
        <h3 className="heading">Exchange Rates</h3>
      </ScrollableAnchor>
      <div className="choose-currency-box">
        <span className="chooseBaseCurrency">Choose base currency:</span>
        <select
          value={baseCurrency}
          onChange={handleChange}
          name="baseCurrency"
        >
          {currencyChoice}
        </select>
      </div>
      <div className="currencyList">
        {currencyList.length > 0 ? currencyList : <p>Loading rates...</p>}
      </div>
    </div>
  );
};

export default ExchangeRates;
