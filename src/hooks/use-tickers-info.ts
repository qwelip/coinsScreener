import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { getTickersRequestConfig } from '../api/api'
import { ITicker24Data } from '../types/models'
import { DataContext } from '../store/data-context'
import {
  getDateTickerDataFetched,
  getStorageTickersData,
  updateFetchedTickerTime,
} from '../api/local-storage-api'
import { MsToNormalData } from '../common/common-data'

const useTickersInfo = () => {
  const { isLoading: isCandlesLoading } = useContext(DataContext)
  const category = 'linear'
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
      axios<ITicker24Data>(getTickersRequestConfig(category))
        .then((response) => {
          if (response.status !== 200) {
            console.log('Ошибка при получении данных о монетах за 24ч')
            throw new Error('Ошибка при получении данных о монетах за 24ч')
          }
          const data = response.data

          if (data.retMsg !== 'OK') {
            console.log('Ошибка при получении данных о монетах за 24ч')
            throw new Error('Ошибка при получении данных о монетах за 24ч')
          }
          const sortedList = data.result.list.sort((a, b) => {
            const num1 = Number(a.turnover24h)
            const num2 = Number(b.turnover24h)
            return num2 - num1
          })
          const res = {
            ...data,
            result: {
              ...data.result,
              list: sortedList,
            },
          }
          setTickersData(res)
          updateFetchedTickerTime()
        })
        .catch(() => {
          console.log('Ошибка при получении данных о монетах за 24ч')
          throw new Error('Ошибка при получении данных о монетах за 24ч')
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
