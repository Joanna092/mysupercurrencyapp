import React, { useState, useEffect, useRef } from "react";
import ScrollableAnchor from "react-scrollable-anchor";
import Chart from "chart.js";

const HistoricalExchange = () => {
  const [baseAcronym, setBaseAcronym] = useState("GBP");
  const [quoteAcronym, setQuoteAcronym] = useState("JPY");
  const [currencies, setCurrencies] = useState([]);
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null); // Store the chart instance

  useEffect(() => {
    getRate(baseAcronym, quoteAcronym);
    getHistoricalRates(baseAcronym, quoteAcronym);

    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest`)
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates).sort());
      });

    return () => {
      // Cleanup on unmount
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [baseAcronym, quoteAcronym]);

  const changeBaseAcronym = (event) => {
    const newBaseAcronym = event.target.value;
    setBaseAcronym(newBaseAcronym);
    getRate(newBaseAcronym, quoteAcronym);
    getHistoricalRates(newBaseAcronym, quoteAcronym);
  };

  const changeQuoteAcronym = (event) => {
    const newQuoteAcronym = event.target.value;
    setQuoteAcronym(newQuoteAcronym);
    getRate(baseAcronym, newQuoteAcronym);
    getHistoricalRates(baseAcronym, newQuoteAcronym);
  };

  const getRate = (base, quote) => {
    setLoading(true);

    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?from=${base}&symbols=${quote}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        const rate = data.rates[quote];

        setRate(rate);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setLoading(false);
      });
  };

  const getHistoricalRates = (base, quote) => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const host = "api.frankfurter.app";
    fetch(`https://${host}/${startDate}..${endDate}?from=${base}&symbols=${quote}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map((rate) => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        buildChart(chartLabels, chartData, chartLabel);
      })
      .catch((error) => console.error(error.message));
  };

  const buildChart = (labels, data, label) => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: {
              maxTicksLimit: 8,
            },
          },
          x: {
            ticks: {
              maxTicksLimit: 10,
            },
          },
        },
      },
    });
  };

  const currencyChoice = currencies.map((currency) => (
    <option key={currency} value={currency}>
      {currency}
    </option>
  ));

  return (
    <div className="exchange-box border">
      <ScrollableAnchor id={"historicalExchange"}>
        <h3 className="heading">Historical Exchange</h3>
      </ScrollableAnchor>

      <div className="historical-exchange-choice">
        <div className="container">
          <div className="row">
            <div className="col from">
              <span className="title1">Base:</span>
              <select
                value={baseAcronym}
                onChange={changeBaseAcronym}
                name="baseAcronym"
              >
                {currencyChoice}
                <option>{baseAcronym}</option>
              </select>
            </div>
            <div className="col">
              <span className="title2">Quote:</span>
              <select
                value={quoteAcronym}
                onChange={changeQuoteAcronym}
                name="quoteAcronym"
              >
                {currencyChoice}
                <option>{quoteAcronym}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <canvas ref={chartRef} />
    </div>
  );
};

export default HistoricalExchange;
