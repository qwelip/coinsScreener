import { useState, useEffect, useRef } from 'react'
import { ICoinCandlesStat, IDataContext, ITicker24Data, Interval } from '../types/models'
import { filterCoinsOnValueTrade } from '../utils/utils'
import { getStorageTickersData, getTraidingVolumeFilter } from '../api/local-storage-api'
import { getAllCandlesData } from '../services/candles-api'

export const useCandlesData = (): IDataContext => {
  const rowtickersData = getStorageTickersData()
  const filterValue = getTraidingVolumeFilter()

  const candlesDataRef = useRef<ICoinCandlesStat[] | undefined>([])
  const [isLoading, setIsLoading] = useState<boolean | undefined>()
  const [interval, setInterval] = useState<Interval | undefined>()
  const [renderFlag, setRenderFlag] = useState(true)

  const handleIntervalChange = (val: Interval) => {
    setRenderFlag((prev) => !prev)
    setInterval(val)
  }

  const setTraidingVolume = () => {
    setRenderFlag((prev) => !prev)
  }

  useEffect(() => {
    if (!interval) return
    setIsLoading(true)
    const data = JSON.parse(rowtickersData || '') as ITicker24Data
    const volumeFilterder = filterCoinsOnValueTrade(data, Number(filterValue))
    const coinsList = volumeFilterder.map((i) => i.symbol)
    getAllCandlesData(coinsList, interval)
      .then((res) => {
        if (res) {
          candlesDataRef.current = res
        }
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
    setTraidingVolume,
  }
}
