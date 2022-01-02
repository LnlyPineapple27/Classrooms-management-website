import { React, useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import classroomAPI from "../../../APIs/classroomAPI"
import { Button } from "@mui/material"
import '../index.scss'
import sendEmail from '../../sendEmail'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { NavbarElContext } from "../../../Context/GlobalContext"
import ClassroomTabs from '../../ClassroomTabs/'
import ClassroomDetailCard from "../ClassroomDetailCard"
import TableDashboard from "../../Dashboard/TableDashboard"


export default function ClassroomDetail() {
    const [,setNavbarEl] = useContext(NavbarElContext)
    const columns = ['Name', 'Role', 'Dob', 'Email']
    const codeToRole = ['Admin', 'Teacher', 'Student']
    const [detail, setDetail] = useState({
        name: '',
        section:'',
        description:'',
    })
    const [email, setEmail] = useState('')
    const [openSendEmail, setOpenSendEmail] = useState(false)
    const [openInviteLink, setOpenInviteLink] = useState(false)
    const [rows, setRows] = useState([])
    const [select, setSelect] = useState(2)
    const [inviteLink, setInviteLink] = useState('')
    const [role, setRole] = useState(2)
    const [openSid, setOpenSid] = useState(false)
    const [sid, setSid] = useState(null)

    let params = useParams()
    useEffect(() => {
        let fetchData = async () => {
            let result = await classroomAPI.getClassroomDetail(params.classroomId)
            let fDetail = result.data.classroomDetail ? result.data.classroomDetail : {}
            let fRows = result.data.userList ? result.data.userList : []
            setInviteLink(`${window.document.location.hostname}/invite/2`+result.data.classroomDetail.inviteLink)
            let cookedFRows = fRows.map(row => ({...row.Users, role: codeToRole[row.Users.role]})).map(({UserClassroom, ...item}) => item)
            setRows(cookedFRows)
            console.log(cookedFRows)
            let lecturerList = cookedFRows.filter(row => row.role === codeToRole[1]).map(row => row.name)
            lecturerList = lecturerList.length > 0 ? lecturerList : ["UNK"]
            setDetail({...fDetail, ...{
                members: cookedFRows.length,
                lecturers: lecturerList
            }})
            const userId = JSON.parse(localStorage.getItem('account')) ? JSON.parse(localStorage.getItem('account')).userID : 'a'
            const fetchRole = await classroomAPI.getRole(params.classroomId, userId)
            if (fetchRole.ok) {
                const userRole = await fetchRole.json()
                setRole(userRole)
            }

        }
        setNavbarEl({
            classroomTabs: (<ClassroomTabs value={0} classroomId={params.classroomId} />),
        })
        fetchData()
    },[params.classroomId, setNavbarEl])

    useEffect(() => {
        setInviteLink(`${window.document.location.hostname}/invite/${select}${detail.inviteLink}`)
    }, [select, detail.inviteLink])

    const handleChange = (event) => {
        setSelect(event.target.value)
    }

    const handleClickOpenSendEmail = () => {
        setOpenSendEmail(true)

    }

    const handleCloseSendEmail = () => {
        setOpenSendEmail(false)
    }

    const handleClickOpenInviteLink = () => {
        setOpenInviteLink(true)
    }

    const handleCloseInviteLink = () => {
        setOpenInviteLink(false)
    }

    const handleSendEmail = () => {

        console.log('Submitted email: ' + email)
        let templatedEmail = {
            to_email: email,
            classroom_name: detail.name,
            invitation_link: inviteLink,

            message: "Cheer! :>",
        }
        sendEmail(templatedEmail)
    }

    const handleChangeSI = async () => {
        const profile = JSON.parse(localStorage.getItem('account'))
        const data = {
            classroomId: params.classroomId,
            userId: profile.userID,
            sid: sid,
            name: profile.name
        }
        const res = await classroomAPI.changeSid(data)
        const resOk = res.ok
        const resStatus = res.status
        const resJson = await res.json()
        const resMsg = resJson.msg
        if(!resOk) {
            alert(`Error ${resStatus}: ${resMsg}`)
        }
        else alert(`Success: ${resMsg}`)
        setOpenSid(false)
    }

    return (
        <div className="page-container">
            <ClassroomDetailCard 
                id={detail.id} 
                name={detail.name} 
                section={detail.section}
                description={detail.description}
                members={detail.members}
                lecturers={detail.lecturers}
            />
            <div className="page-container__button-group">
                {role === 2 && 
                (<Button 
                className="page-container__button-group__button bg-primary" 
                onClick={() => setOpenSid(true)}
                >
                    Change Student ID
                </Button>)}
                
                {role < 2 && (
                    <Button
                    className="page-container__button-group__button bg-primary" 
                    onClick={handleClickOpenSendEmail}
                    >
                        Send Invite by Email
                    </Button>
                )}
                {role < 2 && (
                    <Button 
                    className="page-container__button-group__button bg-primary" 
                    onClick={handleClickOpenInviteLink}
                    >
                        Invite Link
                    </Button>
                )}

                <Dialog open={openSid} onClose={() => setOpenSid(false)}>
                    <DialogTitle>Change SID</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Enter SID to set or change SID
                            </DialogContentText>
                            <TextField
                                autoFocus
                                id="sid"
                                label="SID"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={e => setSid(e.target.value)}
                                placeholder="SID..."
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenSid(false)}>Cancel</Button>
                            <Button onClick={handleChangeSI}>Change</Button>
                        </DialogActions>
                </Dialog>

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
            <TableDashboard tableHeader="Members" data={rows} isCrud={false} isManager={false}/>
        </div> 
    )    
}