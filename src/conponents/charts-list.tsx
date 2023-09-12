import React from 'react'
import { ICoinCandlesStat } from '../types'
import CandleChart from './candle-chart'
import { Typography } from '@mui/material'

interface IProps {
  candlesList: ICoinCandlesStat[]
}

const ChartsList: React.FC<IProps> = ({ candlesList }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {candlesList.map((item) => {
        return (
          <div style={{ width: '320px', border: 'solid 1px black' }}>
            <Typography style={{ paddingLeft: 10 }}>
              {item.result.symbol}
            </Typography>
            <CandleChart item={item} />
          </div>
        )
      })}
    </div>
  )
}

export default ChartsList
