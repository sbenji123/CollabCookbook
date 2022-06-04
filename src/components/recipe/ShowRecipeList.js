import React, { Component } from 'react';
import RecipeList from './RecipeList';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


export class ShowRecipeList extends Component {
  render() {
    const { recipeList } = this.props;
    return (
      <div className="recipe-list container col">
        <RecipeList recipeList={recipeList} />
        <CreateButton auth={this.props.auth.uid} />
      </div>
    )
  }
}

const CreateButton = (props) => {
  if (props.auth){
    return (
    <div className="row center">
      <Link to={'/recipes/create'} >
        <button className="row center btn pink lighten-3 z-depth-1">
          Create New Recipe
        </button>
      </Link>
    </div>
    )
  } else{
    return null
  }
}


const mapStateToProps = (state) => {
  return {
    recipeList: state.firestore.ordered.recipes,
    auth: state.firebase.auth
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((state) => [{ 
    collection: 'recipes', 
    orderBy: ['recipeTitle'] 
  }]))(ShowRecipeList);
