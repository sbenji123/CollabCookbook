import React from 'react';
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux';


const Navbar = (props) => {
  const { auth } = props
  const links = 'uid' in auth ? <SignedInLinks /> : < SignedOutLinks />
  
  return (
    <div className="navbar-fixed" id="nav-id">
      <nav className="nav-wrapper desktopnav grey darken-3">
          <div className="container">
              <Link to='/' className="brand-logo left">CollaborativeCookbook</Link>
              <div className="right">
                {auth.isLoaded && links}
              </div>
          </div>
      </nav>
      <nav className="nav-extended mobile-nav grey darken-3">
        <div className="nav-wrapper container">
          <Link to='/' className="brand-logo left">CollaborativeCookbook</Link>
        </div>
        <div className="nav-content container">
          {auth.isLoaded && links}
        </div>
      </nav>      
    </div>    
  )
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default connect(mapStateToProps)(Navbar)