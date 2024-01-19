import {
  ICoinCandlesStat,
  ITicker24Data,
  ITickerList,
  Interval,
  SortDirection,
} from '../types/models'

const makeStrToNumbers = (val: string[]): number[] => {
  return val.map((i) => Number(i))
}

const makeStrArrayToNumbersArray = (val: string[][]): number[][] => {
  return val.map((i) => makeStrToNumbers(i))
}

export const getOHLCdata = (val: string[][]): number[][] => {
  const numArr = makeStrArrayToNumbersArray(val)

  return numArr.map((i) => [i[0], i[1], i[2], i[3], i[4]])
}

export const richingCandlesStatWithGrowPercent = (
  data: ICoinCandlesStat[],
  candlesToCheck: number,
  // sortingDirection: SortDirection = SortDirection.desc,
  includeFirstCandle: boolean = true
): ICoinCandlesStat[] => {
  const filtered = data.filter((item) => item.result.list.length > 10)
  return filtered.map((item) => {
    if (candlesToCheck > item.result.list.length || candlesToCheck === 0) {
      candlesToCheck = item.result.list.length
    }
    const firstCandleToCheck = Number(item.result.list.at(candlesToCheck - 1)![4])
    const secondCandleToCheck = includeFirstCandle
      ? Number(item.result.list.at(0)![4])
      : Number(item.result.list.at(1)![2])
    const delta = secondCandleToCheck - firstCandleToCheck
    const percent = firstCandleToCheck / 100
    const differencePercent = Math.ceil(delta / percent)

    return {
      ...item,
      custom: {
        differencePercent,
      },
    }
  })
}

export const sortingCandlesStat = (
  data: ICoinCandlesStat[],
  sortingDirection: SortDirection = SortDirection.desc
) => {
  return data.sort((a, b) => {
    if (sortingDirection === SortDirection.desc) {
      return b.custom!.differencePercent - a.custom!.differencePercent
    } else {
      return a.custom!.differencePercent - b.custom!.differencePercent
    }
  })
}

export const getIntervalTitle = (val: Interval): string => {
  switch (val) {
    case '5': {
      return '5 мин'
    }
    case '15': {
      return '15 мин'
    }
    case '240': {
      return '4 часа'
    }
    case '30': {
      return '30 мин'
    }
    case '60': {
      return '1 час'
    }
    case 'D': {
      return '24 часа'
    }
  }
}

export function getStartParam(interval: Interval | undefined): number {
  switch (interval) {
    case '5':
      return 5
    case '15':
      return 5
    case '30':
      return 5
    case '60':
      return 5
    case '240':
      return 5
    case 'D':
      return 5
    default:
      return 2
  }
}

export const filterCoinsOnValueTrade = (
  data: ITicker24Data,
  tradeValume: number
): ITickerList[] => {
  const allCoins = data.result.list
  const valumeToCheck = Number(`${tradeValume}000000`)
  return allCoins.filter((i) => {
    const volume = Math.floor(Number(i.turnover24h))
    return volume >= valumeToCheck
  })
}
