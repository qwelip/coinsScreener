import { Box, Container, ThemeProvider, Paper } from '@mui/material'
import ChartsPage from './pages/charts-page'
import Context from './store/context'
import ErrorBoundary from './conponents/error-boundary'
import { customTheme } from './common/customTheme'
import './style.css'

function App() {
  const paperStyles = {
    minHeight: '100vh',
    padding: 20,
  }
  return (
    <ErrorBoundary>
      <Context>
        <ThemeProvider theme={customTheme}>
          <Paper style={paperStyles} square>
            <Container maxWidth='lg'>
              <ChartsPage />
            </Container>
          </Paper>
        </ThemeProvider>
      </Context>
    </ErrorBoundary>
  )
}

export default App
