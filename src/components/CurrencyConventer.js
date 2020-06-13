import React from "react"

class CurrencyConventer extends React.Component {
    constructor() {
        super()
        this.state = {
            amount: 1,
            from: "GBP",
            to: "USD",
            rates: [],
            currencies: [],
            exchangeRate: ' '
        }
        this.handleChange = this.handleChange.bind(this)
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

//get needed rates 
    componentDidUpdate() {
    
        fetch(`https://alt-exchange-rate.herokuapp.com/latest?base=${this.state.from}`)
        .then(response => response.json())
        .then(data => {
            this.setState({
              rates: data['rates'], 
              exchangeRate: data.rates[this.state.to]
            })
        })
}

    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value,
        }) 
    }

    render() {
    const {currencies, from, to, amount, exchangeRate} = this.state;

//display currencies 
    const currencyChoice = currencies.map(currency =>
        <option key={currency} value={currency}> {currency} </option>      
      );

            return (
                <div className="currency-box" id="currencyConventerPath">
                    <h3 className="heading">Currency Conventer</h3>

                    <p className="currencyBox"> 1 {from} is { (1 * exchangeRate).toFixed([2]) } {to}</p>

                    <form>
<div className="currencyBox">

<span className="title">Amount</span>
              <input 
                        name="amount" 
                        type="number"
                        value={amount} 
                        onChange={this.handleChange} 
                        placeholder="AMOUNT" 
                    />
</div>


<div className="currencyBox">

<span className="title">From:</span>
         <select  value={from} onChange={this.handleChange} name="from">
            {currencyChoice}
            <option>{from}</option>
          </select>

<span className="title">To:</span>
       <select value={to} onChange={this.handleChange} name="to">
            {currencyChoice}
            <option>{to}</option>
          </select>

</div>

            </form>

<div className="currencyBox">

                <p>{amount} {from} is { (amount * exchangeRate).toFixed([2])} {to}</p> 

</div>

                </div>
            )
    }
}

    export default CurrencyConventer    



