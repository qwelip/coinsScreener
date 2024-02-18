import { useState, useEffect, useContext } from 'react'
import { ITicker24Data } from '../types/models'
import { DataContext } from '../store/data-context'
import { getDateTickerDataFetched, getStorageTickersData } from '../api/local-storage-api'
import { MsToNormalData } from '../common/common-data'
import { getTickersData } from '../services/tickers-api'

const useTickersInfo = () => {
  const { isLoading: isCandlesLoading } = useContext(DataContext)
  const dateFetched = getDateTickerDataFetched()
  const timePassed = Date.now() - dateFetched
  const isTimeToRefetch = timePassed >= MsToNormalData.oneHour
  const rowtickersData = getStorageTickersData()

  const [tickersData, setTickersData] = useState<ITicker24Data | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(() => {
    return rowtickersData ? false : true
  })

  useEffect(() => {
    if (rowtickersData && !isTimeToRefetch) {
      setIsLoading(false)
      const data = JSON.parse(rowtickersData || '') as ITicker24Data
      setTickersData(data)
    } else {
      setIsLoading(true)
      getTickersData()
        .then((res) => {
          setTickersData(res)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCandlesLoading])
  return { tickersData, isLoading }
}

export default useTickersInfo
