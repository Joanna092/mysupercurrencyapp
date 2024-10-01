import React, {useState, useEffect} from "react";
import ScrollableAnchor from "react-scrollable-anchor";

const CurrencyConventer = () => {

  const [amount, setAmount] = useState(" ");
  const [from, setFrom] = useState("GBP");
  const [to, setTo] = useState("USD");
  const [rates, setRates] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(" ");
  const [showResults, setShowResults] = useState(false);

//Get list of currencies 

useEffect(() => {
  const host = "api.frankfurter.app";
  fetch(`https://${host}/latest`)
    .then((response) => response.json())
    .then((data) => {
      setCurrencies(Object.keys(data["rates"]).sort());
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, []);

   // Fetch exchange rates when `from` or `to` changes
   useEffect(() => {
    if (from && to) {
      const host = "api.frankfurter.app";
      fetch(`https://${host}/latest?from=${from}`)
        .then((response) => response.json())
        .then((data) => {
          setRates(data["rates"]);
          setExchangeRate(data.rates[to]);
          setShowResults(true);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [from, to]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "from") {
      setFrom(value);
    } else if (name === "to") {
      setTo(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  };


    //display currencies
    const currencyChoice = currencies.map((currency) => (
      <option key={currency} value={currency}>
        {" "}
        {currency}{" "}
      </option>
    ));

    return (
      <div className="currency-box border">
        <ScrollableAnchor id={"currencyConventer"}>
          <h3 className="heading">Currency Conventer</h3>
        </ScrollableAnchor>
        <div className="currencyRate">
          {showResults && amount !== " " ? (
            <p>
              {" "}
              1 {from} = {(1 * exchangeRate).toFixed([3])} {to}
            </p>
          ) : null}
        </div>
        <form>
          <div className="currency-input-box">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">
                  Amount
                </span>
              </div>
              <input
                type="number"
                className="form-control"
                name="amount"
                id="amount"
                value={amount}
                onChange={handleChange}
                placeholder="amount to exchange"
              />
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col from">
                <span className="title1">From:</span>
                <select value={from} onChange={handleChange} name="from">
                  {currencyChoice}
                  <option>{from}</option>
                </select>
              </div>
              <div className="col">
                <span className="title2">To:</span>
                <select value={to} onChange={handleChange} name="to">
                  {currencyChoice}
                  <option>{to}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        {showResults && amount !== " " ? (
          <div className="result">
            <p>
              {amount} {from} is {(amount * exchangeRate).toFixed([3])} {to}
            </p>
          </div>
        ) : null}
      </div>
    );
  }


export default CurrencyConventer;
