import { React, useState } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

import '../index.scss'

export default function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        keepLogin: false,
    })

    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value });
    }

    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    const handleClick = () => {
        console.log(formData);
    }
    const handleKeepLogin = (event) => {
        setFormData({ ...formData, keepLogin: event.target.checked });
    }
    return (
        <FormControl className='login-form' sx={{width: "100%", mt: "2rem"}}>
            <h1 className='text-center login-form__element' style={{width:'100%', textAlign: 'center'}}>Login</h1>
            {Object.keys(formData).map(key => (
                    key !== 'keepLogin' && (<TextField
                        key={key}
                        id={`tf_${key}`}
                        label={capitalize(key)}
                        type="Text"
                        autoComplete={`Enter ${capitalize(key)}`}
                        className='login-form__text-field login-form__element'
                        onChange={handleChange(key)}
                    />)
            ))}
            <FormControlLabel className='login-form__element' control={<Checkbox onChange={handleKeepLogin}/>} label="Keep Login" />
            <div className="text-center">
                <p className="login-form__register-text">
                    No account? <Link to='/register'>Register</Link>
                </p>
            </div>
            <Button className='login-form__element login-form__button' type="button" onClick={handleClick}>Login</Button>
        </FormControl>
    )
}