import { ITicker24Data } from '../types/models'

const TICKER_DATA_ID = 'ticker24Data'
const WHEN_TICKERS_FETCHED_ID = 'whenTicker24DataFetched'
const TRAIDING_VALUE_FILTER_ID = 'traidingValueFilter'

export const updateFetchedTickerTime = () => {
  const now = Date.now()
  localStorage.setItem(WHEN_TICKERS_FETCHED_ID, String(now))
}

export const putTickersDataToStorage = (data: ITicker24Data | undefined) => {
  const strData = data ? JSON.stringify(data) : ''
  localStorage.setItem(TICKER_DATA_ID, strData)
  updateFetchedTickerTime()
}
export const getStorageTickersData = () => localStorage.getItem(TICKER_DATA_ID)

export const getDateTickerDataFetched = () => {
  const data = localStorage.getItem(WHEN_TICKERS_FETCHED_ID)
  return data ? +data : Date.now()
}

export const getTraidingVolumeFilter = (): string => {
  const value = localStorage.getItem(TRAIDING_VALUE_FILTER_ID)
  if (!value) {
    localStorage.setItem(TRAIDING_VALUE_FILTER_ID, '50')
    return '50'
  }
  return value
}

export const setTraidingVolumeFilter = (val: string) => {
  localStorage.setItem(TRAIDING_VALUE_FILTER_ID, val)
}
