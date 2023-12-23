import { Container, ThemeProvider, Paper } from '@mui/material'
import ChartsPage from './pages/charts-page'
import Context from './store/context'
import ErrorBoundary from './conponents/error-boundary/error-boundary'
import { customTheme } from './common/customTheme'
import './style.css'

function App() {
  const paperStyles = {
    minHeight: 'calc(100vh - 40px)',
    padding: '20px 0',
  }
  return (
    <ErrorBoundary>
      <Context>
        <ThemeProvider theme={customTheme}>
          <Paper style={paperStyles} square>
            <Container style={{ height: '100%' }} maxWidth='lg'>
              <ChartsPage />
            </Container>
          </Paper>
        </ThemeProvider>
      </Context>
    </ErrorBoundary>
  )
}

export default App
