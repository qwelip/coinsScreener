import React, { useContext } from 'react'
import { ICoinCandlesStat } from '../types/models'
import { Box } from '@mui/material'
import { AppContext } from '../store/context'
import ChartItem from './chart-item/chart-item'

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
      {candlesList.map((item, index) => {
        return <ChartItem key={item.result.symbol} item={item} index={index} />
      })}
    </Box>
  )
}

export default ChartsList
