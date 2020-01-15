import {
  FETCHING_PURCHASES,
  FETCHED_PURCHASES,
  RECEIVED_PURCHASE_ERROR,
  ADD_PURCHASES,
  ADDED_PURCHASES,
  UPDATING_PURCHASES,
  UPDATED_PURCHASES,
  DELETING_PURCHASES,
  DELETED_PURCHASES
} from '../constants';

const initialState = {
  purchases: [],
  isFetching: false,
  error: null
};

export const purchaseReducer = (state = initialState, action) => {

  switch (action.type) {

    case FETCHING_PURCHASES:
      return {
        ...state,
        isFetching: true,
        error: null,
      }

    case FETCHED_PURCHASES: 
      return {
        ...state,
        purchases: action.newValue,
        isFetching: false,
        error: null,
      }  

    case ADD_PURCHASES:
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    
    case ADDED_PURCHASES: 
      return {
        ...state,
        purchases: (state.purchases || []).concat([action.newValue]),
        isFetching: false,
        error: null,
      }  

    case UPDATING_PURCHASES:
      return {
        ...state,
        isFetching: true,
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
        isFetching: false,
      }      

    case DELETING_PURCHASES:
      return {
        ...state,
        isFetching: true,
        error: false,
      }
    
    case DELETED_PURCHASES: 
      return {
        ...state,
        purchases: state.purchases.filter(p => p.id !== action.newValue),
        isFetching: false,
      }   

    case RECEIVED_PURCHASE_ERROR:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      }
      
    default:
      return state;
  }
};