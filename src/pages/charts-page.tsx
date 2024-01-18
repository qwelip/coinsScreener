import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Button, Stack, Typography } from '@mui/material'
import ChartsList from '../conponents/charts-list'
import { DataContext } from '../store/data-context'
import Filter from '../conponents/filter'
import { ICoinCandlesStat, Interval } from '../types/models'
import { getIntervalTitle, getSortedPercentGrowCandlesStat } from '../utils/utils'
import { timeIntervals } from '../common/common-data'
import LoadingBackdrop from '../common/loading-backdrop'

const ChartsPage = () => {
  let resCandlesData: ICoinCandlesStat[] | undefined = []
  const { isLoading, candlesData, interval, setInterval } = useContext(DataContext)

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
    const withPercent = getSortedPercentGrowCandlesStat(candlesData, candlesToCheck)
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
    setCandlesToCheck(0)
    setMinProcToShow(1)
  }, [interval])

  return (
    <>
      {isLoading && interval && <LoadingBackdrop />}
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
                key={item}
                disabled={isLoading}
                variant={interval === item ? 'contained' : 'text'}
                size='small'
                onClick={() => changeInterval(item)}
              >
                <Typography noWrap variant='caption'>
                  {getIntervalTitle(item)}
                </Typography>
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
