import { React, useContext, useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';
import accountAPI from '../../../APIs/accountAPI'
import '../index.scss'
import { useNavigate } from "react-router-dom";
import GoogleLogin from '../GoogleLogin'
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '../../../Context/GlobalContext';


export default function LoginForm() {


    const [formData, setFormData] = useState({
        username: '',
        password: '',
        keepLogin: false,
    })

    const [, setAuth] = useContext(AuthContext)
    
    const navigate = useNavigate()

    const handleChange = name => event => {
        setFormData({ ...formData, [name]: event.target.value });
    }

    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

    const handleClick = async () => {
        //console.log(formData);
        if(formData.username.length > 0 && formData.password.length > 0){
            let resultAttempt = await accountAPI.login(formData);
            if (resultAttempt.status === 200) {
                console.log(resultAttempt.data);
                localStorage.setItem('token', resultAttempt.data.token);
                localStorage.setItem('account', JSON.stringify(resultAttempt.data.account));
                setAuth(true)
                const response = await accountAPI.getRole(resultAttempt.data.account.userID)
                console.log(response)
                if(!response.ok) return;
                const role = await response.json()
                console.log(role)
                if(role === 0) return navigate('/admin/dashboard', { replace: true })

                navigate("../classrooms", { replace: true });
            }
            else if(resultAttempt.status === 401) {
                alert('Invalid username or password');
            }
            else if(resultAttempt.status === 404) {
                alert('Some thing went wrong');
            }
            console.log('token is:' + localStorage.getItem('token'));
        }
        else alert('All fields must be filled');
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
                return <FormControlLabel key={keyitem} className='login-form__element' 
                    control={<Checkbox onChange={handleKeepLogin}/>} label="Keep Login" 
                    />;
            default:
                return {};
            
        }
    }

    useEffect(() => {
        console.log("login useEffect")
        const account = JSON.parse(localStorage.getItem('account'))
        if(!account) return
        console.log("logged in", account)
        
        const navigateUser = async account => {
            console.log("findRole ...")
            const accountID = account['id']
            console.log("account", accountID)
            const response = await accountAPI.getRole(accountID)
            console.log("response:", response)
            if(response.ok) {
                const role = await response.json()
                console.log("Role:",role)
                const desOf = ['/admin/dashboard', '/classrooms', '/classrooms']
                navigate(desOf[desOf.includes(desOf[Number(role)]) ? role : 2], { replace: true })
            }
        }

        navigateUser(account)

    }, [])

    return (
        <div className="form-container">
            <FormControl className='login-form'>
                <h1 className='text-center login-form__element' style={{width:'100%', textAlign: 'center'}}>Login</h1>
            
                {Object.keys(formData).map(key => (renderItems(key)))}

                <div className="text-center">
                    <p className="login-form__register-text">
                        No account? <Link to='/register'>Register</Link>
                    </p>
                    <p className="login-form__register-text">
                        Forgot password? <Link to='/forgot/password'>Send email</Link>
                    </p>
                </div>
                <Button startIcon={<LoginIcon />} className='login-form__element login-form__button' type="button" onClick={handleClick}>Login</Button>
                <GoogleLogin />
            </FormControl>
        </div>
    )
}