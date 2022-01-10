import { React, useState, useEffect, useContext, forwardRef } from 'react'
import ClassroomCard from '../ClassroomCard'
import classroomAPI from '../../../APIs/classroomAPI';
import '../index.scss'
import { NewClassroomAddedContext } from '../../../Context/NewClassroomAddedContext';
import { NavbarElContext } from '../../../Context/GlobalContext';
import NavbarAddButton from '../../NavbarAddButton';
import { Stack, Button, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormModal from '../FormModal';
import accountAPI from '../../../APIs/accountAPI';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'



export default function ClassroomsList () {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [add,] = useContext(NewClassroomAddedContext)
    const [,setNavbarEl] = useContext(NavbarElContext)
    const [openAddModal, setOpenAddModal] = useState(false)
    const [openJoinModal, setOpenJoinModal] = useState(false)
    const [inviteCode, setInviteCode] = useState("")
    const [snackbarState, setSnackbarState] = useState({severity:"", content:"", open:false})
    const [refresh, setRefresh] = useState(false) 


    useEffect(() => {
        const cookData = raw => {
            return raw.map(item => ({...item, createdAt: item.createdAt.split("T")[0]}))
        }

        async function fetchData() {
            let userId = localStorage.getItem('account') ? JSON.parse(localStorage.getItem('account')).userID : null
            let result = await classroomAPI.getAllClassrooms(userId)
            setIsLoaded(true)
            let raw = result.data.classrooms
            let cooked = cookData(raw)    
            console.log(cooked)
            if (result.isOk)
                setItems(cooked)
            else
                setError(result)
        }
        setNavbarEl({addButton: (<NavbarAddButton ariaLabel='Add Classroom' onClick={() => setOpenAddModal(true)} />)})
        fetchData()
        
    }, [add, setNavbarEl, refresh])

    const toggleRefresh = () => setRefresh(!refresh)

    const handleCloseSnackbar = () => {
        setSnackbarState({...snackbarState, open: false})
    }

    const handleJoin = async () => {
        setSnackbarState({
            severity: 'warning',
            content: "Loading ...",
            open: true
        })
        const localAccount = JSON.parse(localStorage.getItem('account'))
        const userID = localAccount.userID
        const response = await accountAPI.joinClassroom(inviteCode, userID)
        response.isOk && toggleRefresh()
        setSnackbarState({
            severity: response.isOk ? 'success' : 'error',
            content: response.isOk ? "OK" : `${response.message}`,
            open: true
        })
    }


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <Stack sx={{ p: 1}} direction={"column"}>
                <Snackbar open={snackbarState.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity} sx={{ width: '100%' }}>
                        {snackbarState.content}
                    </Alert>
                </Snackbar>
                <Dialog open={openJoinModal} onClose={() => setOpenJoinModal(false)}>
                    <DialogTitle>Join</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To a classroom enter its invite code.
                        </DialogContentText>
                        <TextField
                            value={inviteCode}
                            autoFocus
                            margin="dense"
                            id="inviteCode"
                            label="Invite Code"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={e => setInviteCode(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenJoinModal(false)}>Cancel</Button>
                        <Button onClick={handleJoin}>Join</Button>
                    </DialogActions>
                </Dialog>
                <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"} spacing={2}>
                    <Typography varian="button" fontSize={28}>
                        <strong>Classrooms</strong>
                    </Typography>
                    <Button variant='contained' onClick={() => setOpenJoinModal(true)}>Join</Button>
                </Stack>
                <div 
                    className='classrooms-list' 
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        width: '100%',
                        marginLeft: '-10px',
                        padding: '1rem 0'
                    }}
                >

                    <FormModal 
                        header="Add Class"
                        openStatus={openAddModal}
                        handleClose={() => setOpenAddModal(false)}
                    />
                    {items.map((item, index) => (
                        <ClassroomCard
                            id={item.id}
                            key={item.id}
                            header={item.section}
                            title={item.name}
                            subTitle={item.description}
                            createdAt={item.createdAt}
                            creator={item.creator}
                            actionTitle='Detail'
                            imgHref={`https://picsum.photos/id/${index}/100/200`}
                        />
                    ))}
                </div>
            </Stack>
            )
    }
}