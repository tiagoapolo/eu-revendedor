import {
  AUTHENTICATING,
  AUTHENTICATED,
  LOGOUT,
  RECEIVED_AUTH_ERROR,
  RECEIVED_AUTH_ERROR_CLEAN
} from '../constants';

import { Store } from '../store'

import { saveCreds, removeCreds } from '../utils';

const beforeAction = type => ({
  type: type
});

const afterAction = (type, value) => ({
  type: type,
  newValue: value
});

const receivedError = err => ({
  type: RECEIVED_AUTH_ERROR,
  error: err
});

export const cleanError = () => ({
  type: RECEIVED_AUTH_ERROR_CLEAN,
});


export const logout = () => {
  removeCreds()
  return {
    type: LOGOUT,
  }
}

export const setUserData = (user) => ({
  type: AUTHENTICATED,
  newValue: user
})

export const authenticate = (creds) => {
  
  return dispatch => {
        
    removeCreds();
    dispatch(beforeAction(AUTHENTICATING));

    return new Promise((resolve, reject) => {      

      if(!creds.email || !creds.password)
        reject("Credenciais inválidas")    
        
      const user = Store.getState().usersState.users.filter(user => user.email === creds.email)
      
      if(!user.length)
        reject("Usuário não encontrado")
      if(creds.password !== user[0].password)
        reject("Credenciais inválidas")        

      resolve(user[0])

    })
    .then(user => {
      saveCreds(user.email)
      dispatch(afterAction(AUTHENTICATED, user))
    })
    .catch(err => {
      dispatch(receivedError(err))
    })
  }
};
