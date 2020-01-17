import {
  RECEIVED_PURCHASE_ERROR,
  FETCHING_PURCHASES,
  FETCHED_PURCHASES,
  ADD_PURCHASES,
  ADDED_PURCHASES,
  UPDATING_PURCHASES,
  UPDATED_PURCHASES,
  DELETING_PURCHASES,
  DELETED_PURCHASES,
  RECEIVED_PURCHASE_ERROR_CLEAN,
} from '../constants';

import { api } from '../api';
import { Store } from '../store';

const beforeAction = type => ({
  type: type
});

const afterAction = (type, value) => ({
  type: type,
  newValue: value
});

const receivedError = err => ({
  type: RECEIVED_PURCHASE_ERROR,
  error: err
});

export const cleanError = () => ({
  type: RECEIVED_PURCHASE_ERROR_CLEAN,
});

export const getPurchases = () => {
  
  return dispatch => {
        
    dispatch(beforeAction(FETCHING_PURCHASES));

    return new Promise(resolve => {

      const purchases = Store.getState().purchasesState.purchases

      resolve(purchases)
      
    })
    .then(p => {
      dispatch(afterAction(FETCHED_PURCHASES,p))
    })
    .catch(err => {      
      dispatch(receivedError(err))
    })
  }
};

export const addPurchases = (body) => {
  
  return dispatch => {
        
    dispatch(beforeAction(ADD_PURCHASES));

    return new Promise((resolve, reject) => {

      const p = Store.getState().purchasesState.purchases.filter(purchase => purchase.id === body.id)      
      if(p.length)
        reject("Código de compra já cadastrado")      

      resolve(p[0])

    })
    .then(p => {
      dispatch(afterAction(ADDED_PURCHASES, body))
    })
    .catch(err => {
      dispatch(receivedError(err))
    })
  }
};

export const updatePurchases = (purchase) => {
  
  return dispatch => {
        
    dispatch(beforeAction(UPDATING_PURCHASES));

    dispatch(beforeAction(ADD_PURCHASES));

    return new Promise((resolve, reject) => {

      const p = Store.getState().purchasesState.purchases.filter(purchase => purchase.id === purchase.id)      
      
      if(!p.length)
        reject("Compra não cadastrada")      

      resolve(purchase)

    })
    .then(data => {
      dispatch(afterAction(UPDATED_PURCHASES, data))
    })
    .catch(err => {
      dispatch(receivedError(err))
    })
  }
};

export const deletePurchases = (id) => {
  
  return dispatch => {
        
    dispatch(beforeAction(DELETING_PURCHASES));

    return new Promise((resolve, reject) => {

      const p = Store.getState().purchasesState.purchases.filter(purchase => purchase.id === id)   
            
      if(!p.length)
        reject("Compra não cadastrada")      

      resolve(id)

    })
    .then(data => {
      dispatch(afterAction(DELETED_PURCHASES, data))
    })
    .catch(err => {
      dispatch(receivedError(err))
    })
  }
};