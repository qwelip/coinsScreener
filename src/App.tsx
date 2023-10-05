import { Container } from '@mui/material'
import ChartsPage from './pages/charts-page'
import Context from './store/context'

function App() {
  return (
    <div className='App'>
      <Context>
        <Container maxWidth='lg'>
          <ChartsPage />
        </Container>
      </Context>
    </div>
  )
}

export default App
