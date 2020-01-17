import {
  ADDING_USER,
  ADDED_USER,
  RECEIVED_USERS_ERROR,
  RECEIVED_USERS_ERROR_CLEAN,
} from '../constants';

const initialState = {
  users: [
    {
      "id": "910a0715-0cec-4fdf-92c6-4de583003f92",
      "name": "Tiago Lopes de Paiva",
      "cpf": "12312312",
      "email": "tiagoapolo@gmail.com",
      "password": "teste"
    }
  ],
  loading: false,
  loaded: false,
  error: false
};

export const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADDING_USER:
      return {
        ...state,
        loading: true,
        loaded: false,
      }

    case ADDED_USER: 
      return {
        ...state,
        users: (state.users || []).concat([action.newValue]),
        loading: false,
        loaded: true,
        error: null,
      }   
      
    case RECEIVED_USERS_ERROR: 
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      }  
    
    case RECEIVED_USERS_ERROR_CLEAN:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: null,
      }       

    default:
      return state;
  }
};