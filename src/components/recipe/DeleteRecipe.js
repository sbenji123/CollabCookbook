import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteRecipeCompletely } from '../../store/actions/recipeActions';
import { Navigate } from 'react-router-dom';

class DeleteRecipe extends Component {
  state = {
    pressedOnce: false,
    submitted: false
  }

  handleSubmit = (e) => {
    if (this.state.pressedOnce){
      this.props.deleteRecipeCompletely(this.props.id, this.props.recipe)
      this.setState({submitted: true})
    } else {
      this.setState({pressedOnce:true})
    }
  } 

  render(){
    if (this.props.recipe.authorId === this.props.auth.uid){
    return (
      <div>
        {this.state.submitted ? <Navigate to={'/recipes/list'} /> : null}
        <button className='btn pink lighten-3 z-depth-1' onClick={this.handleSubmit}> 
          {this.state.pressedOnce ? "Confirm" : "Remove"}
        </button> 
      </div>
    )} else {
      return null
    }
  }
}

const mapStateToProps = (state, ownProps) => {
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
    deleteRecipeCompletely: (id, recipe) => dispatch(deleteRecipeCompletely(id, recipe)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRecipe);
// export default DeleteRecipe


