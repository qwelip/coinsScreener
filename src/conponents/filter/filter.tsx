import React, { useContext, useEffect, useState } from 'react'
import { Paper, Stack, TextField } from '@mui/material'
import { getTraidingVolumeFilter, setTraidingVolumeFilter } from '../../api/local-storage-api'
import { DataContext } from '../../store/data-context'
import { useDebounce } from 'use-debounce'
interface IProps {
  candlesToCheck: number
  minProcToShow: number
  children: React.ReactNode
  handleCandlesToCheck: (val: number) => void
  setMinProcToShow: (val: number) => void
}

type HandleFunction = React.ChangeEventHandler<HTMLInputElement>

const Filter: React.FC<IProps> = ({
  candlesToCheck,
  minProcToShow,
  children,
  handleCandlesToCheck,
  setMinProcToShow,
}) => {
  const { isLoading, setTraidingVolume } = useContext(DataContext)

  const [trVolumeInput, setTrVolumeInput] = useState(() => getTraidingVolumeFilter())
  const [trVolume] = useDebounce(trVolumeInput, 1000)

  const handleVolumeInput: HandleFunction = (event) => {
    const val = Number(event.target.value)
    if (!isNaN(val)) {
      setTrVolumeInput(`${val}`)
    }
  }

  const handleCandlesInput: HandleFunction = (event) => {
    const val = Number(event.target.value)
    if (!isNaN(val)) {
      handleCandlesToCheck(val)
    }
  }

  const handleProcentInput: HandleFunction = (event) => {
    const val = Number(event.target.value)
    if (!isNaN(val)) {
      setMinProcToShow(val)
    }
  }

  useEffect(() => {
    setTraidingVolumeFilter(trVolume)
    setTraidingVolume()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trVolume])

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }} elevation={2}>
      <Stack justifyContent={'center'} direction={'row'} spacing={10}>
        {children}
        <TextField
          size='small'
          label='торг объем (от млн $)'
          variant='standard'
          disabled={isLoading}
          value={trVolumeInput}
          onChange={handleVolumeInput}
        />
        <TextField
          id='candles'
          size='small'
          label='Candles to check'
          variant='standard'
          value={candlesToCheck}
          onChange={handleCandlesInput}
        />
        <TextField
          id='outlined-basic'
          size='small'
          label='min procent to show'
          variant='standard'
          value={minProcToShow}
          onChange={handleProcentInput}
        />
      </Stack>
    </Paper>
  )
}

export default Filter
