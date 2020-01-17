import {
  FETCHING_PURCHASES,
  FETCHED_PURCHASES,
  RECEIVED_PURCHASE_ERROR,
  ADD_PURCHASES,
  ADDED_PURCHASES,
  UPDATING_PURCHASES,
  UPDATED_PURCHASES,
  DELETING_PURCHASES,
  DELETED_PURCHASES,
  RECEIVED_PURCHASE_ERROR_CLEAN
} from '../constants';

// {
//   "id": "1",
//   "user_id": "tiagoapolo@gmail.com",
//   "value": 1,
//   "date": "2020-01-17T13:31:45.094Z",
//   "cashback_percentage": 1,
//   "cashback": 1,
//   "status": "Em validação"
// }

const initialState = {
  purchases: [],
  loading: false,
  loaded: false,
  error: null
};

export const purchaseReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCHING_PURCHASES:
      return {
        ...state,
        purchases: [],
        loading: true,
        loaded: true,
        error: null,
      }

    case FETCHED_PURCHASES: 
      return {
        ...state,
        purchases: action.newValue,
        loading: false,
        loaded: true,
        error: null,
      }  

    case ADD_PURCHASES:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }
    
    case ADDED_PURCHASES: 
      return {
        ...state,
        purchases: (state.purchases || []).concat([action.newValue]),
        loading: false,
        loaded: true,
        error: null,
      }  

    case UPDATING_PURCHASES:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: null,
      }
    
    case UPDATED_PURCHASES: 
      return {
        ...state,
        purchases: state.purchases.map(p => {
          if(p.id !== action.newValue.id)
            return p
          else
            return action.newValue
        }),
        loading: false,
        loaded: true,
      }      

    case DELETING_PURCHASES:
      return {
        ...state,
        loading: true,
        loaded: false,
        error: false,
      }
    
    case DELETED_PURCHASES: 
      return {
        ...state,
        purchases: state.purchases.filter(p => p.id !== action.newValue),
        loading: false,
        loaded: true,
      }   

    case RECEIVED_PURCHASE_ERROR:
      return {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      }

    case RECEIVED_PURCHASE_ERROR_CLEAN:
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