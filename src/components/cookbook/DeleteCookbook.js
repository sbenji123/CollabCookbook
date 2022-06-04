import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteCookbook } from '../../store/actions/cookbookActions';

class DeleteCookbook extends Component {
  state = {
    pressedOnce: false
  }

  handleSubmit = (e) => {
    if (this.state.pressedOnce){
      this.props.deleteCookbook(this.props.id, this.props.cookbook)
    } else {
      this.setState({pressedOnce:true})
    }
  } 

  render(){
    if (this.props.cookbook.authorId === this.props.auth.uid){
    return (
      <button className='btn pink lighten-3 z-depth-1' onClick={this.handleSubmit}> 
        {this.state.pressedOnce ? "Confirm" : "Remove"}
      </button> 
    )} else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.cookbook;
  console.log(id)
  return {
    id: id,
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


