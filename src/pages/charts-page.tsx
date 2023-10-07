import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { Box, Typography, Button } from '@mui/material'
import ChartsList from '../conponents/charts-list'
import CircularProgress from '@mui/material/CircularProgress'
import { AppContext } from '../store/context'
import Filter from '../conponents/filter'
import { ICoinCandlesStat, Interval, SortDirection } from '../types'
import { getSortedPercentGrowCandlesStat } from '../utils/utils'

const ChartsPage = () => {
  let resCandlesData: ICoinCandlesStat[] | undefined
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
    console.log(val)
    setInterval(val)
  }

  if (!isFilter && !isLoading) {
    resCandlesData = candlesData
  }
  if (isFilter && !isLoading) {
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
        {isLoading && interval && <CircularProgress />}
      </Box>
      <Box style={styles}>
        <Button
          disabled={isLoading}
          variant={interval === '60' ? 'contained' : 'text'}
          size='small'
          onClick={() => changeInterval('60')}
        >
          1 час
        </Button>
        <Button
          disabled={isLoading}
          variant={interval === '240' ? 'contained' : 'text'}
          size='small'
          onClick={() => changeInterval('240')}
        >
          4 часа
        </Button>
        <Button
          disabled={isLoading}
          variant={interval === 'D' ? 'contained' : 'text'}
          size='small'
          onClick={() => changeInterval('D')}
        >
          24 часа
        </Button>
      </Box>
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
