import { useState, useEffect, useRef } from 'react'
import { coinsList } from '../common/coins-list'
import { IAppContext, ICoinCandlesStat, Interval } from '../types/models'
import axios from 'axios'
import { getAxiosConfig } from '../api'
import { getStartParam } from '../utils/utils'

export const useCandlesData = (): IAppContext => {
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
    const reqArray = coinsList.map((coinName) =>
      axios(getAxiosConfig(category, coinName, interval, start, end, limit))
    )
    Promise.all(reqArray)
      .then((response) => {
        const data = response.map((i) => i.data) as ICoinCandlesStat[]
        const filtered = data.filter((i) => i.retCode === 0 && i.result.list.length > 0)
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
