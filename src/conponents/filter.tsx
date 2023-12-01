import React, { useContext } from 'react'
import { Paper, Stack, TextField } from '@mui/material'
import { AppContext } from '../store/context'

interface IProps {
  candlesToCheck: number
  minProcToShow: number
  handleCandlesToCheck: (val: number) => void
  setMinProcToShow: (val: number) => void
}

const Filter: React.FC<IProps> = ({
  candlesToCheck,
  minProcToShow,
  handleCandlesToCheck,
  setMinProcToShow,
}) => {
  const { isLoading, interval } = useContext(AppContext)
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

  if (isLoading || !interval) {
    return null
  }

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }} elevation={1}>
      <Stack justifyContent={'center'} direction={'row'} spacing={10}>
        <TextField
          id='Candles'
          size='small'
          label='Candles to check'
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
