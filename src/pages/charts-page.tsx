import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Box, Button, Stack } from '@mui/material'
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

  const [candlesToCheck, setCandlesToCheck] = useState(9)
  const [minProcToShow, setMinProcToShow] = useState(5)

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
    resCandlesData = withPercent.filter((i) => {
      if (minProcToShow === 0) {
        return true
      } else {
        return Math.abs(i.custom!.differencePercent) >= minProcToShow
      }
    })
  }

  useEffect(() => {
    if (!interval) return
    setCandlesToCheck(9)
    setMinProcToShow(5)
  }, [interval])

  return (
    <>
      <Box style={styles}>{isLoading && interval && <LoadingBackdrop />}</Box>
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
