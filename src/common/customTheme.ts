import { createTheme } from '@mui/material/styles';


export const customTheme = createTheme(({
  palette: {
    mode: 'dark',
  },
  typography: {
    button: {
      fontSize: '1rem',
    },
  },
}))