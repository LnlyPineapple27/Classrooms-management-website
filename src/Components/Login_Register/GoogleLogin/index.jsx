import React from 'react';
import { useGoogleLogin } from 'react-google-login';

// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';
const clientId =
  '757213109795-g8fjmjfue5p2h6ehsobv7fc6t3ovc4o3.apps.googleusercontent.com';

function GoogleLogin() {
  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', res.profileObj);
    alert(
      `Logged in successfully welcome ${res.profileObj.name} 😍.`
    );
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      `Failed to login.`
    );
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <button onClick={signIn} className="login-form__element login-form__googlebutton">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign in with Google</span>
    </button>
  );
}

export default GoogleLogin;