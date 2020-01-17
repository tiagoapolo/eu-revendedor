import {
  ALERT
} from '../constants';

const initialState = {
  text: ''
};

function toastReducer(state = initialState, action) {
  switch (action.type) {
    case ALERT:
      return { ...state, text };
    default:
      return state;
  }
}

export default toastReducer;
