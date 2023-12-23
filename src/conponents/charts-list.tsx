import React, { useContext } from 'react'
import { ICoinCandlesStat } from '../types/models'
import { Box, Typography } from '@mui/material'
import { AppContext } from '../store/context'
import ChartItem from './chart-item/chart-item'

interface IProps {
  candlesList: ICoinCandlesStat[]
}

const ChartsList: React.FC<IProps> = ({ candlesList }) => {
  const { isLoading } = useContext(AppContext)

  const styles = {
    marginTop: 140,
    color: '#979696',
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
      {candlesList.length === 0 ? (
        <Typography style={styles}>Монет не нашлось</Typography>
      ) : (
        candlesList.map((item, index) => {
          return (
            <ChartItem key={item.result.symbol} item={item} index={index} />
          )
        })
      )}
    </Box>
  )
}

export default ChartsList
