interface IResponseBase {
  retCode: number
  retExtInfo: Record<any, any>
  retMsg: 'OK'
  time: number
}

export interface ICoinCandlesStat extends IResponseBase {
  result: ICoinCandlesStatResult
  custom?: ICustom
}

interface ICoinCandlesStatResult {
  symbol: string
  category: string
  list: string[][]
}

export interface ITicker24Data extends IResponseBase {
  result: ITicker24DataResult
}

interface ITicker24DataResult {
  category: string
  list: ITickerList[]
}

interface ITickerList {
  symbol: string // название монеты
  turnover24h: string // оборот
  openInterest: string // сумма открытых позиций
  // ask1Price: string
  // ask1Size: string
  // basis: string
  // basisRate: string
  // bid1Price: string
  // bid1Size: string
  // deliveryFeeRate: string
  // deliveryTime: string
  // fundingRate: string
  // highPrice24h: string
  // indexPrice: string
  // lastPrice: string
  // lowPrice24h: string
  // markPrice: string
  // nextFundingTime: string
  // openInterestValue: string
  // predictedDeliveryPrice: string
  // prevPrice1h: string
  // prevPrice24h: string
  // price24hPcnt: string
  // volume24h: string
}

export interface IDataContext {
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
