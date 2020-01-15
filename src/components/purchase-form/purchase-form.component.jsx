import React from 'react';


import CustomButton from '../custom-button/custom-buttom.component';
import InputField from '../input-field/input-field.component';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import './purchase-form.scss';


function PurchaseForm (props) {

  return (
    <div className="UserForm">
      <h2>
        {!props.editing
          ? "Nova Compra"
          : "Edite sua Compra"}
      </h2>
      <form onSubmit={props.handleSubmit}>
        <div className="combo">
          <div>
            <InputField
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.id}
              label="Código da compra"
              name="id"  
              disabled={props.editing}            
            />
            <div id="feedback">{props.errors.id}</div>
          </div>
          <div className="combo-date">
            <label>Data Da Compra</label>
            <DatePicker
              showPopperArrow={false}
              dateFormat="dd/MM/yyyy"
              popperPlacement="bottom-end"
              selected={props.values.date}
              onChange={date => props.setFieldValue("date", date)}
            />
            <div id="feedback">{props.errors.date}</div>
          </div>          
        </div>
        
        <InputField
          type="number"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.value}
          label="Valor"
          name="value" 
          min="0"            
        />
        <div id="feedback">{props.errors.value}</div>         
        <InputField
          type="number"
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.cashback_percentage}
          label="Percentual de cashback"
          name="cashback_percentage"
          min="0"
          max="100"
          step="1"
        />        
        <div id="feedback">{props.errors.cashback_percentage}</div>    
        <InputField
          type="number"          
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          value={props.values.cashback}
          label="Cashback"
          name="cashback"
          min="0"
          step=".01"
        />          
        <div id="feedback">{props.errors.cashback}</div>
        <select 
          value={props.values.status}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          className="status-chooser" 
          name="status"
        >
          <option value="">Selecione o estado da compra</option>
          {(props.statusList || [])            
            .map((status, idx) => (
              <option key={idx} value={status.name}>{status.name}</option>
            ))}
        </select>
        <div id="feedback">{props.errors.status}</div>
        <div className="actions">
          <CustomButton 
            type="submit"
            disabled={(!props.isValid)}
          >
            Salvar
          </CustomButton>
          <CustomButton 
            variant="secondary"
            onClick={props.onCancel}
          >
            Cancelar
          </CustomButton>
        </div>
      </form>
    </div>
  )

}

export default PurchaseForm;