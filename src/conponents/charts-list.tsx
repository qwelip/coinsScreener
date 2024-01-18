import React, { useContext } from 'react'
import { ICoinCandlesStat } from '../types/models'
import { Box, Typography } from '@mui/material'
import { DataContext } from '../store/data-context'
import ChartItem from './chart-item/chart-item'

interface IProps {
  candlesList: ICoinCandlesStat[]
}

const ChartsList: React.FC<IProps> = ({ candlesList }) => {
  const { isLoading } = useContext(DataContext)

  const styles = {
    marginTop: 140,
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
        <Typography mt={140} color={'secondary'} style={styles}>
          Монет не нашлось
        </Typography>
      ) : (
        candlesList.map((item, index) => {
          return <ChartItem key={item.result.symbol} item={item} index={index} />
        })
      )}
    </Box>
  )
}

export default ChartsList
