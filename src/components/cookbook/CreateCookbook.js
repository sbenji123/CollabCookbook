import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createCookbook } from'../../store/actions/cookbookActions'
import { Navigate} from 'react-router-dom'

// need to add image to the state eventually

class CreateCookbook extends Component {
    state = {
        cookbook: {
          cookbookTitle:'',
          cookbookAttribution:'',
          description:'',
          recipes:[],
        },
        cookbookError: null,
        submitSuccess: false
    }

    handleChange = (e) => {
      let newState = {...this.state}
      newState.cookbook[e.target.id] = e.target.value
      this.setState({ ...newState })
    }

    handleSubmit = (e) => {
        if (Object.entries(this.state.cookbook).every((element) => {
          return element[1] && element[1] !== ''
        })){
          this.setState({
            cookbookError: null,
            submitSuccess: true
          })
          this.props.createCookbook(this.state.cookbook) 
        } else {
          e.preventDefault();
          this.setState({
            cookbookError: "Not all inputs are filled"
          })
        }     
    }
    render() {
      const { auth } = this.props;
      if (!auth.uid) return <Navigate to = '/signin' />
      return (
          <div className = "container">
              <form onSubmit={this.handleSubmit} className="white">
                  <h5 className="grey-text text-darken-3">Create Cookbook</h5>
                  <div className="input-field">
                      <label htmlFor="cookbookTitle">Cookbook Title</label>
                      <input type="text" id="cookbookTitle" onChange={this.handleChange} />
                  </div>
                  <div className="input-field">
                      <label htmlFor="cookbookAttribution">Cookbook Attribution</label>
                      <textarea id="cookbookAttribution"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                  </div>
                  <div className="input-field">
                      <label htmlFor="description">Description</label>
                      <textarea id="description"  className="materialize-textarea" onChange={this.handleChange}></textarea>
                  </div>
                  <div className="input-field">
                      {this.state.submitSuccess ? <Navigate to={'/cookbooks/list'} /> : null}
                      <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Create</button>
                      <div className="red-text center">
                        { this.state.cookbookError ? <p>{this.state.cookbookError}</p> : null}
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
        createCookbook: (cookbook) => dispatch(createCookbook(cookbook))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCookbook)
