import { useState, useEffect, useRef } from 'react'
import { coinsList } from '../common/coins-list'
import { IAppContext, ICoinCandlesStat, Interval } from '../types/models'
import axios from 'axios'
import { getAxiosConfig } from '../api'

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
  const startParam = getStartParam()
  const start = date.setDate(date.getDate() - startParam)
  const end = Date.now()
  const candlesDataRef = useRef<ICoinCandlesStat[] | undefined>([])

  function getStartParam(): number {
    switch (interval) {
      case '15':
        return 0.2
      case '60':
        return 2
      case '240':
        return 25
      case 'D':
        return 50
      default:
        return 2
    }
  }

  useEffect(() => {
    if (!interval) return
    setIsLoading(true)
    console.log('interval', interval)
    const reqArray = coinsList.map((coinName) =>
      axios(getAxiosConfig(category, coinName, interval, start, end))
    )
    Promise.all(reqArray)
      .then((response) => {
        const data = response.map((i) => i.data) as ICoinCandlesStat[]
        const filtered = data.filter(
          (i) => i.retCode === 0 && i.result.list.length > 0
        )
        candlesDataRef.current = filtered
      })
      .catch(() => {
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
