import { React, useState } from 'react'
import { Menu, MenuItem } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RemoveIcon from '@mui/icons-material/Remove';
import ConfirmDialog from '../../ConfirmDialog'

export default function MoreMenu({ anchorEl, handleCloseMenu, handleConfirm }) {
    const [openConfirmRemove, setOpenConfirmRemove] = useState(false)
    
    const handleRemoveAction = e => {
        setOpenConfirmRemove(true)
        handleCloseMenu(e)
    }

    const handleConfirmRemove = e => {
        setOpenConfirmRemove(false)
        handleCloseMenu(e)
        handleConfirm()
    }

    return (
        <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={handleCloseMenu} data-action='update'><ArrowUpwardIcon />&nbsp;Update</MenuItem>
        <MenuItem onClick={handleRemoveAction} data-action='remove'><RemoveIcon />&nbsp;Remove</MenuItem>
        <ConfirmDialog 
        status={openConfirmRemove} 
        handleClose={() => setOpenConfirmRemove(false)} 
        handleConfirm={handleConfirmRemove}
        message={'By click "I Confirm" in this dialog this assignment will be removed from this class.'}
        title={"Remove this assignment from this class?"}
        />
      </Menu>
    )
}