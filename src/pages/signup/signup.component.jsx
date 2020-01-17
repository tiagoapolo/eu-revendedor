import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { addUser, cleanError } from '../../actions/users.actions'
import { connect } from 'react-redux';

import './signup.scss';

import { EMAIL_REGEX, CPF_REGEX, LOGIN_ROUTE } from '../../constants'
import { Formik } from 'formik';
import UserForm from '../../components/user-form/user-form.component';
import { toastAction } from '../../actions/toast.actions';

const initialValues = { 
  name: '',  
  cpf: '',
  email: '',
  password: '',
  confirmation: '',
}

const mapStateToProps = store => ({
  error: store.usersState.error,
  loaded: store.usersState.loaded,
  loading: store.usersState.loading,
});

const mapDispatchToProps = dispatch => {
  return {
    addUser: (args) => dispatch(addUser(args)),
    toastAction: (args) => dispatch(toastAction(args)),
    cleanError: (args) => dispatch(cleanError(args)),
  }
}

function Signup ({
  addUser,
  error,
  cleanError,
  toastAction,
  loaded,
  loading,
}) {

  let history = useHistory();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {

    if(!loaded && !loading && error){
      toastAction(error)
      cleanError()
      setLoading(false)
      return
    }

  }, [error, loaded, loading])

  useEffect(() => {

    if(loaded && !loading && !error && isLoading){
      setLoading(false)
      cleanError()
      goToLogin()

      return
    }

  }, [error, loaded, loading])

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

            addUser(body)  
            setLoading(true)          

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

export default  connect(mapStateToProps, mapDispatchToProps)(Signup);