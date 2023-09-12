import React from 'react'
import Chart from 'react-apexcharts'
import { ICoinCandlesStat } from '../types'
import { getOHLCdata } from '../utilz'

interface IProps {
  item: ICoinCandlesStat
}

const CandleChart: React.FC<IProps> = ({ item }) => {
  return (
    <Chart
      key={item.result.symbol}
      width='300'
      type='candlestick'
      options={{
        chart: {
          id: item.result.symbol,
          sparkline: { enabled: true },
          animations: { enabled: false },
        },
      }}
      series={[{ data: getOHLCdata(item.result.list) }]}
    />
  )
}

export default CandleChart
