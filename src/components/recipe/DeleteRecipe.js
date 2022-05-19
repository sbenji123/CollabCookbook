import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/actions/recipeActions';


class DeleteRecipe extends Component {
  state = {
    pressedOnce: false
  }

  handleSubmit = (e) => {
    if (this.state.pressedOnce){
      this.props.deleteRecipe(this.props.id)
    } else {
      this.setState({pressedOnce:true})
    }
  } 

  render(){
    if (this.props.recipe.authorId === this.props.auth.uid){
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


