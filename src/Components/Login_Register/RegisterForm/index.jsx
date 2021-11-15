import { React, useState } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import '../index.scss'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmedPassword: '',
        name: '',
        email: '',
        dob: '',
    })

    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value });
    }
    const handleChangeDate = date => {
        setFormData({ ...formData, dob: date });
    }
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    return (
        <FormControl className='login-form' sx={{width: "100%", mt: "2rem"}}>
            <h1 className='text-center login-form__element' style={{width:'100%', textAlign: 'center'}}>Register</h1>
            {Object.keys(formData).map(key => (
                    key !== 'keepLogin' && key !== 'dob' && (<TextField
                        key={key}
                        id={`tf_${key}`}
                        label={capitalize(key)}
                        type="Text"
                        autoComplete={`Enter ${capitalize(key)}`}
                        className='login-form__text-field login-form__element'
                        onChange={handleChange(key)}
                    />)
            ))}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    className='login-form__text-field login-form__element'
                    label="Date of birth"
                    id="tf_dob"
                    type="date"  
                    inputFormat="MM/dd/yyyy"
                    value={new Date().toJSON().slice(0,10).replace(/-/g,'/')}
                    onChange={handleChangeDate}
                    renderInput={(params) => <TextField  className='login-form__text-field login-form__element'
                                                label="Date of birth"
                                                id="tf_dob"
                                                {...params} />}
                />
           </LocalizationProvider>
        
            <FormControlLabel className='login-form__element' control={<Checkbox />} label="Keep Login" />
            <div className="text-center">
                <p className="login-form__register-text">
                    Have account? <Link to='/'>Login</Link>
                </p>
            </div>
            <Button className='login-form__element login-form__button' type="button">Register</Button>
        </FormControl>
    )
}