import React from 'react';

import './user-form.scss';
import CustomButton from '../../components/custom-button/custom-buttom.component';
import InputField from '../../components/input-field/input-field.component';


export const cpfMask = value => {
  return value
    .replace(/\D/g, '') 
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})/, '$1-$2')
    .replace(/(-\d{2})\d+?$/, '$1') 
}

function UserForm (props) {

  const handleCPFMask = e => {
    props.setFieldValue && props.setFieldValue("cpf", cpfMask(e.target.value))     
  }

  return (
    <div className="UserForm">
      <h2>
        {!props.editing
          ? "Novo cadastro"
          : "Edite o cadastro"}
      </h2>
      <form onSubmit={props.handleSubmit}>
        <InputField
          type="text"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.name}
          label="nome completo"
          name="name"              
        />
        <div id="feedback">{props.errors.name}</div>
        <InputField
          type="text"
          onChange={handleCPFMask}
          onBlur={props.handleBlur}
          value={props.values.cpf}
          label="cpf"
          name="cpf"              
        />
        <div id="feedback">{props.errors.cpf}</div>
        <InputField
          type="email"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.email}
          label="email"
          name="email"              
        />            
        <div id="feedback">{props.errors.email}</div>
        <InputField
          type="password"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.password}
          label="Senha"
          name="password"
          autoComplete="new-password"              
        />            
        <InputField
          type="password"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.confirmation}
          label="Confirme sua senha"
          name="confirmation"
          autoComplete="new-password"              
        />          
        <div id="feedback">{props.errors.password}</div>
        <CustomButton 
          type="submit"
          disabled={(!props.isValid)}
        >
          Cadastrar
        </CustomButton>
      </form>
    </div>
  )

}

// UserForm.propTypes = {
//   children: PropTypes.oneOfType([
//     PropTypes.arrayOf(PropTypes.element),
//     PropTypes.element,
//   ]),
// }

export default UserForm;