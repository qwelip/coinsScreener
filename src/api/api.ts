import axios from 'axios'
import { ICoinCandlesStat, ITicker24Data, Interval } from '../types/models'
import { getDaysForInterval } from '../utils/utils'

const CANDLES_URL_BASE = 'https://api.bybit.com/v5/market/kline'
const TICKERS_URL_BASE = 'https://api.bybit.com/v5/market/tickers'
const CATEGORY = 'linear'
const LIMIT = 200

export const candleDataRequest = (symbol: string, interval: Interval) => {
  const end = Date.now()
  const date = new Date()
  const days = getDaysForInterval(interval)
  const start = date.setDate(date.getDate() - days)

  return axios<ICoinCandlesStat>({
    method: 'get',
    headers: {},
    url: `${CANDLES_URL_BASE}?category=${CATEGORY}&symbol=${symbol}&interval=${interval}&start=${start}&end=${end}&limit=${LIMIT}`,
  })
}

export const tickersDataRequest = () => {
  return axios<ITicker24Data>({
    method: 'get',
    headers: {},
    url: `${TICKERS_URL_BASE}?category=${CATEGORY}`,
  })
}
