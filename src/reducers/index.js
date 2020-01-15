import { combineReducers } from 'redux';
import { authReducer } from './auth.reducer';
import { purchaseReducer } from './purchases.reducer';

export const Reducers = combineReducers({
  authState: authReducer,
  purchasesState: purchaseReducer,
});