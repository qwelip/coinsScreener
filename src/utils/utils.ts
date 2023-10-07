import { ICoinCandlesStat, SortDirection } from "../types"

const makeStrToNumbers = (val: string[]): number[] => {
  return val.map(i => Number(i))
}

const makeStrArrayToNumbersArray = (val: string[][]): number[][] => {
  return val.map(i => makeStrToNumbers(i))
}

export const getOHLCdata = (val: string[][]): number[][] => {
  const numArr = makeStrArrayToNumbersArray(val)

  return numArr.map(i => [i[0], i[1], i[2], i[3], i[4]])
}

export const getSortedPercentGrowCandlesStat = (data: ICoinCandlesStat[], candlesToCheck: number, sortingDirection: SortDirection, includeFirstCandle: boolean): ICoinCandlesStat[] => {
  const res = data.map(item => {
    const firstCandleToCheck = Number(item.result.list.at(candlesToCheck - 1)![4])
    const secondCandleToCheck = includeFirstCandle ? Number(item.result.list.at(0)![4]) : Number(item.result.list.at(1)![2])
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

  return res.sort((a, b) => {
    if (sortingDirection === SortDirection.desc) {
      return b.custom.differencePercent - a.custom.differencePercent
    } else {
      return a.custom.differencePercent - b.custom.differencePercent
    }
  })
}