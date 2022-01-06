import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ReviewRequestForm from '../ReviewRequestForm/'
import DialogTitle from '@mui/material/DialogTitle';

export default function ReviewRequestCreateDialog({ open, handleClose }) {
  const [formData, setFormData] = useState({})

  const handleSubmit = formData => e => {
      
  }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request</DialogTitle>
        <DialogContent>
          <ReviewRequestForm formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
  );
}