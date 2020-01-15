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
} from '../constants';

import { api } from '../api';

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

export const getPurchases = () => {
  
  return dispatch => {
        
    dispatch(beforeAction(FETCHING_PURCHASES));

    return api.get(`/purchases`)
    .then(res => res.data)
    .then(data => {
      dispatch(afterAction(FETCHED_PURCHASES,data))
    })
    .catch(err => {
      // Due to JSON-SERVER not giving specific error
      // messages I'll deliver a generic one
      dispatch(receivedError("Falha ao buscar compras"))
    })
  }
};

export const addPurchases = (body) => {
  
  return dispatch => {
        
    dispatch(beforeAction(ADD_PURCHASES));

    return api.post(`/purchases`, body)
    .then(res => res.data)
    .then(data => {
      dispatch(afterAction(ADDED_PURCHASES, data))
    })
    .catch(err => {
      // Due to JSON-SERVER not giving specific error
      // messages I'll deliver a generic one
      dispatch(receivedError("Falha ao criar compra"))
    })
  }
};

export const updatePurchases = (purchase) => {
  
  return dispatch => {
        
    dispatch(beforeAction(UPDATING_PURCHASES));

    return api.put(`/purchases/${purchase.id}`, purchase)
    .then(res => res.data)
    .then(data => {
      dispatch(afterAction(UPDATED_PURCHASES, purchase))
    })
    .catch(err => {
      // Due to JSON-SERVER not giving specific error
      // messages I'll deliver a generic one
      dispatch(receivedError("Falha ao atualizar a compra"))
    })
  }
};

export const deletePurchases = (id) => {
  
  return dispatch => {
        
    dispatch(beforeAction(DELETING_PURCHASES));

    return api.delete(`/purchases/${id}`)
    .then(res => res.data)
    .then(data => {
      dispatch(afterAction(DELETED_PURCHASES, id))
    })
    .catch(err => {
      // Due to JSON-SERVER not giving specific error
      // messages I'll deliver a generic one
      dispatch(receivedError("Falha ao delete a compra"))
    })
  }
};