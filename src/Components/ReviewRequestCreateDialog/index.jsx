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
export default function ReviewRequestCreateDialog({ max, id, open, handleClose, assignmentName }) {
  const params = useParams();
  const [formData, setFormData] = useState({expectGrade: "", explaination: ""})

  const sendNoti = async (receiver, assignment_name, message) => {

    //When a teacher finalizes a grade composition,
    //create notifications to all students in the class
    const title = `New grade review request of Assignment: ${assignment_name}`;
    const content = message;
    const receivers = receiver.map(item => ({external_id: item.toString()}));

    //console.log(receivers);
    const response = await SendNotification.sendNotification(title, content, receivers)
    
    //console.log("Notification APi response:", response)
    if(response.status === 201) {
      console.log("Notification sent successfully")
    }
    else {
      console.log("Notification failed", response)
    }
}
  const handleSubmit = async e => {
      const submitData = {...formData, assignmentID: id, classroomID: params.classroomId}
      const response = await classroomAPI.createGradeReviewRequest(submitData)
      if(response.ok) {
        console.log("OK")
        let data_0 = await classroomAPI.getUsersThatHasRole(params.classroomId, 1);
        let teacher_list_id = await data_0.json();
        let id_list = teacher_list_id.map(item => item.id);
        console.log("id_list: ",id_list);
        sendNoti(id_list, assignmentName, formData.explaination)
      }
      else if(response.status === 500) {
        console.log("You have create a grade review for this assignment already")
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