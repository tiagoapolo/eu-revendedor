import React from 'react';


import './custom-button.scss';

function CustomButton (props) {

  const variantStyle = (variant) => {
    const styles = {
      'primary': 'primary',
      'secondary': 'secondary',
      'outline': 'outline',
      'warning': 'warning',
      'danger': 'danger',
      'gradient': 'gradient',
      'default': 'primary'
    };
    return styles[variant] || styles['default'];
  }
  
  return (
    <button 
      type={props.type}
      disabled={props.disabled}
      onClick={props.onClick}
      className={`CustomButton ${variantStyle(props.variant)}`}
    >
      {props.children}
    </button>
  )

}


export default CustomButton;