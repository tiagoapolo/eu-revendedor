import { ALERT } from '../constants'
import { toast } from "react-toastify";

export function toastAction(text) {
  return function(dispatch) {
    dispatch({
      type: ALERT
    });
    toast.error((text || "Sucesso"), {
      position: toast.POSITION.BOTTOM_CENTER
    });
  };
}