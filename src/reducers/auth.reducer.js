import {
  AUTHENTICATING,
  AUTHENTICATED,
  LOGOUT,
  RECEIVED_ERROR,
  FETCHING_USER,
  FETCHED_USER
} from '../constants';

const initialState = {
  userData: {},
  loggedIn: false,
  isFetching: false,
  error: false
};

export const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case AUTHENTICATING:
      return {
        ...state,
        userData: {},
        isFetching: true,
        loggedIn: false,
      }

    case AUTHENTICATED: return {
        ...state,
        userData: action.newValue,
        isFetching: false,
        loggedIn: true,
        error: null,
      }

    case FETCHING_USER:
        return {
          ...state,
          isFetching: true,
        }
  
    case FETCHED_USER: 
        return {
          ...state,
          userData: action.newValue,
          isFetching: false,
        }      

    case LOGOUT: return {
        ...state,
        userData: {},
        isFetching: false,
        loggedIn: false,
      }

    case RECEIVED_ERROR:
      return {
        ...state,
        error: action.error,
        userData: {},
        isFetching: false,
        loggedIn: false,
      }
      
    default:
      return state;
  }
};