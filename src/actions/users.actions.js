import { ADDED_USER, ADDING_USER, RECEIVED_USERS_ERROR, RECEIVED_USERS_ERROR_CLEAN } from "../constants";
import { Store } from "../store";

const beforeAction = type => ({
  type: type
});

const afterAction = (type, value) => ({
  type: type,
  newValue: value
});

const receivedError = err => ({
  type: RECEIVED_USERS_ERROR,
  error: err
});

export const cleanError = () => ({
  type: RECEIVED_USERS_ERROR_CLEAN,
});

export const addUser = (body) => {
  
  return dispatch => {
        
    dispatch(beforeAction(ADDING_USER));

    return new Promise((resolve, reject) => {

      const p = Store.getState().usersState.users.filter(user => user.email === body.email)      
      if(p.length)
        reject("Usuário já cadastrado")      

      resolve(body)

    })
    .then(user => {
      dispatch(afterAction(ADDED_USER, user))
    })
    .catch(err => {
      dispatch(receivedError(err))
    })
  }
};