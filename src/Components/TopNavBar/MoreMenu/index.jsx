import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ImportDialog from './ImportDialog'


export default function PositionedMenu({ handleClose, anchorEl, handleOpenImport }) {
    const open = Boolean(anchorEl);

    return (
        <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
        }}
        >
            <MenuItem onClick={() => {
                handleOpenImport()
                handleClose()
            }}>
                <ListItemIcon>
                    <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText>
                    Import File
                </ListItemText>
            </MenuItem>
        </Menu>
  );
}