import { React, forwardRef } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

export default function FormDialog({ status, handleClose, fields, title, contentText, handleSave }) {
    return (
        <Dialog open={status} onClose={handleClose} TransitionComponent={Transition} keepMounted>
            
            <DialogTitle>{title}</DialogTitle>
            
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>
                {Object.keys(fields).map((label => 
                    <TextField
                        key={`tf_${label}`}
                        margin="dense"
                        id={`tf_${label}`}
                        label={label.toUpperCase()}
                        type="text"
                        fullWidth
                        variant="standard"
                        value={fields[label]}
                    /> 
                ))}
            </DialogContent>
            
            <DialogActions>
                <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="success" onClick={handleClose}>Save</Button>
            </DialogActions>
        
        </Dialog>
    )
}