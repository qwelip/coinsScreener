import { createTheme } from '@mui/material/styles'

export const customTheme = createTheme({
  palette: {
    mode: 'dark',
    secondary: {
      main: '#6b6b6bde',
    },
  },
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
})
