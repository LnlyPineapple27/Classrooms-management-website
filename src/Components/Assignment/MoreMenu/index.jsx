import { React } from 'react'
import { Menu, MenuItem } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import RemoveIcon from '@mui/icons-material/Remove';

export default function MoreMenu({ anchorEl, handleCloseMenu  }) {
    
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
        <MenuItem onClick={handleCloseMenu} data-action='remove'><RemoveIcon />&nbsp;Remove</MenuItem>
      </Menu>
    )
}