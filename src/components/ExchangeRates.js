import React from "react"

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
    }

    //Get list of currencies
    componentDidMount() {
        fetch("https://api.exchangeratesapi.io/latest")
            .then(response => response.json())
            .then(data => {
              this.setState({
                currencies: Object.keys(data['rates']).sort() 
                })
            })
    }

    componentDidUpdate() {
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.baseCurrency}`)
        .then(response => response.json())
        .then(data => {
            console.log(data['rates'])
           // console.log(data.rates[this.state.baseCurrency])
            this.setState({
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
const currencyList = Object.entries(rates).map(([key,value])=>{
    return (
        <div>{key} : {value.toFixed([4])}</div>
    );
  })


return (
    <div className="exchange-box" id="exchangeRatesPath">
        <h3 className="heading">Exchange Rates</h3>

        <span className="chooseBaseCurrency">Choose base currency</span>
        <select  value={baseCurrency} onChange={this.handleChange} name="baseCurrency">
            {currencyChoice}
            <option>{baseCurrency}</option>
          </select>

<div className="currencyList">
          <p>{ currencyList }</p>
</div>
        </div>
)
}
}

export default ExchangeRates