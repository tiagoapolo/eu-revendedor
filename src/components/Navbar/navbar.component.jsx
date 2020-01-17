import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { logout,setUserData } from '../../actions/auth.actions'

import { LOGIN_ROUTE, DEV_INFO_ROUTE } from '../../constants'

import './navbar.scss'
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  userData: store.authState.userData,
  users: store.usersState.users,
  error: store.authState.error,
  loggedIn: store.authState.loggedIn,
});

const mapDispatchToProps = dispatch => {
  return {
    logout: (args) => dispatch(logout(args)),
    setUserData: (args) => dispatch(setUserData(args)),
  }
}

function Navbar({
  logout,
  userData,
  error,
}) {

  let history = useHistory();


  const devContact = () => {
    history.push(DEV_INFO_ROUTE);
  }


  const goToLogin = () => {
    logout()
    history.push(LOGIN_ROUTE)
    return
  }

  useEffect(() => {    
    if(!userData.email) {
      goToLogin()
    } 
  }, [userData])

  useEffect(() => {
    if(error) {
      logout()
    }
  }, [error])

  return (
    <div className="Navbar">
      <div className="username">
        <span>{userData.name}</span>        
      </div>
      <div className="action">        
        <span className="contact" onClick={devContact}>Contato Dev</span>
        <span className="logout" onClick={goToLogin}>
          Logout
          <i className="fas fa-sign-out-alt"></i>
        </span>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)