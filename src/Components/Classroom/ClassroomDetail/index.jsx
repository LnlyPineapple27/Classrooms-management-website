import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import classroomAPI from "../../../APIs/classroomAPI";
import { Button } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import '../index.scss'
import sendEmail from '../../sendEmail'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ClassroomDetail() {
    const columns = ['Name', 'Role', 'Dob', 'Email']
    const codeToRole = ['Teacher', 'Teacher', 'Student']
    const [detail, setDetail] = useState({
        name: '',
        section:'',
        description:'',
        open: false,
        emailToInvite: '',
        invitationURL: 'unknown',
    })
    const [rows, setRows] = useState([])
    let params = useParams()
    useEffect(() => {
        let fetchData = async () => {
            let result = await classroomAPI.getClassroomDetail(params.classroomId)
            console.log(result)
            setDetail(result.data.classroomDetail ? result.data.classroomDetail : {})
            setRows(result.data.userList ? result.data.userList : [])
        }
        fetchData()
    },[])

    const handleClickOpen = () => {
        setDetail({ ...detail, open: true })
    };

    const handleClose = () => {
        setDetail({ ...detail, open: false })
    };
    const handleSendEmail = () => {
        console.log('Submitted email: ' + detail.emailToInvite)
        let templatedEmail = {
            to_email: detail.emailToInvite,
            classroom_name: detail.name,
            invitation_link: detail.invitationURL,
            message: "Cheer! :>",
        }
        sendEmail(templatedEmail);
    }

    const handleGetInvitationURL = () => {
        alert('Invite link: ' + detail.invitationURL)
    }

    return (
        <div className="page-container">
            <div className="page-container__classroom-detail d-flex flex-column align-center">
                <h1 className="page-title">Classroom Detail</h1>
                <div className="classroom-detail">
                    <p className="classroom-detail__element classroom-name">
                        <span className="classroom-detail__element__label">Name: </span>
                        <span className="classroom-detail__element__content">{detail.name}</span>
                    </p>
                    <p className="classroom-detail__element classroom-section">
                        <span className="classroom-detail__element__label">Section: </span>
                        <span className="classroom-detail__element__content">{detail.section}</span>
                    </p>
                    <p className="classroom-detail__element classroom-description">
                        <span className="classroom-detail__element__label">Description: </span>
                        <span className="classroom-detail__element__content">{detail.description}</span>
                    </p>
                </div>
            </div>
            {/* <div className="page-container__button-group">
                <Button className="page-container__button-group__button bg-primary" onClick={handleClickOpen}>Create Invite by Email</Button>
                <Button className="page-container__button-group__button bg-primary" onClick={handleGetInvitationURL}>Create Invite Link</Button>
            </div> */}
            <div className="page-container__button-group">
                <Button className="page-container__button-group__button bg-primary" onClick={handleClickOpen}>
                    Create Invite by Email
                </Button>
                <Button className="page-container__button-group__button bg-primary" onClick={handleGetInvitationURL}>Create Invite Link</Button>

                <Dialog open={detail.open} onClose={handleClose}>
                    <DialogTitle>Send Invitation</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Enter an email to send invitation!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setDetail({ ...detail, emailToInvite: e.target.value })}
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSendEmail}>Send</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className="page-container__users-list">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="users table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                {columns.map(item => <TableCell align="right">{item}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell >{index}</TableCell>
                            <TableCell component="th" scope="row" align="right"><strong>{row.Users.name}    </strong></TableCell>
                            <TableCell align="right">{codeToRole[row.Users.UserClassroom.role]}</TableCell>
                            <TableCell align="right">{row.Users.dob}</TableCell>
                            <TableCell align="right">{row.Users.email}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>    
        </div> 
    )    
}