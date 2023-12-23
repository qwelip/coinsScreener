import { Paper, Box, Button, Typography, Skeleton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CandleChart from '../candle-chart'
import { ICoinCandlesStat } from '../../types/models'
import { useInView } from 'react-intersection-observer'

interface IProps {
  item: ICoinCandlesStat
  index: number
}

const ChartItem: React.FC<IProps> = ({ item, index }) => {
  const URL = 'https://www.bybit.com/trade/usdt/'
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  return (
    <Paper
      ref={ref}
      elevation={2}
      style={{ padding: 5, width: 300, height: 225 }}
    >
      {!inView ? (
        <Skeleton variant='rectangular' width={'100%'} height={'100%'} />
      ) : (
        <>
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Link to={`${URL}${item.result.symbol}`} target='_blank'>
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
        </>
      )}
    </Paper>
  )
}

export default ChartItem
