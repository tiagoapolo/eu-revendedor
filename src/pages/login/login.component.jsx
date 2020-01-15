import React from 'react';

import './login.scss';
import LoginForm from '../../components/login-form/login-form.component';
import Logo from '../../components/logo/logo.component';

function Login () {

  return (
    <div className="Login">
      <div className="container">
        <Logo/>
        <LoginForm/>
      </div>
    </div>
  )

}

export default Login;