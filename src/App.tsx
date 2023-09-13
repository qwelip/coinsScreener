import { useCandlesData } from './hooks/use-candles-data'
import ChartsPage from './pages/charts-page'
import { AppContext } from './store/context'

function App() {
  const [isLoading, candlesData] = useCandlesData()

  const contextData = {
    isLoading,
    candlesData,
  }

  return (
    <div className='App'>
      <AppContext.Provider value={contextData}>
        <ChartsPage />
      </AppContext.Provider>
    </div>
  )
}

export default App
