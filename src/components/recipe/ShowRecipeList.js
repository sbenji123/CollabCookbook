import React, { Component } from 'react';
import RecipeList from './RecipeList';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { connect } from 'react-redux';

export class ShowRecipeList extends Component {
  render() {
    const { recipeList } = this.props;
    return <RecipeList recipeList={recipeList} />;
  }
}

const mapStateToProps = (state) => {
  return {
    recipeList: state.firestore.ordered.recipes,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((state) => [{ 
    collection: 'recipes', 
    orderBy: ['recipeTitle'] 
  }]))(ShowRecipeList);
