import { tickersDataRequest } from '../api/api'
import { updateFetchedTickerTime } from '../api/local-storage-api'

export const getTickersData = () => {
  return tickersDataRequest()
    .then((response) => {
      if (response.status !== 200) {
        console.log('Ошибка при получении данных о монетах за 24ч')
        throw new Error('Ошибка при получении данных о монетах за 24ч')
      }
      const data = response.data

      if (data.retMsg !== 'OK') {
        console.log('Ошибка при получении данных о монетах за 24ч')
        throw new Error('Ошибка при получении данных о монетах за 24ч')
      }
      const sortedList = data.result.list.sort((a, b) => {
        const num1 = Number(a.turnover24h)
        const num2 = Number(b.turnover24h)
        return num2 - num1
      })
      const res = {
        ...data,
        result: {
          ...data.result,
          list: sortedList,
        },
      }
      updateFetchedTickerTime()
      return res
    })
    .catch(() => {
      console.log('Ошибка при получении данных о монетах за 24ч')
      throw new Error('Ошибка при получении данных о монетах за 24ч')
    })
}
