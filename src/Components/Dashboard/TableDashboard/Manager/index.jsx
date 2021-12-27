import { React, useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import SettingsIcon from '@mui/icons-material/Settings'
import AddCircleIcon from '@mui/icons-material/AddCircle'

export default function Manager({ style, checkedList, handleClickCreate, handleClickUpdate, handleClickDelete }) {

    const blockUpdate = list => Object.values(list).filter(Boolean).length !== 1

    const blockDelete = list => Object.values(list).every(checked => checked === false)

    return (
        <Stack style={style} direction="row" alignItems="center" spacing={1}>
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
    )
}