import { React, useEffect, useState, forwardRef, Fragment } from 'react'
import { Link } from 'react-router-dom'
import accountAPI from '../../APIs/accountAPI'
import TableDashboard from '../Dashboard/TableDashboard'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from "@mui/material/Typography"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import InputBase from '@mui/material/InputBase'
import { Box, Tooltip } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import * as sIdAPI from '../../APIs/sidAPI'


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MySIDBox = forwardRef(props => {
    const { children } = props
    return(
        <Box 
            component="span" 
            sx={{                
                width:130, 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center',
                border: '1px solid grey',
                borderRadius: 1,
            }}
        >
            {children}
        </Box>
    )
})


export default function AccountsTable({ roles, sortProps, enableBan }) {
    const [data, setData] = useState([])
    const [backdropState, setBAckDropState] = useState({ content:"Fetching data from server ...", open: true })
    const [snackbarState, setSnackbarState] = useState({ severity:"info", open: false, content:"Loading data ..." })
    const [sIdList, setSIdList] = useState({})

    useEffect(() => {
        const codeToRole = ["Admin", "Lecturer", "Student"]

        const handleSaveSID = async (userId, event) => {
            setSnackbarState({
                severity: "info",
                content: "Saving ...",
                open: true
            })

            if(!event.target.value || event.target.value === "") return setSnackbarState({
                severity: "error",
                content: `Error: M T new SID`,
                open: true
            })

            let response = await sIdAPI.updateOrCreateIfNotExist(event.target.value, userId)
            if(response.ok) {
                setSIdList({...sIdList, [userId]: event.target.value})
                setSnackbarState({
                    severity: "success",
                    content: `Success ${response.status}: ${response.statusText}`,
                    open: true
                })
            }
            else {
                event.target.value = sIdList[userId]
                setSnackbarState({
                    severity: "error",
                    content: `Error ${response.status}: ${response.statusText}`,
                    open: true
                })
            }
        }
        
        const cookData = rawData => rawData.map(({accountID, userID, role, SID, ...item}) => ({
            id: accountID,
            SID: (
                <Tooltip placement='top' title="Click to edit. Auto save after out.">
                    <MySIDBox>
                        <InputBase 
                            placeholder={SID ?? "UNK"} 
                            inputProps={{ 'aria-label': 'change SID' }}
                            sx={{ mx: 1, flex: 1 }}
                            onBlur={e => handleSaveSID(userID, e)}
                        />
                        <InfoOutlinedIcon />
                    </MySIDBox>
                </Tooltip>
            ),
            ...item,
            role: codeToRole[role],
            detail: <Link to={`/profile/${userID}`}>Detail...</Link>,
            createdAt: item.createdAt.split("T")[0]
        }))

        const fetchData = async () => {
            setBAckDropState({ ...backdropState, open: true })
            let response = await accountAPI.getAll(roles)
            setBAckDropState({ ...backdropState, open: false })
            if(response.ok) {
                let rawData = await response.json()
                let cookedData = cookData(rawData)
                setSIdList(rawData.reduce((acc, curr) => ({...acc, [curr.accountID]: curr.SID}), {}))
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
            <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={snackbarState.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarState.severity}>
                    {snackbarState.content}
                </Alert>
            </Snackbar>
            <TableDashboard enableBan={enableBan} tableHeader={"Accounts"} data={data} isCrud={false} isManager={true} sortProps={sortProps} />
        </Fragment>
    )
}