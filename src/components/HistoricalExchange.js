import React from "react"
import ScrollableAnchor from 'react-scrollable-anchor'
import Chart from 'chart.js';

class HistoricalExchange extends React.Component {

    constructor() {
        super()
        this.state = {
        baseAcronym: 'GBP',
        quoteAcronym: 'JPY',
        currencies: []
        }
        this.chartRef = React.createRef();
    }

    componentDidMount() {
      const { baseAcronym, quoteAcronym } = this.state;
      this.getRate(baseAcronym, quoteAcronym);
      this.getHistoricalRates(baseAcronym, quoteAcronym);

      const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest`)
  //    fetch("http://api.exchangeratesapi.io/v1/latest?access_key=ec3a82f943f832429a65a3a0f4f553db")
          .then(response => response.json())
          .then(data => {
            this.setState({
              currencies: Object.keys(data['rates']).sort()
              })
          })
      }

      changeBaseAcronym = (event) => {
        const baseAcronym = event.target.value;
        this.setState({ baseAcronym });
        this.getRate(baseAcronym, this.state.quoteAcronym);
        this.getHistoricalRates(baseAcronym, this.state.quoteAcronym);
      }

      changeQuoteAcronym = (event) => {
        const quoteAcronym = event.target.value;
        this.setState({ quoteAcronym });
        this.getRate(this.state.baseAcronym, quoteAcronym);
        this.getHistoricalRates(this.state.baseAcronym, quoteAcronym);
      }


    getRate = (base, quote) => {
      this.setState({ loading: true });

      const host = 'api.frankfurter.app';
        fetch(`https://${host}/latest?from=${base}&symbols=${quote}`)

  //    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=ec3a82f943f832429a65a3a0f4f553db?base=${base}&symbols=${quote}`)
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            throw new Error(data.error);
          }

          const rate = data.rates[quote];

          this.setState({
            rate,
            baseValue: 1,
            quoteValue: Number((1 * rate).toFixed(3)),
            loading: false,
          });
        })
        .catch(error => console.error(error.message));
    }


    getHistoricalRates = (base, quote) => {
        const endDate = new Date().toISOString().split('T')[0];
        const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
        const host = 'api.frankfurter.app';
      //  fetch(`https://alt-exchange-rate.herokuapp.com/history?start_at=${startDate}&end_at=${endDate}&base=${base}&symbols=${quote}`)
      fetch(`https://${host}/${startDate}..${endDate}?from=${base}&symbols=${quote}`)

          .then(response => response.json())
          .then(data => {
            if (data.error) {
              throw new Error(data.error);
            }
            const chartLabels = Object.keys(data.rates);
            const chartData = Object.values(data.rates).map(rate => rate[quote]);
            const chartLabel = `${base}/${quote}`;
            this.buildChart(chartLabels, chartData, chartLabel);
          })
          .catch(error => console.error(error.message));
      }

      buildChart = (labels, data, label) => {
        const chartRef = this.chartRef.current.getContext("2d");

        if (typeof this.chart !== "undefined") {
          this.chart.destroy();
        }
        this.chart = new Chart(this.chartRef.current.getContext("2d"), {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: label,
                data,
                fill: false,
                tension: 0,
              }
            ]
          },
          options: {
            responsive: true,
            scales:
      {
          yAxes: [{
              ticks:{
               maxTicksLimit: 8
              }

          }],
          xAxes: [{
            ticks:{
             maxTicksLimit: 10
            }
        }]
      }
          }
        })
      }

    render () {
      const {baseAcronym, quoteAcronym, currencies} = this.state;

      //display currencies
      const currencyChoice = currencies.map(currency =>
        <option key={currency} value={currency}> {currency} </option>
        );

return (
    <div className="exchange-box border">
    <ScrollableAnchor id={'historicalExchange'}>
    <h3 className="heading">Historical Exchange</h3>
    </ScrollableAnchor>

    <div className="historical-exchange-choice">
    <div className="container">
                    <div className="row">
                       <div className="col from">
                          <span className="title1">Base:</span>
                          <select  value={baseAcronym} onChange={this.changeBaseAcronym} name="baseAcronym">
                             {currencyChoice}
                             <option>{baseAcronym}</option>
                          </select>
                       </div>
                       <div className="col">
                          <span className="title2">Quote:</span>
                          <select value={quoteAcronym} onChange={this.changeQuoteAcronym} name="quoteAcronym">
                             {currencyChoice}
                             <option>{quoteAcronym}</option>
                          </select>
                       </div>
                    </div>
                 </div>
                 </div>

    <canvas ref={this.chartRef} />

    </div>
   )
  }
}

export default HistoricalExchange
