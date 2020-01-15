import React from 'react';
import PropTypes from 'prop-types';

import './input-field.scss';

function InputField (props) {
  
  return (
    <div className="InputField">
      <div className="container">
        <input 
          {...props}
        />
        <span className="highlight"/>
        <span className="bar"/>
        {!props.label 
          ? null
          : <label>{props.label}</label>}
      </div>
    </div>
  )

}

InputField.defaultProps = {
  type: "text",
  label: "",
  required: false,
}

InputField.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  valid: PropTypes.string,
  onChange: PropTypes.func,
}

export default InputField;