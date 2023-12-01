import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import ChartsList from '../conponents/charts-list'
import { AppContext } from '../store/context'
import Filter from '../conponents/filter'
import { ICoinCandlesStat, Interval } from '../types/models'
import {
  getIntervalTitle,
  getSortedPercentGrowCandlesStat,
} from '../utils/utils'
import { timeIntervals } from '../common/common-data'
import LoadingBackdrop from '../common/loading-backdrop'

const ChartsPage = () => {
  let resCandlesData: ICoinCandlesStat[] | undefined = []
  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  }
  const { isLoading, candlesData, interval, setInterval } =
    useContext(AppContext)

  const [candlesToCheck, setCandlesToCheck] = useState(7)
  const [minProcToShow, setMinProcToShow] = useState(15)

  const handleCandlesToCheck = (val: number) => {
    setCandlesToCheck(val)
  }

  const changeInterval = (val: Interval) => {
    setInterval(val)
  }
  if (!isLoading) {
    resCandlesData = candlesData
  }
  if (!isLoading && candlesData && candlesData.length > 0) {
    const withPercent = getSortedPercentGrowCandlesStat(
      candlesData,
      candlesToCheck
    )
    resCandlesData = withPercent.filter(
      (i) => Math.abs(i.custom!.differencePercent) >= minProcToShow
    )
  }

  useEffect(() => {
    if (!interval) return

    switch (interval) {
      case '15': {
        setCandlesToCheck(9)
        setMinProcToShow(3)
        break
      }
      case '30': {
        setCandlesToCheck(9)
        setMinProcToShow(5)
        break
      }
      case '60': {
        setCandlesToCheck(9)
        setMinProcToShow(5)
        break
      }
      case '240': {
        setCandlesToCheck(9)
        setMinProcToShow(10)
        break
      }
      case 'D': {
        setCandlesToCheck(9)
        setMinProcToShow(10)
        break
      }
      default:
        break
    }
  }, [interval])

  return (
    <>
      <Box style={styles}>
        <Typography style={{ marginRight: 30 }} align='center' variant='h3'>
          Candles charts
        </Typography>
        {isLoading && interval && <LoadingBackdrop />}
      </Box>
      <Filter
        candlesToCheck={candlesToCheck}
        minProcToShow={minProcToShow}
        handleCandlesToCheck={handleCandlesToCheck}
        setMinProcToShow={setMinProcToShow}
      >
        <Stack spacing={2} direction='row' justifyContent={'center'}>
          {timeIntervals.map((item) => {
            return (
              <Button
                disabled={isLoading}
                variant={interval === item ? 'contained' : 'text'}
                size='small'
                onClick={() => changeInterval(item)}
              >
                {getIntervalTitle(item)}
              </Button>
            )
          })}
        </Stack>
      </Filter>
      <ChartsList candlesList={resCandlesData!} />
    </>
  )
}

export default ChartsPage
