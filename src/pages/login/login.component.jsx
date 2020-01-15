import React from 'react';
import { useHistory } from 'react-router-dom';

import './login.scss';
import LoginForm from '../../components/login-form/login-form.component';
import Logo from '../../components/logo/logo.component';

function Login () {

  let history = useHistory();

  const goToInfo = () => history.push('/developer')

  return (
    <div className="Login">
      <div className="container">
        <Logo/>
        <LoginForm/>
      </div>
      <div className="bottom">
        <p onClick={goToInfo} className="contact">Contato do desenvolvedor</p>
      </div>
    </div>
  )

}

export default Login;