import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { 
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  DASHBOARD_ROUTE,
  PURCHASE_INFO_ROUTE,
  PURCHASE_NEW_ROUTE,
  PURCHASE_EDIT_ROUTE,
  DEV_INFO_ROUTE
} from "../constants"

import Login from '../pages/login/login.component';
import NotFound from "../pages/not-found/not-found.component";
import Signup from "../pages/signup/signup.component";
import Dashboard from "../pages/dashboard/dashboard.component";
import Navbar from "../components/Navbar/navbar.component";
import { getCreds } from "../utils";
import NewPurchase from "../pages/new-purchase/new-purchase.component";
import DevInfo from "../pages/dev-info/dev-info.component";

const authRoutes = {
  dashboard: DASHBOARD_ROUTE,
  purchase: PURCHASE_INFO_ROUTE,
  new_purchase: PURCHASE_NEW_ROUTE,
  edit_purchase: PURCHASE_EDIT_ROUTE,
}

const nonAuthRoutes = {
  login: LOGIN_ROUTE,
  register: REGISTER_ROUTE,
  developer: DEV_INFO_ROUTE,
}

function RouteGuard({ component: Component, path, exact }) {
  
  const isAuthed = getCreds();

  return (
    <Route
      exact
      path={path}
      render={props => (
        !!isAuthed
        ? (
          <>
            <Navbar isAuthed={isAuthed}/>
            <Component {...props} />
          </>
        )
        : <Redirect 
            to={{
              pathname: nonAuthRoutes.login
            }} 
          />)}
    />
  )  
}


export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route 
          exact path={nonAuthRoutes.login}
          component={Login}
        />
        <Route 
          exact path={nonAuthRoutes.register}
          component={Signup}
        />
        <Route 
          exact path={nonAuthRoutes.developer}
          component={DevInfo}
        />
        <RouteGuard    
          exact       
          path={authRoutes.new_purchase}
          component={NewPurchase}
        />     
        <RouteGuard     
          exact   
          path={authRoutes.dashboard}
          component={Dashboard}
        />        
        <RouteGuard 
          exact
          path={authRoutes.edit_purchase}
          component={NewPurchase}
        />
        <RouteGuard 
          exact
          path={authRoutes.purchase}
          component={NewPurchase}
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  )
}