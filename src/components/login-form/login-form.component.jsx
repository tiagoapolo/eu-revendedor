import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { authenticate } from '../../actions/auth.actions'

import {
  DASHBOARD_ROUTE,
  REGISTER_ROUTE,
  EMAIL_REGEX
} from "../../constants"

import './login-form.scss';
import InputField from '../../components/input-field/input-field.component';
import CustomButton from '../custom-button/custom-buttom.component';

const mapStateToProps = store => ({
  isFetching: store.authState.isFetching,
  userData: store.authState.userData,
  error: store.authState.error,
});


const mapDispatchToProps = dispatch => {
  return {
    authenticate: (args) => dispatch(authenticate(args)),
  }
}

function LoginForm({
  isFetching,
  authenticate,
  error,
}) {

  let history = useHistory();

  const [userCredentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [errorMsg, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    if(!isFetching && isLoading){      
      setTimeout(() => { 
        setLoading(false);
        history.push(DASHBOARD_ROUTE);
      },1000) 
    } else if (error) {
      setError(error)      
    }
    
  }, [isFetching, isLoading, error])

  const handleChange = event => {
     
    
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value })
  }

  const handleSubmit =  e => { 

    e.preventDefault();
    setError(null)
    setLoading(true)
    authenticate(userCredentials)
    validate()
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
        disabled={isLoading || Object.keys(validate()).length}
      >
        {!isLoading
          ? "Login"
          : "Autenticando"}
      </CustomButton>
      <div className="register">
        <p onClick={goToRegister}>Cadastre-se aqui</p>
      </div>
      <div className="error-feedback">
        <span>{errorMsg}</span>
      </div>      
    </form>
  )

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);