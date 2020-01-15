import React from 'react';
import { useHistory } from 'react-router-dom';

import './signup.scss';


import { EMAIL_REGEX, CPF_REGEX, LOGIN_ROUTE } from '../../constants'

import { Formik } from 'formik';
import {api} from '../../api'

import UserForm from '../../components/user-form/user-form.component';

const initialValues = { 
  name: '',  
  cpf: '',
  email: '',
  password: '',
  confirmation: '',
}

function Signup () {

  let history = useHistory();

  const validation = values => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Obrigatório';
    }

    if (!values.email) {
      errors.email = 'Obrigatório';
    } else if (!EMAIL_REGEX.test(values.email.toLowerCase())){
      errors.email = 'Insira um email válido';
    }

    if (!values.cpf) {
      errors.cpf = 'Obrigatório';      
    } else if (!CPF_REGEX.test(values.cpf)){
      errors.cpf = 'CPF inválido';      
    }

    if (!values.password) {
      errors.password = 'Cadastre uma senha';

    } else if (!values.confirmation) {
      errors.password = 'Confirme sua senha';

    } else if (values.password !== values.confirmation)  {
      errors.password = 'Senha e confirmação precisam ser iguais';

    }

    return errors;
  }

  const goToLogin = () => history.push(LOGIN_ROUTE) 

  return (
    <div className="Signup">
      <div className="container">
        <Formik
          initialValues={initialValues}
          validate={validation}
          validateOnMount={true}        
          onSubmit={(values, actions) => {
            
            const body = { ...values,  cpf: values.cpf.replace(/[^0-9]/g,'')}
            delete body.confirmation

            api.post('/users', body)
            .then(res => {
              goToLogin()
            })
            .catch(err => {
              console.error(err)
            })
          }}
        >
          {props => <UserForm {...props}/>}
        </Formik>      
        <p
          onClick={goToLogin} 
          className="cancel"
        >
          Cancelar
        </p>
      </div>
    </div>
  )

}

// Signup.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.element),
//     PropTypes.element,
//   ]),
// }

export default Signup;