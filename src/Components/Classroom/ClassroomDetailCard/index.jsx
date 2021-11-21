import {React,useEffect,useState,useContext} from 'react'
import classroomAPI from '../../../APIs/classroomAPI'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import accountAPI from '../../../APIs/accountAPI';
import { AuthContext } from '../../../Context/GlobalContext';

export default function ClassroomDetailCard() {
    const [detail, setDetail] = useState({})
    const params = useParams()
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()
    const [auth, setAuth] = useContext(AuthContext)

    useEffect(()=>{
        const fetchData = async () => {
            let result = await classroomAPI.getClassroomDetailGuest(params.inviteCode)
            setDetail(result.data)
        }
        fetchData()
    },[])

    const handleOpen = () => {

        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleJoin = async () => {
        if(auth) {
            let result = await accountAPI.joinClassroom(params.inviteCode, detail.id)
            console.log(result)
            navigate('/',{replace:true})
        }
        else
            navigate('/login',{replace:true})
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
            <div className="page-container__button-group">
                <Button
                className="page-container__button-group__button bg-primary" 
                onClick={handleOpen}
                >
                    Join
                </Button>
                    
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
            </div>
        </div>
    )
} 