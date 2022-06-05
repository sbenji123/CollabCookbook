import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions';

const SignedInLinks = (props) => {
    return (
        <ul className="right">
            <li><NavLink to='/cookbooks/list'>Cookbooks</NavLink></li>
            <li><NavLink to='/recipes/list'>Recipes</NavLink></li>
            <li><button className="log-out-button grey darken-3" onClick={props.signOut}>Log Out</button></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>{props.initials}</NavLink></li>
        </ul>
    )
}

const mapStateToProps = (state) => {
  return {
    initials: state.firebase.profile.initials
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignedInLinks)