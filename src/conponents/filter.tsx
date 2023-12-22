import React from 'react'
import { Paper, Stack, TextField } from '@mui/material'

interface IProps {
  candlesToCheck: number
  minProcToShow: number
  children: React.ReactNode
  handleCandlesToCheck: (val: number) => void
  setMinProcToShow: (val: number) => void
}

const Filter: React.FC<IProps> = ({
  candlesToCheck,
  minProcToShow,
  children,
  handleCandlesToCheck,
  setMinProcToShow,
}) => {
  const handleCandlesInput: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const val = Number(event.target.value)
    if (!isNaN(val)) {
      handleCandlesToCheck(val)
    }
  }

  const handleProcentInput: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    const val = Number(event.target.value)
    if (!isNaN(val)) {
      setMinProcToShow(val)
    }
  }

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }} elevation={2}>
      <Stack justifyContent={'center'} direction={'row'} spacing={10}>
        {children}
        <TextField
          id='Candles'
          size='small'
          label='Candles to check 123'
          variant='outlined'
          value={candlesToCheck}
          onChange={handleCandlesInput}
        />
        <TextField
          id='outlined-basic'
          size='small'
          label='min procent to show'
          variant='outlined'
          value={minProcToShow}
          onChange={handleProcentInput}
        />
      </Stack>
    </Paper>
  )
}

export default Filter
