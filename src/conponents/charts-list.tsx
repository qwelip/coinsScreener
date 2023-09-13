import React from 'react'
import { ICoinCandlesStat } from '../types'
import CandleChart from './candle-chart'
import { Box, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

interface IProps {
  candlesList: ICoinCandlesStat[]
}

const ChartsList: React.FC<IProps> = ({ candlesList }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      {candlesList.map((item) => {
        return (
          <Box
            key={item.result.symbol}
            style={{ width: '320px', border: 'solid 1px black' }}
          >
            <Link
              to={`https://www.bybit.com/trade/usdt/${item.result.symbol}`}
              target='_blank'
            >
              <Button>
                <Typography style={{ paddingLeft: 10 }}>
                  {item.result.symbol}
                </Typography>
              </Button>
            </Link>
            <CandleChart item={item} />
          </Box>
        )
      })}
    </div>
  )
}

export default ChartsList
