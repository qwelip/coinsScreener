import { Paper, Box, Button, Typography, Skeleton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import CandleChart from '../candle-chart'
import { ICoinCandlesStat } from '../../types/models'
import { useInView } from 'react-intersection-observer'
import StraightIcon from '@mui/icons-material/Straight'
import SouthIcon from '@mui/icons-material/South'

interface IProps {
  item: ICoinCandlesStat
  index: number
  tradeVolume: number
}

const ChartItem: React.FC<IProps> = ({ item, tradeVolume }) => {
  const URL = 'https://www.bybit.com/trade/usdt/'
  const isGrow = item.custom?.differencePercent && item.custom?.differencePercent > 0
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  })

  return (
    <Paper ref={ref} elevation={2} style={{ padding: 5, width: 300, height: 225 }}>
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
                <Typography style={{ paddingLeft: 10 }}>{item.result.symbol}</Typography>
              </Button>
            </Link>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <Typography
                style={{ fontSize: 12, marginRight: 10 }}
              >{`${tradeVolume}M $`}</Typography>
              <Typography
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  paddingRight: 10,
                  fontWeight: 400,
                  color: isGrow ? 'green' : 'red',
                  fontSize: 12,
                }}
              >
                {isGrow ? <StraightIcon fontSize='inherit' /> : <SouthIcon fontSize='inherit' />}
                {`${item.custom?.differencePercent}%`}
              </Typography>
            </Box>
          </Box>
          <CandleChart item={item} />
        </>
      )}
    </Paper>
  )
}

export default ChartItem
