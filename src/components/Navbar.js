import React from "react"
import { HashLink as Link } from 'react-router-hash-link';

function Navbar () {

const navStyle = {
  color: 'rgba(0, 0, 0, 0.5)',
  textDecoration: 'unset'
}

return (
    <div>
        
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
  <a className="navbar-brand" href="#">THE BANKER</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a className="nav-item nav-link"><Link style={navStyle} to='/CurrencyConventer#currencyConventerPath' >Currency Conventer</Link><span class="sr-only">(current)</span></a>
      <a className="nav-item nav-link"><Link style={navStyle} to="/ExchangeRates#exchangeRatesPath">Exchange Rates</Link></a>
      <a className="nav-item nav-link"><Link style={navStyle} to='/HistoricalExchange#historicalExchangePath'>Historical Exchange</Link></a>
    </div>
  </div>
</nav>
             
        </div>
)

}

export default Navbar