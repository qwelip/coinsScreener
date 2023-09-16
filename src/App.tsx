import { Container } from '@mui/material'
import { useCandlesData } from './hooks/use-candles-data'
import ChartsPage from './pages/charts-page'
import Context from './store/context'

function App() {
  return (
    <div className='App'>
      <Context>
        <Container maxWidth='md'>
          <ChartsPage />
        </Container>
      </Context>
    </div>
  )
}

export default App
