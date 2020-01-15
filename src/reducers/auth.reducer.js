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
        isFetching: true,
        loggedIn: false,
      }

    case AUTHENTICATED: return {
        ...state,
        userData: action.newValue,
        isFetching: false,
        loggedIn: true,
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
        isFetching: false,
        loggedIn: false,
      }
      
    default:
      return state;
  }
};