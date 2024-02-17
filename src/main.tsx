import React, { useEffect } from 'react'
import ChartsPage from './pages/charts-page/charts-page'
import useTickersInfo from './hooks/use-tickers-info'
import { getStorageTickersData, putTickersDataToStorage } from './api/local-storage-api'
import WelcomePage from './pages/welcome-page/welcome-page'

const Main = () => {
  const { isLoading, tickersData } = useTickersInfo()

  useEffect(() => {
    if (typeof isLoading === 'boolean' && !isLoading) {
      const rowtickersData = getStorageTickersData()
      if (!rowtickersData) {
        putTickersDataToStorage(tickersData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return <>{isLoading ? <WelcomePage /> : <ChartsPage />}</>
}

export default Main
