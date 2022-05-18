import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/actions/recipeActions';


class DeleteRecipe extends Component {
  handleSubmit = (e) => {
    this.props.deleteRecipe(this.props.id)
  } 

  render(){
    return (
      <button className='btn pink lighten-3 z-depth-1' onClick={this.handleSubmit}> 
        Remove
      </button> 
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  };
};

export default connect(null, mapDispatchToProps)(DeleteRecipe);
// export default DeleteRecipe


