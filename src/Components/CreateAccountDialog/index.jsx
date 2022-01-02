import { useState, forwardRef, Fragment } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import accountAPI from '../../APIs/accountAPI'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function CreateAccountDialog({ status, handleClose}) {
    const [snackbarState, setSnackbarState] = useState({
        content: "OK",
        severity: "success",
        open: false
    })

    const [formData, setFormData] = useState({
        username:"",
        password:"",
        cPassword:"",
        email:"",
        sex:2,
        name:"",
        dob: new Date(),
        role:2
    })

    const handleSnackbarClose = () => setSnackbarState({ ...snackbarState, open:false })


    const getRoleTitle = ["Admin", "Lecturer", "Student"]

    // const getRoleCode = getRoleTitle.reduce((acc, curr, index) => ({...acc, [curr]: index}), {})

    const handleSave = async () => {
        console.log(formData)
        setSnackbarState({
            severity: "info",
            content: "Creating account ...",
            open: true
        })
        let response = await accountAPI.createAccount(formData)
        if(response.ok) {
            setSnackbarState({
                severity: "success",
                content: "Account created.",
                open: true
            })
        }
        else {
            setSnackbarState({
                severity: "error",
                content: `Error ${response.status}: ${response.statusText}`,
                open: true
            })
        }
        handleClose()
    }

    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value })
    }

    const handleChangeDate = date => {
        setFormData({ ...formData, dob: convertDate(date) })
    }

    const convertDate = (str) => {
        const date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2)
        return [date.getFullYear(), mnth, day].join("-")
    }

    return (
        <Fragment>
            <Snackbar 
                open={snackbarState.open} 
                autoHideDuration={5000} 
                onClose={handleSnackbarClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Alert onClose={handleClose} severity={snackbarState.severity} sx={{ width: '100%' }}>
                    {snackbarState.content}
                </Alert>
            </Snackbar>
            <Dialog open={status} onClose={handleClose}>
                <DialogTitle>Create Account</DialogTitle>
                
                <DialogContent>
                    <DialogContentText>
                        To create account, please enter all fields here.
                    </DialogContentText>
                    <TextField
                        margin="normal"
                        id="tf_username"
                        label="Username"
                        type="text"
                        fullWidth
                        onChange={handleChange("username")}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        id="tf_password"
                        label="Password"
                        type="password"
                        fullWidth
                        onChange={handleChange("password")}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        id="tf_cPassword"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        onChange={handleChange("cPassword")}
                        variant="outlined"
                    />

                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="il_role">Role</InputLabel>
                        <Select 
                            className='login-form__text-field login-form__element'
                            id="sl_role"
                            value={formData.sex}
                            labelId="il_role"
                            label="Sex"
                            onChange={handleChange("role")}
                        >
                            <MenuItem value={2}>{getRoleTitle[2]}</MenuItem>
                            <MenuItem value={1}>{getRoleTitle[1]}</MenuItem>
                            <MenuItem value={0}>{getRoleTitle[0]}</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField
                        margin="normal"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        onChange={handleChange("email")}
                        variant="outlined"
                    />
                    <TextField
                        margin="normal"
                        id="tf_name"
                        label="Name"
                        type="text"
                        fullWidth
                        onChange={handleChange("name")}
                        variant="outlined"
                    />

                    <FormControl margin="normal" fullWidth>
                        <InputLabel id="il_sex">Sex</InputLabel>
                        <Select 
                            className='login-form__text-field login-form__element'
                            id="sl_sex"
                            value={formData.sex}
                            labelId="il_sex"
                            label="Sex"
                            onChange={handleChange("sex")}
                        >
                            <MenuItem value={2}>Others</MenuItem>
                            <MenuItem value={1}>Female</MenuItem>
                            <MenuItem value={0}>Male</MenuItem>
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            type="date"   
                            value={formData.dob}
                            inputFormat="MM/dd/yyyy"
                            onChange={handleChangeDate}
                            renderInput={(params) => (
                                <TextField  
                                    label="Date of birth"
                                    id="tf_dob"
                                    margin="normal"
                                    {...params}
                                    fullWidth
                                />
                            )}
                        />
                    </LocalizationProvider>
                </DialogContent>
                
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='secondary'>Cancel</Button>
                    <Button onClick={handleSave} variant='contained' color='info'>Save</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}