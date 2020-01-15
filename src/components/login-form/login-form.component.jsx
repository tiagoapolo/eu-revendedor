import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux';
import { authenticate } from '../../actions/auth.actions'

import {
  DASHBOARD_ROUTE,
  REGISTER_ROUTE
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

  const handleSubmit = async e => {
    e.preventDefault();
    setError(null)
    setLoading(true)
    authenticate(userCredentials)
  }

  const goToRegister = () => {
    history.push(REGISTER_ROUTE)
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <InputField
        name="email" 
        type="email" 
        label="Email" 
        onChange={handleChange}
      />
      <InputField
        name="password" 
        type="password"
        label="Senha" 
        onChange={handleChange}
      />
      <CustomButton 
        variant="gradient"
        type="submit"
        disabled={isLoading}
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