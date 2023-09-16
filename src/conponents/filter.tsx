import React, { useContext } from 'react'
import NorthIcon from '@mui/icons-material/North'
import SouthIcon from '@mui/icons-material/South'
import {
  Button,
  Paper,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import { SortDirection } from '../types'
import { AppContext } from '../store/context'

interface IProps {
  isFilter: boolean
  candlesToCheck: number
  sortDirection: SortDirection
  minProcToShow: number
  handleFilter: () => void
  handleCandlesToCheck: (val: number) => void
  handleSortDirection: (val: SortDirection) => void
  setMinProcToShow: (val: number) => void
}

const Filter: React.FC<IProps> = ({
  isFilter,
  candlesToCheck,
  sortDirection,
  minProcToShow,
  handleFilter,
  handleCandlesToCheck,
  handleSortDirection,
  setMinProcToShow,
}) => {
  const { isLoading } = useContext(AppContext)

  const handleSort = (_: any, newSortVal: SortDirection) => {
    handleSortDirection(newSortVal)
  }

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

  if (isLoading) {
    return null
  }

  return (
    <Paper style={{ padding: 20, marginBottom: 20 }} elevation={1}>
      <Stack justifyContent={'center'} direction={'row'} spacing={10}>
        <Typography style={{ padding: '6px 0' }}>Filter - % change</Typography>
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
        <ToggleButtonGroup
          value={sortDirection}
          exclusive
          onChange={handleSort}
          aria-label='text alignment'
          size='small'
        >
          <ToggleButton value={SortDirection.desc} aria-label='left aligned'>
            <SouthIcon />
          </ToggleButton>
          <ToggleButton value={SortDirection.acs} aria-label='left aligned'>
            <NorthIcon />
          </ToggleButton>
        </ToggleButtonGroup>
        <Switch checked={isFilter} onClick={handleFilter} />
        {/* <Button onClick={handleFilter}>Filter</Button> */}
      </Stack>
    </Paper>
  )
}

export default Filter
