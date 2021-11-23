import React from 'react';
import { useGoogleLogin } from 'react-google-login';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import '../index.scss'
import socialAuthentication from '../../../APIs/socialAuthentication'
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
const clientId = '757213109795-g8fjmjfue5p2h6ehsobv7fc6t3ovc4o3.apps.googleusercontent.com';

function GoogleLogin() {
  const navigate = useNavigate();
  const onSuccess = async (res) => {
    //console.log('Login Success: currentUser:', res.profileObj);
    console.log(res.profileObj);
    alert(
      `Logged in successfully, welcome ${res.profileObj.name}.`
    );
    //refreshTokenSetup(res);
    let resultAttempt = await socialAuthentication.googleAuthentication(res.tokenId);
    if (resultAttempt.status === 200) {
        //console.log(resultAttempt.data);
        localStorage.setItem('token', resultAttempt.data.token);
        localStorage.setItem('account', JSON.stringify(resultAttempt.data.account));
        navigate("../classrooms", { replace: true });
    }
    else if(resultAttempt.status === 401) {
        alert('Invalid token');
    }
    else if(resultAttempt.status === 404) {
        alert('Some thing went wrong');
    }
    console.log('token is:' + localStorage.getItem('token'));
  };
  const onFailure = (res) => {
    console.log('Login failed: res:', res);
  }
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: false,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
      <Button 
        startIcon={<GoogleIcon />}
        className='login-form__element login-form__button--google'
        onClick={signIn}>
        Login with Google
      </Button>
  );
}

export default GoogleLogin;