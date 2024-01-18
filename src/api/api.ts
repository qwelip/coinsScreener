const candlesUrl = 'https://api.bybit.com/v5/market/kline'
const tickersUrl = 'https://api.bybit.com/v5/market/tickers'

const axiosСonfig = {
  method: 'get',
  headers: {},
}

export const getCandlesRequestConfig = (
  category: string,
  symbol: string,
  interval: string,
  start: number,
  end: number,
  limit: number
) => {
  return {
    ...axiosСonfig,
    url: `${candlesUrl}?category=${category}&symbol=${symbol}&interval=${interval}&start=${start}&end=${end}&limit=${limit}`,
  }
}

export const getTickersRequestConfig = (category: string) => {
  return {
    ...axiosСonfig,
    url: `${tickersUrl}?category=${category}`,
  }
}
