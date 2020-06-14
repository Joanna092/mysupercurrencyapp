import React from "react"

function Navbar () {

return (
    <div>
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
  <a className="navbar-brand" href="#">THE BANKER</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div className="navbar-nav">
      <a href="#currencyConventer" className="nav-item nav-link">Currency Conventer<span class="sr-only">(current)</span></a>
      <a href='#exchangeRates' className="nav-item nav-link">Exchange Rates</a>
      <a href="#historicalExchange" className="nav-item nav-link">Historical Exchange</a>
    </div>
  </div>
</nav>
             
        </div>
)

}

export default Navbar