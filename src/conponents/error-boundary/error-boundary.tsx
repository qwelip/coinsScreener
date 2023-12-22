import React from 'react'
import { Box, Paper, Typography } from '@mui/material'

interface IStateProps {
  hasError: boolean
}

interface IReturnProps {
  children: React.ReactNode
}

export default class ErrorBoundary extends React.Component<
  IReturnProps,
  IStateProps
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // You can also log the error to an error reporting service
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper
          square
          style={{
            display: 'flex',
            minHeight: '100vh',
            backgroundColor: 'rgb(18, 18, 18)',
          }}
          className='error-page'
        >
          <Box style={{ margin: 'auto' }}>
            <Typography style={{ color: 'white' }} variant='h2' align='center'>
              Произошла ошибка
            </Typography>
            <Typography style={{ color: 'white' }} variant='h6' align='center'>
              Лучшие программисты уже заняты решением этого бага!
            </Typography>
            <Typography
              style={{ color: '#6b6b6b', marginTop: 30 }}
              variant='h6'
              align='center'
            >
              А пока, просто перезагрузите страницу
            </Typography>
          </Box>
        </Paper>
      )
    }

    return this.props.children
  }
}
