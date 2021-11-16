import { React, useState } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
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
        dob: new Date().toJSON().slice(0,10),
    })

    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value });
    }
    const handleChangeDate = date => {
        setFormData({ ...formData, dob: convertDate(date) });
    }
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    const convertDate = (str) => {
        const date = new Date(str), mnth = ("0" + (date.getMonth() + 1)).slice(-2), day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }
   
    
    const handleRegister = () => {
        if (formData.username.length > 0 && formData.password.length > 0 && formData.confirmedPassword.length > 0 && formData.name.length > 0 && formData.email.length > 0 && formData.dob.length > 0) {
            if (formData.password === formData.confirmedPassword) {
               // Proceed to register
                console.log(formData);
            }
            else alert('Password is not match');
        }
        else alert('All fields must be filled');
    }

    const renderItems = (keyitem) => {
        switch (keyitem) {
            case 'password':
            case 'confirmedPassword':
                return  <TextField required
                        className='login-form__text-field login-form__element'
                        key={keyitem}
                        id={`tf_${keyitem}`}
                        label={capitalize(keyitem)}
                        type="password"
                        autoComplete="current-password"
                        value = {formData[keyitem]}
                        onChange={handleChange(keyitem)}
                    />;
            case 'dob':
                return <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        className='login-form__text-field login-form__element'
                        key={keyitem}
                        label="Date of birth"
                        id="tf_dob"
                        type="date"   
                        value={formData.dob}
                        inputFormat="MM/dd/yyyy"
                        onChange={handleChangeDate}
                        renderInput={(params) => <TextField  
                                                    className='login-form__text-field login-form__element'
                                                    label="Date of birth"
                                                    id="tf_dob"
                                                    {...params} />}
                    />
                </LocalizationProvider>;
            default:
                return <TextField required
                        className='login-form__text-field login-form__element'
                        key={keyitem}
                        id={`tf_${keyitem}`}
                        label={capitalize(keyitem)}
                        type="Text"
                        autoComplete={`Enter ${capitalize(keyitem)}`}
                        value = {formData[keyitem]}
                        onChange={handleChange(keyitem)}/>;
        }
    }

    return (
        <div className="form-container">
            <FormControl className='login-form'>
                <h1 className='text-center login-form__element' style={{width:'100%', textAlign: 'center'}}>Register</h1>
                
                {Object.keys(formData).map(key => (renderItems(key)))}
                
                <div className="text-center">
                    <p className="login-form__register-text">
                        Have account? <Link to='/'>Login</Link>
                    </p>
                </div>
                <Button className='login-form__element login-form__button' type="button" onClick={handleRegister}>Register</Button>
            </FormControl>
        </div>
        
    )
}