import { React, useEffect, useState, forwardRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import TableDashboard from '../Dashboard/TableDashboard'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from "@mui/material/Typography"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import classroomAPI from '../../APIs/classroomAPI'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function ClassroomsTable() {
    const [data, setData] = useState([])
    const [backdropState, setBAckDropState] = useState({ content:"Fetching data from server ...", open: true })
    const [snackbarState, setSnackbarState] = useState({ severity:"info", open: false, content:"Loading data ..." })


    useEffect(() => {

        const cookData = rawData => rawData.map(({creatorID, creatorName, ...item}) => ({
            ...item,
            creator: <Link to={`/profile/${creatorID}`}>{creatorName}</Link>,
            detail: <Link to={`/classrooms/${item.id}`}>Detail ...</Link>,
            createdAt: item.createdAt.split("T")[0]
        }))

        const fetchData = async () => {
            setBAckDropState({ ...backdropState, open: true })
            let result = await classroomAPI.getAllClassrooms()
            setBAckDropState({ ...backdropState, open: false })
            if(result.isOk) {
                let cookedData = cookData(result.data)
                setData(cookedData)
                setSnackbarState({ severity: "success", content: "Data loaded.", open:true })
            }
            else {
                setSnackbarState({ 
                    severity: "error",
                    content: `Error ${result.status}: ${result.message}`,
                    open:true
                })
            }
        }
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarState({ ...snackbarState, open:false })
    }

    // eslint-disable-next-line no-unused-vars
    const handleOpenBackdrop = () => setBAckDropState({ ...backdropState, open: true })

    const handleCloseBackdrop = () => setBAckDropState({ ...backdropState, open: false })


    return (
        <Fragment>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropState.open}
                onClick={handleCloseBackdrop}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <Typography>{backdropState.content}</Typography>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={snackbarState.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarState.content}
                </Alert>
            </Snackbar>
            <TableDashboard 
                tableHeader={"Classrooms"} 
                data={data} 
                isCrud={false} 
                isManager={false} 
                sortProps={{ key:"createdAt", type:"date" }} 
            />
        </Fragment>
    )
}