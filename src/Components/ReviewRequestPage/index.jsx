import { useContext, useState, useEffect, forwardRef } from "react"
import { NavbarElContext } from "../../Context/GlobalContext"
import { 
    Backdrop, Box, Typography, Snackbar,
    Alert as MuiAlert, Stack
} from '@mui/material'
import { useParams } from "react-router-dom"
import CircularProgress from '@mui/material/CircularProgress'
import ClassroomTabs from '../ClassroomTabs'
import ReviewRequestCard from "../ReviewRequestCard";
import classroomAPI from "../../APIs/classroomAPI"

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const mockRequest = [
    {
        id: "1",
        name:45,
        studentID: "sid",
        assignmentID: "aid",
        expectGrade: "expect",
        explaination: "explain",
        realGrade: "real",
        assignmentName: "name",
        createdAt: "created at",
        maxGrade: 45,
    },
    {
        name:45,
        id: "1",
        assignmentName: "name",
        studentID: "sid",
        assignmentID: "aid",
        expectGrade: "expect",
        explaination: "explain",
        createdAt: "created at",
        maxGrade: 45,
        realGrade: "real",
    },
    {
        name:45,
        id: "1",
        studentID: "sid",
        assignmentID: "aid",
        expectGrade: "expect",
        explaination: "explain",
        maxGrade: 45,
        createdAt: "created at",
        assignmentName: "name",
        realGrade: "real"
    },
    {
        name:45,
        id: "1",
        studentID: "sid",
        assignmentID: "aid",
        expectGrade: "expect",
        maxGrade: 45,
        explaination: "explain",
        createdAt: "created at",
        assignmentName: "name",
        realGrade: "real"
    }
]


export default function ReviewRequestPage() {
    const [,setNavbarEl] = useContext(NavbarElContext)
    const [requests, setRequests] = useState([])
    const [loading, setLoading] = useState(false)
    const [snackbarState, setSnackbarState] = useState({severity:"", content:"", open:false})
    const [refresh, setRefresh] = useState(false)
    const params = useParams()

    const handleSnackbarClose = () => setSnackbarState({...snackbarState, open: false})

    const snackbarLoading = () => {
        setSnackbarState({
            severity: "info",
            content: "Loading ...",
            open:true
        })
    }

    const snackbarSuccess = () => {
        setSnackbarState({
            severity: "success",
            content: "Success",
            open:true
        })
    }

    const snackbarError = response => {
        setSnackbarState({
            severity: "error",
            content: `Error ${response.status}: ${response.statusText}`,
            open:true
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const userID = JSON.parse(localStorage.getItem("account")).userID
            const response = await classroomAPI.getGradeReviewRequest(userID, params.classroomId)
            setLoading(false)
            if(response.ok) {
                snackbarSuccess()
                const rawData = await response.json()
                console.log(rawData)
                setRequests(rawData)
            }
            else {
                snackbarError(response)
            }
        }
       
        fetchData()
        setNavbarEl({
            classroomTabs: (<ClassroomTabs value={3} classroomId={params.classroomId} />),
        })
    },[refresh])

    return (
      <Box component="div">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
                onClick={() => setLoading(false)}
            >
                <Box component="div">
                    <Typography> Fetching data from API ... </Typography>
                    <CircularProgress color="inherit" />
                </Box>
            </Backdrop>
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "right"}} open={snackbarState.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.content}
                </Alert>
            </Snackbar>
            <Stack direction="column" spacing={3} sx={{ p:2 }}>
                {requests.map(req => (
                    <ReviewRequestCard 
                        snackbar={{
                            error: snackbarError,
                            success: snackbarSuccess,
                            loading: snackbarLoading
                        }} 
                        key={`rrc_${req.id}`} 
                        reviewReq={req}
                        refreshToggle={() => setRefresh(!refresh)}
                    />
                ))}
            </Stack>
      </Box>
    )
}