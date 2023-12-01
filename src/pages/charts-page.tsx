import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'
import ChartsList from '../conponents/charts-list'
import { AppContext } from '../store/context'
import Filter from '../conponents/filter'
import { ICoinCandlesStat, Interval, SortDirection } from '../types/models'
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

  const [isFilter, setIsFilter] = useState(true)
  const [candlesToCheck, setCandlesToCheck] = useState(7)
  const [minProcToShow, setMinProcToShow] = useState(15)
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.desc
  )
  const [isFirstCandleCheck, setIsFirstCandleCheck] = useState(true)

  const handleFilter = () => {
    setIsFilter(!isFilter)
  }

  const handleCandlesToCheck = (val: number) => {
    setCandlesToCheck(val)
  }

  const handleSortDirection = (val: SortDirection) => {
    setSortDirection(val)
  }

  const changeInterval = (val: Interval) => {
    setInterval(val)
  }
  if (!isFilter && !isLoading) {
    resCandlesData = candlesData
  }
  if (isFilter && !isLoading && candlesData && candlesData.length > 0) {
    const withPercent = getSortedPercentGrowCandlesStat(
      candlesData!,
      candlesToCheck,
      sortDirection,
      isFirstCandleCheck
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
      <Filter
        isFilter={isFilter}
        candlesToCheck={candlesToCheck}
        sortDirection={sortDirection}
        minProcToShow={minProcToShow}
        isFirstCandleCheck={isFirstCandleCheck}
        handleFilter={handleFilter}
        handleCandlesToCheck={handleCandlesToCheck}
        handleSortDirection={handleSortDirection}
        setMinProcToShow={setMinProcToShow}
        setIsFirstCandleCheck={setIsFirstCandleCheck}
      />
      <ChartsList candlesList={resCandlesData!} />
    </>
  )
}

export default ChartsPage
