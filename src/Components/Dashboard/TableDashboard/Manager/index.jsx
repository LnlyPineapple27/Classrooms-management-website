import { React, useState } from 'react'
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
import { Box } from '@mui/material'
import CreateAccountDialog from '../../../CreateAccountDialog'



export default function Manager({ isCrud, handleSearch, sortBtnState, style, checkedList, handleClickCreate, handleClickUpdate, handleClickDelete, handleClickSort }) {
    
    const [createAccountDialogStatus, setCreateAccountDialogStatus] = useState(false)

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

    const blockUpdate = list => Object.values(list).filter(Boolean).length !== 1

    const blockDelete = list => Object.values(list).every(checked => checked === false)

    return (
        <Box style={style} direction="row" alignItems="center" spacing={2}>

            <Tooltip title="Search by name and email" placement="top">
                <Paper
                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                    style={{ minWidth: "50%" }}
                >
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Name or email"
                        inputProps={{ 'aria-label': 'search records' }}
                        onChange={e => handleSearch(e.target.value)}
                    />
                    <IconButton sx={{ p: '10px' }} aria-label="search" disabled>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Tooltip>

            {isCrud ? (<Stack direction="row" alignItems="center" spacing={1}>
                <Tooltip title={sortBtnTooltipsMap[sortBtnState]} placement="top">
                    <Button
                        variant="contained" 
                        color="info"
                        endIcon= {sortBtnIconsMap[sortBtnState]}
                        onClick={handleClickSort}
                    >
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
            </Stack>) :
                <Stack direction="row" alignItems="center" spacing={1}>
                    <Tooltip title={sortBtnTooltipsMap[sortBtnState]} placement="top">
                        <Button
                            variant="contained" 
                            color="info"
                            endIcon= {sortBtnIconsMap[sortBtnState]}
                            onClick={handleClickSort}
                        >
                            Sort
                        </Button>
                    </Tooltip>
                    <Button 
                        variant="contained" 
                        color="success" 
                        endIcon={<AddCircleIcon />}
                        onClick={() => setCreateAccountDialogStatus(true)}
                    >
                        Create Account
                    </Button>
                    <CreateAccountDialog
                        status={createAccountDialogStatus} 
                        handleClose={() => setCreateAccountDialogStatus(false)}
                    />
                </Stack>
            }
        </Box>
    )
}   