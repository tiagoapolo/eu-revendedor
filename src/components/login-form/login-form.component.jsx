import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { authenticate, cleanError } from '../../actions/auth.actions'
import { toastAction } from '../../actions/toast.actions'

import {
  DASHBOARD_ROUTE,
  REGISTER_ROUTE,
  EMAIL_REGEX
} from "../../constants"

import './login-form.scss';
import InputField from '../../components/input-field/input-field.component';
import CustomButton from '../custom-button/custom-buttom.component';

const mapStateToProps = store => ({
  loggedIn: store.authState.loggedIn,
  loading: store.authState.loading,
  loaded: store.authState.loaded,
  userData: store.authState.userData,
  error: store.authState.error,
});


const mapDispatchToProps = dispatch => {
  return {
    authenticate: (args) => dispatch(authenticate(args)),
    toastAction: (args) => dispatch(toastAction(args)),
    cleanError: (args) => dispatch(cleanError(args)),
  }
}

function LoginForm({
  loading,
  loaded,
  cleanError,
  toastAction,
  authenticate,
  userData,
  error,
}) {

  let history = useHistory();

  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });


  useEffect(() => {
    
    if (error && !loading && !loaded) {
      console.log('error', error)

      toastAction(error)
      cleanError()
      return
    }

  }, [error])


  useEffect(() => {

    if(!userData.email)
      return
    
    if(!error && loaded && !loading && userData.email) {    
      history.push(DASHBOARD_ROUTE);      
    }

  }, [loading, loaded, userData])

  const handleChange = event => {
     
    
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit =  e => { 

    e.preventDefault();
    authenticate(userCredentials)    
  }

  const goToRegister = () => {
    history.push(REGISTER_ROUTE)
  }

  const validate = () => {

    const errors = {}

    if(!userCredentials.email.length)
      errors.email = "Obrigatório"
    else if (!EMAIL_REGEX.test(userCredentials.email))
      errors.email = "Email inválido"

    if(!userCredentials.password.length)
      errors.password = "Obrigatório"

    return errors

  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <InputField
        name="email" 
        type="email" 
        label="Email"         
        onChange={handleChange}
        required
      />
      <p className="feedback">{validate().email}</p>
      <InputField
        name="password" 
        type="password"
        label="Senha" 
        onChange={handleChange}
        required
      />
      <p className="feedback">{validate().password}</p>
      <CustomButton 
        variant="gradient"
        type="submit"
        disabled={loading || Object.keys(validate()).length}
      >
        {!loading
          ? "Login"
          : "Autenticando"}
      </CustomButton>
      <div className="register">
        <p onClick={goToRegister}>Cadastre-se aqui</p>
      </div>      
    </form>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);