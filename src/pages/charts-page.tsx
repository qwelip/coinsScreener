import { useState } from 'react'
import { useContext } from 'react'
import { Box, Typography } from '@mui/material'
import ChartsList from '../conponents/charts-list'
import CircularProgress from '@mui/material/CircularProgress'
import { AppContext } from '../store/context'
import Filter from '../conponents/filter'
import { ICoinCandlesStat, SortDirection } from '../types'
import { getSortedPercentGrowCandlesStat } from '../utils/utils'

const ChartsPage = () => {
  let resCandlesData: ICoinCandlesStat[] | undefined
  const { isLoading, candlesData } = useContext(AppContext)

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

  return (
    <>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Typography style={{ marginRight: 30 }} align='center' variant='h3'>
          Candles charts
        </Typography>
        {isLoading && <CircularProgress />}
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
