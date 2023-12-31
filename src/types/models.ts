export interface ICoinCandlesStat {
  retCode: number
  retMsg: string
  result: IResult
  time: number
  retExtInfo: Record<any, any>
  custom?: ICustom
}

interface IResult {
  symbol: string
  category: string
  list: string[][]
}

export interface IAppContext {
  isLoading: boolean | undefined
  candlesData: ICoinCandlesStat[] | undefined
  interval: Interval | undefined
  setInterval: (val: Interval) => void
}

interface ICustom {
  differencePercent: number
}

export enum SortDirection {
  acs = 'ASC',
  desc = 'DESC',
}

export type Interval = '5' | '15' | '30' | '60' | '240' | 'D'
