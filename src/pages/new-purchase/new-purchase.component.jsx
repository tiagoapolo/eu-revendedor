import React, { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { updatePurchases, addPurchases, cleanError } from '../../actions/purchases.actions'
import { api } from '../../api'

import './new-purchase.scss';

import { DASHBOARD_ROUTE, status } from '../../constants'
import { Formik } from 'formik';
import PurchaseForm from '../../components/purchase-form/purchase-form.component';
import { connect } from 'react-redux';
import { toastAction } from '../../actions/toast.actions';

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
  loaded: store.purchasesState.loaded,
  loading: store.purchasesState.loading,
  purchases: store.purchasesState.purchases,
  purchaseError: store.purchasesState.error,
  userData: store.authState.userData,
});

const mapDispatchToProps = dispatch => {
  return {
    addPurchases: (args) => dispatch(addPurchases(args)),
    updatePurchases: (args) => dispatch(updatePurchases(args)),
    toastAction: (args) => dispatch(toastAction(args)),
    cleanError: (args) => dispatch(cleanError(args)),
  }
}

function NewPurchase ({
  addPurchases,
  purchases,
  updatePurchases,
  loaded,
  toastAction,
  cleanError,
  loading,
  purchaseError,
  userData,
}) {

  let history = useHistory();
  let match = useRouteMatch();

  const [statusList, setStatusList] = useState([]);
  const [initialValues, setInitialValue] = useState(stdValue);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setStatusList(status)
  }, [])

  useEffect(() => {
    if(match.params.item){
      const p = purchases.filter(purchase => purchase.id === match.params.item)[0] 

      if(p){
        setIsEditing(true)
        setInitialValue({...p, date: new Date(p.date) })
      } else {
        history.push(DASHBOARD_ROUTE)
      }
    }
  }, [match])
  

  useEffect(() => {

    if(!loaded && !loading && purchaseError){
      toastAction(purchaseError)
      cleanError() 
      setLoading(false)
      return
    }


  }, [purchaseError, loaded, loading])

  useEffect(() => {

    if(loaded && !loading && !purchaseError && isLoading){
      setLoading(false)
      goBack()

      return
    }

  }, [purchaseError, loaded, loading])

  const validation = values => {
    const errors = {};

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

            setLoading(true)
            if(isEditing)
              updatePurchases(values);
            else
              addPurchases({ ...values, user_id: userData.email });
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