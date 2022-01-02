import { React, useEffect, useState, forwardRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import accountAPI from '../../APIs/accountAPI'
import TableDashboard from '../Dashboard/TableDashboard'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from "@mui/material/Typography"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function AccountsTable({ role, sortProps }) {
    const [data, setData] = useState([])
    const [backdropState, setBAckDropState] = useState({ content:"Fetching data from server ...", open: true })
    const [snackbarState, setSnackbarState] = useState({ severity:"info", open: false, content:"Loading data ..." })


    useEffect(() => {
        const codeToRole = ["Admin", "Lecturer", "Student"]

        const cookData = rawData => rawData.map(({accountID, userID, role, ...item}) => ({
            ...item,
            id: accountID,
            role: codeToRole[role],
            detail: <Link to={`/profile/${userID}`}>Detail...</Link>,
            createdAt: item.createdAt.split("T")[0]
        }))

        const fetchData = async () => {
            setBAckDropState({ ...backdropState, open: true })
            let response = await accountAPI.getAll(role)
            setBAckDropState({ ...backdropState, open: false })
            if(response.ok) {
                let rawData = await response.json()
                let cookedData = cookData(rawData)
                setData(cookedData)
                setSnackbarState({ severity: "success", content: "Data loaded.", open:true })
            }
            else {
                setSnackbarState({ 
                    severity: "error",
                    content: `Error ${response.status}: ${response.statusText}`,
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
            <TableDashboard tableHeader={"Accounts"} data={data} isCrud={false} isManager={true} sortProps={sortProps} />
        </Fragment>
    )
}