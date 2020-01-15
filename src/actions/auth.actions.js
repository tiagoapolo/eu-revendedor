import {
  AUTHENTICATING,
  AUTHENTICATED,
  FETCHING_USER,
  FETCHED_USER,
  LOGOUT,
  RECEIVED_ERROR
} from '../constants';

import { api } from '../api';
import { saveCreds, removeCreds } from '../utils';

const beforeAction = type => ({
  type: type
});

const afterAction = (type, value) => ({
  type: type,
  newValue: value
});

const receivedError = err => ({
  type: RECEIVED_ERROR,
  error: err
});


export const logout = () => {
  removeCreds()
  return {
    type: LOGOUT,
  }
}

export const getUser = (id) => {
  
  return dispatch => {
        
    dispatch(beforeAction(FETCHING_USER));

    return api.get(`/users/${id}`)
    .then(res => res.data)
    .then(data => {
      dispatch(afterAction(FETCHED_USER, data))
    })
    .catch(err => {
      if(err && err.response)
        dispatch(receivedError(err.response.data.message))
      else 
        dispatch(receivedError("Falha ao buscar usuário"))
    })
  }
};

export const authenticate = (creds) => {
  
  return dispatch => {
        
    dispatch(beforeAction(AUTHENTICATING));

    return api.post('/auth', creds)
    .then(res => res.data)
    .then(data => {
      saveCreds(data.id)
      dispatch(afterAction(AUTHENTICATED, data))
    })
    .catch(err => {

      removeCreds()

      if(err && err.response)
        dispatch(receivedError(err.response.data.message))
      else 
        dispatch(receivedError("Autenticação sem sucesso"))
    })
  }
};
