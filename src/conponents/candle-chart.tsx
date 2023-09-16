import React from 'react'
import Chart from 'react-apexcharts'
import { ICoinCandlesStat } from '../types'
import { getOHLCdata } from '../utils/utils'

interface IProps {
  item: ICoinCandlesStat
}

const CandleChart: React.FC<IProps> = ({ item }) => {
  return (
    <Chart
      width='300'
      type='candlestick'
      options={{
        tooltip: { enabled: false },
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
