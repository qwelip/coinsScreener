import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const WelcomePage = () => {
  return (
    <Paper
      style={{
        display: 'flex',
        height: 'calc(100vh - 40px)',
        backgroundColor: 'rgb(18, 18, 18)',
        padding: 0,
      }}
    >
      <Box style={{ margin: 'auto', display: 'flex', flexDirection: 'column' }}>
        <Typography style={{ color: 'white' }} variant='h4' align='center'>
          Получение монет с биржи
        </Typography>
        <Box style={{ margin: '20px auto 0', display: 'flex' }}>
          <CircularProgress />
        </Box>
      </Box>
    </Paper>
  )
}

export default WelcomePage
