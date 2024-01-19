import React, { useContext } from 'react'
import { ICoinCandlesStat, ITicker24Data } from '../types/models'
import { Box, Typography } from '@mui/material'
import { DataContext } from '../store/data-context'
import ChartItem from './chart-item/chart-item'
import { getStorageTickersData } from '../api/local-storage-api'

interface IProps {
  candlesList: ICoinCandlesStat[]
}

const ChartsList: React.FC<IProps> = ({ candlesList }) => {
  const rowTickersData = getStorageTickersData()
  const tickersData = JSON.parse(rowTickersData!) as ITicker24Data

  const { isLoading } = useContext(DataContext)

  const getTradeVolume = (item: ICoinCandlesStat): number => {
    const coinName = item.result.symbol
    const tradeVolume = tickersData.result.list.find((i) => i.symbol === coinName)!.turnover24h
    return Math.floor(Math.floor(Number(tradeVolume)) / 1000000)
  }

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
        height: 'calc(100% - 120px)',
      }}
    >
      {candlesList.length === 0 && isLoading !== undefined ? (
        <Typography mt={140} color={'secondary'} style={{ marginTop: 140 }}>
          Монет не нашлось
        </Typography>
      ) : (
        candlesList.map((item, index) => {
          return (
            <ChartItem
              key={item.result.symbol}
              item={item}
              index={index}
              tradeVolume={getTradeVolume(item)}
            />
          )
        })
      )}
    </Box>
  )
}

export default ChartsList
