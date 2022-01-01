import { useState } from 'react'
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


export default function CreateAccountDialog({ status, handleClose}) {
    
    const [formData, setFormData] = useState({
        username:"",
        password:"",
        cPassword:"",
        email:"",
        sex:2,
        name:"",
        dob: new Date()
    })

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
                <Button onClick={handleClose} variant='contained' color='info'>Save</Button>
            </DialogActions>
        </Dialog>
    )
}