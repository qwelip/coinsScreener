import { Paper, Box, Typography, Button } from '@mui/material'
import React from 'react'

const ErrorPage = () => {
  const handleReload = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload()
  }

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
      <Box style={{ margin: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Typography style={{ color: 'white' }} variant='h2' align='center'>
          Произошла ошибка
        </Typography>
        <Typography style={{ color: '#6b6b6b', marginTop: 10 }} variant='h6' align='center'>
          Перезагрузите страницу
        </Typography>
        <Button style={{ marginTop: 50 }} onClick={handleReload}>
          Перезагрузить
        </Button>
      </Box>
    </Paper>
  )
}

export default ErrorPage
