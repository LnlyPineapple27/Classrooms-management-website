import { React, useState, useEffect, useContext } from "react";
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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavbarElContext } from "../../../Context/GlobalContext";
import ClassroomTabs from '../../ClassroomTabs/'

export default function ClassroomDetail() {
    const [,setNavbarEl] = useContext(NavbarElContext)
    const columns = ['Name', 'Role', 'Dob', 'Email']
    const codeToRole = ['Teacher', 'Teacher', 'Student']
    const [detail, setDetail] = useState({
        name: '',
        section:'',
        description:'',

        inviteLink:'',
        invitationURL: 'unknown',
    })
    const [email, setEmail] = useState('')
    const [openSendEmail, setOpenSendEmail] = useState(false)
    const [openInviteLink, setOpenInviteLink] = useState(false)
    const [rows, setRows] = useState([])
    const [select, setSelect] = useState(2)
    const [inviteLink, setInviteLink] = useState('')

    let params = useParams()
    useEffect(() => {
        let fetchData = async () => {
            let result = await classroomAPI.getClassroomDetail(params.classroomId)
            console.log(result)
            setDetail(result.data.classroomDetail ? result.data.classroomDetail : {})
            setInviteLink('2'+result.data.classroomDetail.inviteLink)
            setRows(result.data.userList ? result.data.userList : [])
            console.log(result.data.classroomDetail)
        }
        setNavbarEl({classroomTabs: (<ClassroomTabs value={0} classroomId={params.classroomId} />)})
        fetchData()
    },[params.classroomId, setNavbarEl])

    useEffect(() => {
        setInviteLink(`${select}${detail.inviteLink}`)
    }, [select, detail.inviteLink])

    const handleChange = (event) => {
        setSelect(event.target.value);
    };

    const handleClickOpenSendEmail = () => {
        setOpenSendEmail(true)

    };

    const handleCloseSendEmail = () => {
        setOpenSendEmail(false)
    };

    const handleClickOpenInviteLink = () => {
        setOpenInviteLink(true)
    };

    const handleCloseInviteLink = () => {
        setOpenInviteLink(false)
    };

    const handleSendEmail = () => {

        console.log('Submitted email: ' + email)
        let templatedEmail = {
            to_email: email,
            classroom_name: detail.name,
            invitation_link: detail.inviteLink,

            message: "Cheer! :>",
        }
        sendEmail(templatedEmail);
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
                <Button 
                className="page-container__button-group__button bg-primary" 
                onClick={()=>{}}
                >
                    Change Student Code
                </Button>
                <Button
                className="page-container__button-group__button bg-primary" 
                onClick={handleClickOpenSendEmail}
                >
                    Send Invite by Email
                </Button>
                <Button 
                className="page-container__button-group__button bg-primary" 
                onClick={handleClickOpenInviteLink}
                >
                    Invite Link
                </Button>

                <Dialog open={openSendEmail} onClose={handleCloseSendEmail}>

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
                        onChange={e => setEmail(e.target.value)}

                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseSendEmail}>Cancel</Button>
                    <Button onClick={handleSendEmail}>Send</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={openInviteLink} onClose={handleCloseInviteLink}>
                    <DialogTitle>Send Invitation</DialogTitle>
                    <DialogContent>
                    <FormControl fullWidth style={{marginTop:10,marginBottom:10}}>
                        <InputLabel id="demo-simple-select-label">Role</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={select}
                        label="Role"
                        onChange={handleChange}
                        >
                        <MenuItem value={1}>Teacher</MenuItem>
                        <MenuItem value={2}>Student</MenuItem>
                        </Select>
                    </FormControl>
                    <DialogContentText>
                        Invite Link: {inviteLink}
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleCloseInviteLink}>Cancel</Button>
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
                            <TableCell align="right">{row.Users.dob.split('T')[0]}</TableCell>
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