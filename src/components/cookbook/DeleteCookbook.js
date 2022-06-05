import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteCookbook } from '../../store/actions/cookbookActions';
import { Navigate } from 'react-router-dom';

class DeleteCookbook extends Component {
  state = {
    pressedOnce: false,
    submitted: false
  }

  handleSubmit = (e) => {
    if (this.state.pressedOnce){
      this.props.deleteCookbook(this.props.id, this.props.cookbook)
      this.setState({submitted: true})
    } else {
      this.setState({pressedOnce:true})
    }
  } 

  render(){
    if (this.props.cookbook.authorId === this.props.auth.uid){
    return (
      <div>
        {this.state.submitted ? <Navigate to={'/cookbooks/list'} /> : null}
        <button className='btn pink lighten-3 z-depth-1' onClick={this.handleSubmit}> 
          {this.state.pressedOnce ? "Confirm" : "Delete Cookbook"}
        </button> 
      </div>
    )} else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCookbook: (id, cookbook) => dispatch(deleteCookbook(id, cookbook)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCookbook);
// export default deleteCookbook


