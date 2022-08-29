import React, { Component } from 'react'
import { connect } from 'react-redux'
import { forgotPassword } from '../../store/actions/authActions'
import { Navigate } from 'react-router-dom'


class ForgotPassword extends Component {
    state = {
        email: '',
        passwordResetCancel: false,
        emptyEmail: false,
        submitted: false
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    handlePasswordReset = (e) => {
        e.preventDefault(); //prevents default refresh of page
        if (this.state.email === ''){
          this.setState({emptyEmail: true})
        } else {
          this.props.forgotPassword(this.state.email)
          this.setState({emptyEmail: false, submitted: true})
      }
    }

    handlePasswordResetCancel = (e) => {
      e.preventDefault();
      this.setState({passwordResetCancel: true})
    }

    render() {
      const { auth } = this.props
      if (auth.uid) return <Navigate to = '/' />

      if (this.state.passwordResetCancel) return <Navigate to = '/signin'/>

      return (
          <div className = "container">
              <form className="white">
                  <h5 className="grey-text text-darken-3">Sign In</h5>
                  <div className="input-field">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" onChange={this.handleChange}/>
                  </div>
                  <div className=" row">
                    <div className="col center">
                      <button className="btn pink lighten-1 z-depth-0 col center" 
                              onClick={this.handlePasswordReset}>Continue</button>
                    </div>
                    <div className="col center">
                      <button className="btn pink lighten-1 z-depth-0 col center" 
                              onClick={this.handlePasswordResetCancel}>Cancel</button>
                    </div>
                  </div>
                <div className="row">
                  <div className="red-text center">
                        { this.state.emptyEmail ? <p>{"Email cannot be empty"}</p> : null}
                  </div>
                  <div className="blue-text center">
                        { this.state.submitted ? <p>{"Reset link sent to email if it exists"}</p> : null}
                  </div>     
                </div>
              </form>
          </div>        
    )}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
