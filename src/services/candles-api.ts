import { candleDataRequest } from '../api/api'
import { Interval } from '../types/models'

export const getAllCandlesData = (coinsList: string[], interval: Interval) => {
  const reqArray = coinsList.map((coinName) => candleDataRequest(coinName, interval))
  return Promise.all(reqArray)
    .then((response) => {
      const data = response.map((i) => i.data)
      const filtered = data.filter((i) => i.retMsg === 'OK' && i.result.list.length > 0)
      return filtered
    })
    .catch(() => {
      console.log('Ошибка при получении данных графиков')
      throw new Error('Ошибка при получении данных графиков')
    })
}
