export interface ICoinCandlesStat {
  retCode: number,
  retMsg: string
  result: IResult
  time: number
  retExtInfo: Record<any, any>
}

interface IResult {
  symbol: string
  category: string
  list: string[][]
}

export interface IAppContext {
  isLoading: boolean
  candlesData: ICoinCandlesStat[] | undefined
}
