import React from 'react';
import { useGoogleLogout } from 'react-google-login';

const clientId =
  '757213109795-g8fjmjfue5p2h6ehsobv7fc6t3ovc4o3.apps.googleusercontent.com';

function GoogleLogout() {
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully');
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut} className="login-form__element login-form__googlebutton">
      <img src="icons/google.svg" alt="google login" className="icon"></img>

      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default GoogleLogout;