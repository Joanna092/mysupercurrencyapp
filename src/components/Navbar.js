import React from "react"
import money_image from '../money.svg'

function Navbar () {

return (
    <div>
    
<nav className="navbar navbar-expand-lg navbar-dark nav-background fixed-top">
    <div className="d-flex flex-grow-1">
        <span className="w-100 d-lg-none d-block"></span>
        <a class="navbar-brand d-none d-lg-inline-block" href="#">
        <img className="logo" src={money_image} alt="logo"></img>THE BANKER
        </a>
        <a className="navbar-brand-two mx-auto d-lg-none d-inline-block" href="#">
          <img className="logo" src={money_image} alt="logo"></img>THE BANKER
        </a>
        <div class="w-100 text-right">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
    </div>
    <div class="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
        <ul class="navbar-nav ml-auto flex-nowrap">
            <li class="nav-item">
                <a href="#currencyConventer" className="nav-link m-2 menu-item nav-active">Currency Conventer</a>
            </li>
            <li class="nav-item">
                <a href="#exchangeRates" class="nav-link m-2 menu-item">Exchange Rates</a>
            </li>
            <li class="nav-item">
                <a href="#historicalExchange" class="nav-link m-2 menu-item">Historical Exchange</a>
            </li>
        </ul>
    </div>
</nav>



             
        </div>
)

}

export default Navbar