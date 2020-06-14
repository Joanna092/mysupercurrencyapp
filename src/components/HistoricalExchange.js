import React from "react"
import ScrollableAnchor from 'react-scrollable-anchor'
import image from '../image.png'

function HistoricalExchange () {

return (
    <div className="exchange-box border">
    <ScrollableAnchor id={'historicalExchange'}>
    <h3 className="heading">Historical Exchange</h3>
    </ScrollableAnchor>
    <img src={image} alt="currency graph"></img>
    </div>
)
}

export default HistoricalExchange