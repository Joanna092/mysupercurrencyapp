import React from "react";
import ScrollableAnchor from "react-scrollable-anchor";

class CurrencyConventer extends React.Component {
  constructor() {
    super();
    this.state = {
      amount: " ",
      from: "GBP",
      to: "USD",
      rates: [],
      currencies: [],
      exchangeRate: " ",
      showResults: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  //Get list of currencies
  componentDidMount() {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          currencies: Object.keys(data["rates"]).sort(),
        });
      });
  }

  handleChange(event) {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?from=${this.state.from}`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          rates: data["rates"],
          exchangeRate: data.rates[this.state.to],
          showResults: true,
        });
      });

    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { currencies, from, to, amount, exchangeRate } = this.state;

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
          {this.state.showResults && amount !== " " ? (
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
                onChange={this.handleChange}
                placeholder="amount to exchange"
              />
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="col from">
                <span className="title1">From:</span>
                <select value={from} onChange={this.handleChange} name="from">
                  {currencyChoice}
                  <option>{from}</option>
                </select>
              </div>
              <div className="col">
                <span className="title2">To:</span>
                <select value={to} onChange={this.handleChange} name="to">
                  {currencyChoice}
                  <option>{to}</option>
                </select>
              </div>
            </div>
          </div>
        </form>
        {this.state.showResults && amount !== " " ? (
          <div className="result">
            <p>
              {amount} {from} is {(amount * exchangeRate).toFixed([3])} {to}
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default CurrencyConventer;
