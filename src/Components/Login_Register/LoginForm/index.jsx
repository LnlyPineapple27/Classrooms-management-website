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
    const renderItems = (keyitem) => {
        switch (keyitem) {
            case 'username':
                return <TextField required
                    className='login-form__text-field login-form__element'
                    key={keyitem}
                    id={`tf_${keyitem}`}
                    label={capitalize(keyitem)}
                    type="Text"
                    autoComplete={`Enter ${capitalize(keyitem)}`}
                    value={formData[keyitem]}
                    onChange={handleChange(keyitem)}
                />;
            case 'password':
                return <TextField required
                    className='login-form__text-field login-form__element'
                    key={keyitem}
                    id={`tf_${keyitem}`}
                    label={capitalize(keyitem)}
                    type="password"
                    autoComplete="current-password"
                    value={formData[keyitem]}
                    onChange={handleChange(keyitem)}
                />;

            case 'keepLogin':
                return <FormControlLabel className='login-form__element' 
                    control={<Checkbox onChange={handleKeepLogin}/>} label="Keep Login" 
                    />;
            default:
                return {};
            
        }
    }
    return (
        <div className="form-container">
            <FormControl className='login-form'>
                <h1 className='text-center login-form__element' style={{width:'100%', textAlign: 'center'}}>Login</h1>
                {/* {Object.keys(formData).map(key => (
                        key !== 'password' && key !== 'keepLogin' && (
                        <TextField required
                            className='login-form__text-field login-form__element'
                            key={key}
                            id={`tf_${key}`}
                            label={capitalize(key)}
                            type="Text"
                            autoComplete={`Enter ${capitalize(key)}`}
                            onChange={handleChange(key)}
                        />)
                ))} */}
                {Object.keys(formData).map(key => (renderItems(key)))}

                <div className="text-center">
                    <p className="login-form__register-text">
                        No account? <Link to='/register'>Register</Link>
                    </p>
                </div>
                <Button className='login-form__element login-form__button' type="button" onClick={handleClick}>Login</Button>
            </FormControl>
        </div>
    )
}