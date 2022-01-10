import { React, useEffect, useState, useContext } from 'react'
import classroomAPI from '../../APIs/classroomAPI'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useNavigate } from 'react-router-dom'
import accountAPI from '../../APIs/accountAPI'
import { AuthContext } from '../../Context/GlobalContext'
import LoginIcon from '@mui/icons-material/Login'
import { Box } from '@mui/material'
import ClassroomDetailCard from '../Classroom/ClassroomDetailCard'



export default function InvitedPage(props) {
    const [detail, setDetail] = useState({})
    const params = useParams()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [auth,] = useContext(AuthContext)

    useEffect(()=>{
        const fetchData = async () => {
            let result = await classroomAPI.getClassroomDetailGuest(params.inviteCode)
            setDetail({...result.data.classroomDetail, ...{
                members: result.data.userList.length,
                lecturers: result.data.userList.filter(item => item.Users.role === 1).map(item => item.Users.name)
            }})
            console.log(result.data)
        }
        fetchData()
    },[params.inviteCode])

    const handleOpen = () => {

        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleJoin = async () => {
        if(auth) {
            const localAccount = JSON.parse(localStorage.getItem('account'))
            const userID = localAccount.userID
            const result = await accountAPI.joinClassroom(params.inviteCode, userID)
            console.log(result)
            navigate('/',{replace:true})
        }
        else
            navigate('/login',{replace:true})
    }

    return (
        <Box sx={{ p: 2 }}>
            <ClassroomDetailCard
                id={detail.id}
                section={detail.section}
                description={detail.description}
                name={detail.name}
                members={detail.members}
                lecturers={detail.lecturers}
            />

            <Box sx={{ mt: 2 }}>
                <Button
                    variant='contained'
                    color='info'
                    onClick={handleOpen}
                    endIcon={<LoginIcon />}
                >
                    Join Class
                </Button>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Join Classroom</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {auth ? 'Click Join below to confirm join this class.' : 'You need Login to do this action.'}
                    </DialogContentText>
                </DialogContent>    
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleJoin}>{auth ? 'Join' : 'Login'}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
} 