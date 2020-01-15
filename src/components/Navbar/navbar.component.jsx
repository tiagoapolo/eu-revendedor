import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { getUser } from '../../actions/auth.actions'

import { removeCreds } from '../../utils'
import { LOGIN_ROUTE, DEV_INFO_ROUTE } from '../../constants'

import './navbar.scss'
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  userData: store.authState.userData,
  error: store.authState.error,
  loggedIn: store.authState.loggedIn,
});

const mapDispatchToProps = dispatch => {
  return {
    getUser: (args) => dispatch(getUser(args)),
  }
}

function Navbar({
  getUser,
  userData,
  error,
  userId
}) {

  let history = useHistory();

  const logout = () => {
    removeCreds()
    history.push(LOGIN_ROUTE);
  }

  const devContact = () => {
    history.push(DEV_INFO_ROUTE);
  }


  useEffect(() => {
    if(!userId)
      return

    getUser(userId)
    
  }, [userId])

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
        <span className="logout" onClick={logout}>
          Logout
          <i className="fas fa-sign-out-alt"></i>
        </span>
      </div>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)