import React from "react"
import money_image from '../money.svg'
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar () {

    return (
        <div>
           <nav className="navbar navbar-expand-md navbar-dark nav-background fixed-top">
              <div className="d-flex flex-grow-1">
                 <span className="w-100 d-lg-none d-block"></span>
                 <a class="navbar-brand d-sm-inline-block" href="#">
                 <img className="logo" src={money_image} alt="logo"></img>THE BANKER
                 </a>
                 <div className="w-100 text-right">
                    <Dropdown>
                       <Dropdown.Toggle variant="primary" id="dropdown-basic" className="d-md-none">
                          MENU
                       </Dropdown.Toggle>
                       <Dropdown.Menu>
                          <Dropdown.Item href="#currencyConventer">Currency Converter</Dropdown.Item>
                          <Dropdown.Item href="#exchangeRates">Exchange Rates</Dropdown.Item>
                          <Dropdown.Item href="#historicalExchange">Historical Exchange"</Dropdown.Item>
                       </Dropdown.Menu>
                    </Dropdown>
                 </div>
              </div>
              <div className="collapse navbar-collapse flex-grow-1 text-right" id="myNavbar">
                 <ul className="navbar-nav ml-auto flex-nowrap">
                    <li className="nav-item">
                       <a href="#currencyConventer" className="nav-link m-2 menu-item nav-active">Currency Conventer</a>
                    </li>
                    <li className="nav-item">
                       <a href="#exchangeRates" className="nav-link m-2 menu-item">Exchange Rates</a>
                    </li>
                    <li className="nav-item">
                       <a href="#historicalExchange" className="nav-link m-2 menu-item">Historical Exchange</a>
                    </li>
                 </ul>
              </div>
           </nav>
        </div>
        )
        }
        export default Navbar