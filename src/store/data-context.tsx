import React, { createContext } from 'react'
import { IDataContext } from '../types/models'
import { useCandlesData } from '../hooks/use-candles-data'

export const DataContext = createContext<IDataContext>({} as IDataContext)

interface IProps {
  children: React.ReactNode
}

const DataContextComp = ({ children }: IProps) => {
  const { isLoading, candlesData, interval, setInterval, setTraidingVolume } = useCandlesData()

  const contextData = {
    isLoading,
    candlesData,
    interval,
    setInterval,
    setTraidingVolume,
  }

  return <DataContext.Provider value={contextData}>{children}</DataContext.Provider>
}

export default DataContextComp
