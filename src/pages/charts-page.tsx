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

  const [isFilter, setIsFilter] = useState(false)
  const [candlesToCheck, setCandlesToCheck] = useState(4)
  const [minProcToShow, setMinProcToShow] = useState(10)
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    SortDirection.desc
  )

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
      sortDirection
    )
    resCandlesData = withPercent.filter(
      (i) => i.custom!.differencePercent >= minProcToShow
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
        handleFilter={handleFilter}
        handleCandlesToCheck={handleCandlesToCheck}
        handleSortDirection={handleSortDirection}
        setMinProcToShow={setMinProcToShow}
      />
      {!isFilter && <ChartsList candlesList={resCandlesData!} />}
      {isFilter && <ChartsList candlesList={resCandlesData!} />}
    </>
  )
}

export default ChartsPage
