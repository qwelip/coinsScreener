import {useState, useEffect} from 'react'
import { coinsList } from '../common/coins-list'
import { ICoinCandlesStat } from '../types'
import axios from 'axios'
import { getAxiosConfig } from '../api'

export const useCandlesData = (): [boolean, ICoinCandlesStat[] | undefined]  => {
  const date = new Date()
  const category = 'linear'
  const interval = '240'
  const start = date.setDate(date.getDate() - 14)
  const end = Date.now()

  const [isLoading, setIsLoading] = useState(true)
  const [candlesData, setCandlesData] = useState<ICoinCandlesStat[] | undefined>([])

  useEffect(() => {
    const reqArray = coinsList.map(coinName => axios(getAxiosConfig(category, coinName, interval, start, end)))
    Promise.all(reqArray).then(response => {
      const data = response.map(i => i.data) as ICoinCandlesStat[]
      const filtered = data.filter(i => i.retCode === 0)
      setCandlesData(filtered)
      setIsLoading(false)
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [isLoading, candlesData]
}