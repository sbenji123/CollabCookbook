import React, { Component } from 'react'
import { connect } from 'react-redux';
import { deleteRecipeFromCookbook } from '../../store/actions/cookbookActions';


class DeleteRecipeFromCookbook extends Component {
  state = {
    pressedOnce: false,
    recipeId: ""
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.pressedOnce){
      this.props.deleteRecipeFromCookbook(this.props.id, this.state.recipeId)
    } else {
      this.setState({pressedOnce:true})
    }
  } 

  handleChange = (e) => {
    let newState = {...this.state}
    newState[e.target.id] = e.target.value
    this.setState({ ...newState })
  }

  handleCancel = (e) => {
    this.setState({pressedOnce: false})
  }

  render(){
    if (this.props.auth.uid != null && !this.state.pressedOnce){
    return (
      <button className="btn pink lighten-3 z-depth-1" onClick={this.handleSubmit}>
        Remove Recipe By Id
      </button>
    )} else if (this.props.auth.uid != null && this.state.pressedOnce){
      return (
      <div>
          <div className="input-field">
              <label htmlFor="recipeId">Recipe Id</label>
              <input type="text" id="recipeId" onChange={this.handleChange}/>
          </div>
        <div className="edit-buttons">
          <button className=" btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Delete</button>
          <button className=" btn pink lighten-1 z-depth-0" onClick={this.handleCancel}>Cancel </button>
        </div>
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
    deleteRecipeFromCookbook: (cookbookId, recipeId) => dispatch(deleteRecipeFromCookbook(cookbookId, recipeId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteRecipeFromCookbook);


