import React from 'react';
import './App.css'
import Navbar from './components/Navbar'
import CurrencyConventer from './components/CurrencyConventer'
import ExchangeRates from './components/ExchangeRates'
import HistoricalExchange from './components/HistoricalExchange'
import Footer from './components/Footer'

function App() {
  return (
    <div>
      < Navbar />
      < CurrencyConventer />
      < ExchangeRates />
      < HistoricalExchange /> 
      < Footer /> 
   </div>
  )

}

export default App;