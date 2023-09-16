import React, { createContext } from 'react'
import { IAppContext } from '../types'
import { useCandlesData } from '../hooks/use-candles-data'

export const AppContext = createContext<IAppContext>({} as IAppContext)

const Context = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, candlesData] = useCandlesData()

  const contextData = {
    isLoading,
    candlesData,
  }

  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  )
}

export default Context
