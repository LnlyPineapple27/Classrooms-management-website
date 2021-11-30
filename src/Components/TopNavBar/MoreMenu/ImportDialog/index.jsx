import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Tabs from './Tabs'


export default function FormDialog({ open, handleClose }) {
    console.log(open)
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Import</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To import data by file please select file and click on button import below.
                </DialogContentText>
                <Tabs />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Import</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}