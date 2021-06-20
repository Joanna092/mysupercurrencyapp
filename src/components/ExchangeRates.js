import React from "react"
import ScrollableAnchor from 'react-scrollable-anchor'


class ExchangeRates extends React.Component {

    constructor() {
        super()
        this.state = {
            amount: 1,
            baseCurrency: "GBP",
            rates: [],
            currencies: []
        }
        this.handleChange = this.handleChange.bind(this)
    }


handleChange(event) {

const {name, value} = event.target
        this.setState({
            [name]: value,
        })

  const host = 'api.frankfurter.app';

    fetch(`https://${host}/latest?from=${event.target.value}`)
        .then(response => response.json())
        .then(data => {
            console.log(data['rates'])
            this.setState({
              currencies: Object.keys(data['rates']).sort(),
              rates: data['rates']
            })
        })

    }

    //Get list of currencies for base currency


    componentDidMount() {
        const host = 'api.frankfurter.app';
      //  fetch("http://api.exchangeratesapi.io/v1/latest?access_key=ec3a82f943f832429a65a3a0f4f553db?base=GBP")
      fetch(`https://${host}/latest`)
            .then(response => response.json())
            .then(data => {
              this.setState({
                currencies: Object.keys(data['rates']).sort(),
                rates: data['rates']
                })
            })
    }


render () {

const {baseCurrency, currencies, rates } = this.state;

//display currencies in a dropdown
const currencyChoice = currencies.map(currency =>
    <option key={currency} value={currency}> {currency} </option>
  );

//display rates and currencies
const currencyList = Object.entries(rates).map(([key,value]) =>{
    return (
        <div>{key} : {value.toFixed([4])}</div>
    );
  })


  return (
    <div className="exchange-box border">
       <ScrollableAnchor id={'exchangeRates'}>
          <h3 className="heading">Exchange Rates</h3>
       </ScrollableAnchor>
       <div className="choose-currency-box">
          <span className="chooseBaseCurrency">Choose base currency:</span>
          <select  value={baseCurrency} onChange={this.handleChange} name="baseCurrency">
             {currencyChoice}
             <option>{baseCurrency}</option>
          </select>

       </div>
       <div className="currencyList">
          <p>{ currencyList }</p>
       </div>
    </div>
    )
   }
  }

  export default ExchangeRates
