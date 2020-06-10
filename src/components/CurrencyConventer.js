import React from "react"

class CurrencyConventer extends React.Component {
    constructor() {
        super()
        this.state = {
            amount: "",
            from: "",
            to: "",
        }
        this.handleChange = this.handleChange.bind(this)
    }
    
    handleChange(event) {
        const {name, value} = event.target
        this.setState({
            [name]: value
        }) 
    }

    render() {
            return (
                <div className="currency-box">
                    <h3 className="heading">CurrencyConventer</h3>
                    <form>

              <input 
                        name="amount" 
                        value={this.state.amount} 
                        onChange={this.handleChange} 
                        placeholder="AMOUNT" 
                    />


                    <select 
                        value={this.state.from} 
                        name="from" 
                        onChange={this.handleChange}
                    >
                        <option value="">-- FROM --</option>
                        <option value="USD">USD (US$)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="AUD">AUD (A$)</option>
                        <option value="CAD">CAD (C$)</option>
                        <option value="CHF">CHF (CHF)</option>
                        <option value="CNY">CNY (元)</option>
                        <option value="HKD">HKD (HK$)</option>
                        <option value="NZD">NZD (NZ$)</option>
                        <option value="SEK">SEK (kr)</option>
                        <option value="KRW">KRW (₩)</option>
                        <option value="SGD">SGD (S$)</option>
                        <option value="NOK">NOK (kr)</option>
                        <option value="MXD">MXN ($)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="RUB">RUB (₽)</option>
                        <option value="ZAR">ZAR (R)</option>
                        <option value="TRY">TRY (₺)</option>
                        <option value="BRL">BRL (R$)</option>
                        <option value="TWD">TWD (NT$)</option>
                        <option value="DKK">DKK (kr)</option>
                        <option value="PLN">PLN (zł)</option>
                    </select>


                    <select 
                        value={this.state.to} 
                        name="to" 
                        onChange={this.handleChange}
                    >
                        <option value="">-- TO --</option>
                        <option value="USD">USD (US$)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="JPY">JPY (¥)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="AUD">AUD (A$)</option>
                        <option value="CAD">CAD (C$)</option>
                        <option value="CHF">CHF (CHF)</option>
                        <option value="CNY">CNY (元)</option>
                        <option value="HKD">HKD (HK$)</option>
                        <option value="NZD">NZD (NZ$)</option>
                        <option value="SEK">SEK (kr)</option>
                        <option value="KRW">KRW (₩)</option>
                        <option value="SGD">SGD (S$)</option>
                        <option value="NOK">NOK (kr)</option>
                        <option value="MXD">MXN ($)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="RUB">RUB (₽)</option>
                        <option value="ZAR">ZAR (R)</option>
                        <option value="TRY">TRY (₺)</option>
                        <option value="BRL">BRL (R$)</option>
                        <option value="TWD">TWD (NT$)</option>
                        <option value="DKK">DKK (kr)</option>
                        <option value="PLN">PLN (zł)</option>
                    </select>

            </form>

                <p>Amount: {this.state.amount}</p>
                <p>From: {this.state.from}</p>
                <p>To: {this.state.to}</p>


                </div>
            )
    }
}

    export default CurrencyConventer    



