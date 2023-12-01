import React, { useContext } from 'react'
import { ICoinCandlesStat } from '../types/models'
import CandleChart from './candle-chart'
import { Box, Button, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { AppContext } from '../store/context'

interface IProps {
  candlesList: ICoinCandlesStat[]
}

const ChartsList: React.FC<IProps> = ({ candlesList }) => {
  const { isLoading } = useContext(AppContext)

  if (isLoading) {
    return null
  }

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      {candlesList.map((item) => {
        return (
          <Paper key={item.result.symbol} elevation={2} style={{ padding: 5 }}>
            <Box
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
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
              <Typography
                style={{
                  paddingRight: 10,
                  fontWeight: 400,
                  color:
                    item.custom?.differencePercent &&
                    item.custom?.differencePercent > 0
                      ? 'green'
                      : 'red',
                }}
              >
                {item.custom?.differencePercent}
              </Typography>
            </Box>
            <CandleChart item={item} />
          </Paper>
        )
      })}
    </Box>
  )
}

export default ChartsList
