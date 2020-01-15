// ROUTES
export const LOGIN_ROUTE = "/";
export const REGISTER_ROUTE = "/cadastro";
export const DASHBOARD_ROUTE = "/dashboard";
export const PURCHASE_INFO_ROUTE = "/dashboard/:item";
export const PURCHASE_EDIT_ROUTE = "/dashboard/:item/editar";
export const PURCHASE_NEW_ROUTE = "/dashboard/novo";
export const DEV_INFO_ROUTE = "/developer";

// REGEX
export const EMAIL_REGEX = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;
export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

// REDUX
export const AUTHENTICATING = "AUTHENTICATING";
export const AUTHENTICATED = "AUTHENTICATED";
export const FETCHING_USER = "FETCHING_USER";
export const FETCHED_USER = "FETCHED_USER";
export const LOGOUT = "LOGOUT";

export const FETCHING_PURCHASES = "FETCHING_PURCHASES";
export const FETCHED_PURCHASES = "FETCHED_PURCHASES";

export const ADD_PURCHASES = "ADD_PURCHASES";
export const ADDED_PURCHASES = "ADDED_PURCHASES";

export const UPDATING_PURCHASES = "UPDATING_PURCHASES";
export const UPDATED_PURCHASES = "UPDATED_PURCHASES";

export const DELETING_PURCHASES = "DELETING_PURCHASES";
export const DELETED_PURCHASES = "DELETED_PURCHASES";

export const RECEIVED_PURCHASE_ERROR = "RECEIVED_PURCHASE_ERROR";
export const RECEIVED_ERROR = "RECEIVED_ERROR";