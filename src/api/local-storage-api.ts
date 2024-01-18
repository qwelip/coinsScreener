import { ITicker24Data } from '../types/models'

const TICKER_DATA_ID = 'ticker24Data'
const WHEN_TICKERS_FETCHED_ID = 'whenTicker24DataFetched'

export const putTickersDataToStorage = (data: ITicker24Data | undefined) => {
  const strData = data ? JSON.stringify(data) : ''
  const fetchDate = String(Date.now())
  localStorage.setItem(TICKER_DATA_ID, strData)
  localStorage.setItem(WHEN_TICKERS_FETCHED_ID, fetchDate)
}

export const updateFetchedTickerTime = () => {
  const now = Date.now()
  localStorage.setItem(WHEN_TICKERS_FETCHED_ID, String(now))
}

export const getStorageTickersData = () => localStorage.getItem(TICKER_DATA_ID)

export const getDateTickerDataFetched = () => {
  const data = localStorage.getItem(WHEN_TICKERS_FETCHED_ID)
  return data ? +data : Date.now()
}
