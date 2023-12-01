import { Container } from '@mui/material'
import ChartsPage from './pages/charts-page'
import Context from './store/context'
import ErrorBoundary from './conponents/error-boundary'

function App() {
  return (
    <div className='App'>
      <ErrorBoundary>
        <Context>
          <Container maxWidth='lg'>
            <ChartsPage />
          </Container>
        </Context>
      </ErrorBoundary>
    </div>
  )
}

export default App
