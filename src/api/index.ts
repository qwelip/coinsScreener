const baseUrl = 'https://api.bybit.com/v5/market/kline'

const axiosСonfig = {
  method: 'get',
  headers: {},
}

export const getAxiosConfig = (
  category: string,
  symbol: string,
  interval: string,
  start: number,
  end: number,
  limit: number
) => {
  return {
    ...axiosСonfig,
    url: `${baseUrl}?category=${category}&symbol=${symbol}&interval=${interval}&start=${start}&end=${end}&limit=${limit}`,
  }
}
