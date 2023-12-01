import React, { createContext } from 'react'
import { IAppContext } from '../types/models'
import { useCandlesData } from '../hooks/use-candles-data'

export const AppContext = createContext<IAppContext>({} as IAppContext)

const Context = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, candlesData, interval, setInterval] = useCandlesData()

  const contextData = {
    isLoading,
    candlesData,
    interval,
    setInterval,
  }

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export default Context
