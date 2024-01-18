import { Container, ThemeProvider, Paper } from '@mui/material'
import ErrorBoundary from './conponents/error-boundary/error-boundary'
import { customTheme } from './common/customTheme'
import DataContextComp from './store/data-context'
import './style.css'
import Main from './main'

function App() {
  const paperStyles = {
    minHeight: 'calc(100vh - 40px)',
    padding: '20px 0',
  }
  return (
    <ErrorBoundary>
      <DataContextComp>
        <ThemeProvider theme={customTheme}>
          <Paper style={paperStyles} square>
            <Container style={{ height: '100%' }} maxWidth='lg'>
              <Main />
            </Container>
          </Paper>
        </ThemeProvider>
      </DataContextComp>
    </ErrorBoundary>
  )
}

export default App
