import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editCookbook } from'../../store/actions/cookbookActions'
import { Navigate } from 'react-router-dom'
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

class EditCookbook extends Component {
    state = { cookbook: {
                ...this.props.cookbook, 
                id: this.props.id,
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
        this.props.editCookbook(this.state.cookbook) 
      } else {
        e.preventDefault();
        this.setState({
          cookbookError: "Not all inputs are filled"
        })
      }   
    }
    render() {
        return (
          <div className = "container">
          <form onSubmit={this.handleSubmit} className="white">
              <h5 className="grey-text text-darken-3">Edit Cookbook</h5>
              <div className="input-field">
                  <label className="active" htmlFor="cookbookTitle">Cookbook Title</label>
                  <input type="text" id="cookbookTitle" onChange={this.handleChange} defaultValue={this.state.cookbook.cookbookTitle}/>
              </div>
              <div className="input-field">
                  <label className="active" htmlFor="cookbookAttribution">Cookbook Attribution</label>
                  <textarea id="cookbookAttribution"  className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.cookbook.cookbookAttribution}></textarea>
              </div>
              <div className="input-field">
                  <label className="active" htmlFor="description">Description</label>
                  <textarea id="description"  className="materialize-textarea" onChange={this.handleChange} defaultValue={this.state.cookbook.description} ></textarea>
              </div>
              <div className="input-field">
                  {this.state.submitSuccess ? <Navigate to={'/cookbooks/list'} /> : null}
                  <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Save</button>
                  <div className="red-text center">
                    { this.state.cookbookError ? <p>{this.state.cookbookError}</p> : null}
                  </div>
              </div>
          </form>
      </div>  
    )}
}

const mapStateToProps = (state, ownProps) => {
    const { id } = ownProps;
    const cookbooks = state.firestore.data.cookbooks;
    const cookbook = cookbooks ? cookbooks[id] : null;
    return {
      cookbook: cookbook,
      id: id,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        editCookbook: (cookbook) => dispatch(editCookbook(cookbook))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ 
          collection: 'cookbooks'
        }])
)(EditCookbook);
