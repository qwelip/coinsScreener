import { useContext } from 'react'
import { Typography } from '@mui/material'
import ChartsList from '../conponents/charts-list'
import Container from '@mui/material/Container'
import CircularProgress from '@mui/material/CircularProgress'
import { AppContext } from '../store/context'

const ChartsPage = () => {
  const { isLoading, candlesData } = useContext(AppContext)

  return (
    <Container maxWidth='lg'>
      <Typography align='center' variant='h3' gutterBottom>
        Candles charts
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <ChartsList candlesList={candlesData!} />
      )}
    </Container>
  )
}

export default ChartsPage
