import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import ReviewRequestForm from '../ReviewRequestForm/'
import DialogTitle from '@mui/material/DialogTitle';
import classroomAPI from '../../APIs/classroomAPI';

export default function ReviewRequestCreateDialog({ max, id, open, handleClose }) {
  const [formData, setFormData] = useState({expectGrade: "", explaination: ""})

  const handleSubmit = async e => {
      const submitData = {...formData, assignmentID: id}
      const response = await classroomAPI.createGradeReviewRequest(submitData)
      if(response.ok) {
        console.log("OK")
      }
  }

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Request</DialogTitle>
        <DialogContent>
          <ReviewRequestForm max={max} formData={formData} setFormData={setFormData} />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
  );
}