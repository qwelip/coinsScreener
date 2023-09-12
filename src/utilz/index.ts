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