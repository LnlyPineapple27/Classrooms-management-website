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
import { useParams } from 'react-router-dom';
import SendNotification from '../../APIs/SendNotification'
export default function ReviewRequestCreateDialog({ max, id, open, handleClose }) {
  const params = useParams();
  const [formData, setFormData] = useState({expectGrade: "", explaination: ""})

  const handleSubmit = async e => {
      const submitData = {...formData, assignmentID: id, classroomID: params.classroomId}
      const response = await classroomAPI.createGradeReviewRequest(submitData)
      if(response.ok) {
        console.log("OK")
      }
      handleClose();
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