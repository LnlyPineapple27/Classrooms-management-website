import { React, useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import IconButton from '@mui/material/IconButton'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault'
import Tooltip from '@mui/material/Tooltip'
import { grey, cyan, teal } from '@mui/material/colors'



export default function Manager({ style, checkedList, handleClickCreate, handleClickUpdate, handleClickDelete, handleClickSort }) {
    const [sortBtnState, setSortBtnState] = useState(0)
    
    const sortBtnIconsMap = {
        0: <DisabledByDefaultIcon />,
        1: <ArrowDropUpIcon />,
        2: <ArrowDropDownIcon />,
    }

    const sortBtnTooltipsMap = {
        0: "No sorting.",
        1: "Sort by ascending created date.",
        2: "Sort by descending created date.",
    }


    const handleClickSortAndSetState = () => {
        setSortBtnState((sortBtnState + 1) % Object.keys(sortBtnIconsMap).length)
        handleClickSort()
    }

    const blockUpdate = list => Object.values(list).filter(Boolean).length !== 1

    const blockDelete = list => Object.values(list).every(checked => checked === false)

    return (
        <Stack style={style} direction="row" alignItems="center" spacing={2}>
            
            <Tooltip title="Search by name and email" placement="top">
                <Paper
                    component="form"
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Name or email"
                        inputProps={{ 'aria-label': 'search records' }}
                    />
                    <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Tooltip>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Tooltip title={sortBtnTooltipsMap[sortBtnState]} placement="top">
                    <Button
                        variant="contained" 
                        color="info"
                        endIcon= {sortBtnIconsMap[sortBtnState]}
                        onClick={handleClickSortAndSetState}>
                        Sort
                    </Button>
                </Tooltip>
                <Button 
                    variant="contained" 
                    color="success" 
                    endIcon={<AddCircleIcon />}
                    onClick={handleClickCreate}
                >
                    Create
                </Button>
                <Button
                    variant="contained"
                    color="warning" 
                    endIcon={<SettingsIcon />} 
                    disabled={blockUpdate(checkedList)}
                    onClick={handleClickUpdate}
                >
                    Update
                </Button>
                <Button 
                    variant="contained" 
                    color="error" 
                    endIcon={<DeleteIcon />} 
                    disabled={blockDelete(checkedList)}
                    onClick={handleClickDelete}
                >
                    Delete
                </Button>
            </Stack>
        </Stack>
    )
}   