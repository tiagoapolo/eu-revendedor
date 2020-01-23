import {
  AUTHENTICATING,
  AUTHENTICATED,
  LOGOUT,
  RECEIVED_AUTH_ERROR,
  RECEIVED_AUTH_ERROR_CLEAN,

} from '../constants';

const initialState = {
  userData: {},
  loggedIn: false,
  loading: false,
  loaded: false,
  loaded: true,
  error: false
};

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        userData: {},
        loading: true,
        loaded: false,
        loggedIn: false,
        error: null
      }   

    case AUTHENTICATED: 
      return {
        ...state,
        userData: action.newValue,
        loading: false,
        loaded: true,
        loggedIn: true,
        error: null,
      }     

    case LOGOUT: return {
        ...state,
        userData: {},
        loading: false,
        loaded: false,
        loggedIn: false,
        error: false,
      }

    case RECEIVED_AUTH_ERROR:
      return {
        ...state,
        error: action.error,
        userData: {},
        loading: false,
        loaded: false,
        loggedIn: false,
      }

    case RECEIVED_AUTH_ERROR_CLEAN:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: false,
      }           
      
    default:
      return state;
  }
};