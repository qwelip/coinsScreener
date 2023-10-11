import {useState, useEffect, useRef} from 'react'
import { coinsList } from '../common/coins-list'
import { ICoinCandlesStat, Interval } from '../types'
import axios from 'axios'
import { getAxiosConfig } from '../api'

export const useCandlesData = (): [boolean | undefined, ICoinCandlesStat[] | undefined, Interval | undefined, React.Dispatch<React.SetStateAction<Interval | undefined>>]  => {
  const [isLoading, setIsLoading] = useState<boolean | undefined>()
  const [interval, setInterval] = useState<Interval | undefined>()
  
  const date = new Date()
  const category = 'linear'
  const startParam = getStartParam()
  const start = date.setDate(date.getDate() - startParam)
  const end = Date.now()
  const candlesDataRef = useRef<ICoinCandlesStat[] | undefined>([])

  function getStartParam(): number {
    switch(interval) {
      case '60': return 8
      case '240': return 15
      case 'D': return 15
      default: return 2
    }
  }

  useEffect(() => {
    if (!interval) return 
    setIsLoading(true)
    const reqArray = coinsList.map(coinName => axios(getAxiosConfig(category, coinName, interval, start, end)))
    Promise.all(reqArray).then(response => {
      const data = response.map(i => i.data) as ICoinCandlesStat[]
      const filtered = data.filter(i => i.retCode === 0 && i.result.list.length > 0)
      candlesDataRef.current = filtered
      setIsLoading(false)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval])

  return [isLoading, candlesDataRef.current, interval, setInterval]
}