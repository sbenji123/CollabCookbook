import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/actions/recipeActions';


class DeleteRecipe extends Component {
  handleSubmit = (e) => {
    this.props.deleteRecipe(this.props.id)
  } 

  render(){
    if (this.props.recipe.authorId === this.props.auth.uid){
    return (
      <button className='btn pink lighten-3 z-depth-1' onClick={this.handleSubmit}> 
        Remove
      </button> 
    )} else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  const { id } = ownProps;
  const recipes = state.firestore.data.recipes;
  const recipe = recipes ? recipes[id] : null;
  return {
    recipe: recipe,
    id: id,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteRecipe: (id) => dispatch(deleteRecipe(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRecipe);
// export default DeleteRecipe


