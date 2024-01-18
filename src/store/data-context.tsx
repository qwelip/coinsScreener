import React, { createContext } from 'react'
import { IDataContext } from '../types/models'
import { useCandlesData } from '../hooks/use-candles-data'

export const DataContext = createContext<IDataContext>({} as IDataContext)

interface IProps {
  children: React.ReactNode
}

const DataContextComp = ({ children }: IProps) => {
  const { isLoading, candlesData, interval, setInterval } = useCandlesData()

  const contextData = {
    isLoading,
    candlesData,
    interval,
    setInterval,
  }

  return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}

export default DataContextComp
