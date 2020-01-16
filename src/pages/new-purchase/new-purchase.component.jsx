import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { updatePurchases, addPurchases } from '../../actions/purchases.actions'
import { api } from '../../api'

import './new-purchase.scss';

import { DASHBOARD_ROUTE } from '../../constants'
import { Formik } from 'formik';
import PurchaseForm from '../../components/purchase-form/purchase-form.component';
import { connect } from 'react-redux';

const stdValue = { 
  id: '',  
  user_id: '',
  value: '',
  date: new Date(),
  cashback_percentage: '',
  cashback: '',
  status: '',
}

const mapStateToProps = store => ({
  isFetching: store.purchasesState.isFetching,
  purchaseError: store.purchasesState.error,
  userData: store.authState.userData,
});

const mapDispatchToProps = dispatch => {
  return {
    addPurchases: (args) => dispatch(addPurchases(args)),
    updatePurchases: (args) => dispatch(updatePurchases(args)),
  }
}

function NewPurchase ({
  addPurchases,
  getPurchases,
  updatePurchases,
  isFetching,
  purchaseError,
  userData,
}) {

  let history = useHistory();
  let match = useRouteMatch();

  const [isLoading, setIsLoading] = useState(false);
  const [statusList, setStatusList] = useState([]);
  const [initialValues, setInitialValue] = useState(stdValue);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    api.get('/status')
    .then(res => res.data)
    .then(data => setStatusList(data))
    .catch(err => console.error(err))

  }, [])

  useEffect(() => {
    if(match.params.item){
      api.get(`/purchases/${match.params.item}`)
      .then(res => res.data)
      .then(data => {
        setIsEditing(true)
        setInitialValue({...data, date: new Date(data.date) })
      })
      .catch(err => console.error(err))
    }
  }, [match])

  useEffect(() => {
    if(isLoading && purchaseError) {
      setIsLoading(false)
      
    } else if (!isFetching && isLoading){
      setIsLoading(false)
      goBack();
    }
  }, [isFetching, isLoading, purchaseError])

  const validation = values => {
    const errors = {};

    console.log(values)

    if (!values.id) {
      errors.id = 'Obrigatório';
    }

    if (!values.value) {
      errors.value = 'Obrigatório';
    } 

    if (!values.date) {
      errors.date = 'Obrigatório';
    }

    if (!values.status) {
      errors.status = 'Obrigatório';
    }

    return errors;
  }

  const goBack = () => history.push(DASHBOARD_ROUTE) 

  return (
    <div className="NewPurchase">
      <div className="form-container">
        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validate={validation}
          validateOnMount={true}        
          onSubmit={(values, actions) => {
  
            setIsLoading(true);            
            if(isEditing)
              updatePurchases(values);
            else
              addPurchases({ ...values, user_id: userData.id });

          }}
        >
          {props => 
            <PurchaseForm 
              {...props}
              statusList={statusList}
              onCancel={goBack}
              editing={isEditing}
            />}
        </Formik>      
      </div>
    </div>
  )

}


export default connect(mapStateToProps, mapDispatchToProps)(NewPurchase);