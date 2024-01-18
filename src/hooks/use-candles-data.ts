import { useState, useEffect, useRef } from 'react'
import { ICoinCandlesStat, IDataContext, ITicker24Data, Interval } from '../types/models'
import axios from 'axios'
import { getCandlesRequestConfig } from '../api/api'
import { getStartParam } from '../utils/utils'
import { getStorageTickersData } from '../api/local-storage-api'

export const useCandlesData = (): IDataContext => {
  const rowtickersData = getStorageTickersData()

  const [isLoading, setIsLoading] = useState<boolean | undefined>()
  const [interval, setInterval] = useState<Interval | undefined>()
  const [renderFlag, setRenderFlag] = useState(true)

  const handleIntervalChange = (val: Interval) => {
    setRenderFlag((prev) => !prev)
    setInterval(val)
  }
  const date = new Date()
  const category = 'linear'
  const startParam = getStartParam(interval)
  const start = date.setDate(date.getDate() - startParam)
  const end = Date.now()
  const candlesDataRef = useRef<ICoinCandlesStat[] | undefined>([])
  const limit = 200

  useEffect(() => {
    if (!interval) return
    setIsLoading(true)
    const data = JSON.parse(rowtickersData || '') as ITicker24Data
    const coinsList = data.result.list.map((i) => i.symbol)
    const reqArray = coinsList.map((coinName) =>
      axios<ICoinCandlesStat>(
        getCandlesRequestConfig(category, coinName, interval, start, end, limit)
      )
    )
    Promise.all(reqArray)
      .then((response) => {
        const data = response.map((i) => i.data)
        const filtered = data.filter((i) => i.retMsg === 'OK' && i.result.list.length > 0)
        candlesDataRef.current = filtered
      })
      .catch(() => {
        console.log('Ошибка при получении данных графиков')
        throw new Error('Ошибка при получении данных графиков')
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval, renderFlag])

  return {
    isLoading,
    candlesData: candlesDataRef.current,
    interval,
    setInterval: handleIntervalChange,
  }
}
