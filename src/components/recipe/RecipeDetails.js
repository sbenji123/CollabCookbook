import React from 'react';
import IngredientList from './IngredientList';
import DirectionList from './DirectionList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { useParams } from 'react-router-dom';

const RecipeDetails = (props) => {
  console.log("RECIPE DETAILS")
  const { recipe, id } = props;
  if (recipe) {
    console.log('Recipe', recipe);
    return (
      <div className='container white recipe-details'>
        <div className='row'>
          {displayRecipeImage(recipe)}
          <div className='col s12 m6'>
            <span>{recipe.recipeTitle}</span>
            {quantitativeRecipeDetails(recipe)}
            <Link to={'/recipe/' + id + '/edit'}>
              <button className='right btn-floating btn-large waves-effect waves-light red'>
                <i className='material-icons'>edit</i>
              </button>
            </Link>
          </div>
        </div>
        <IngredientList ingredients={recipe.ingredients} />
        <DirectionList directions={recipe.directions} />
      </div>
    );
  } else {
    return (
      <div className='container white recipe-details'>
        <h1>Recipe Not Found</h1>
      </div>
    );
  }
};

const quantitativeRecipeDetails = (recipe) => {
  return (
    <table className='striped'>
      <thead>
        <tr>
          <th>Prep Time</th>
          <th>Total Time</th>
          <th>Serving Size</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{recipe.prepTime}</td>
          <td>{recipe.totalTime}</td>
          <td>{recipe.servingSize}</td>
        </tr>
      </tbody>
    </table>
  );
};

const displayRecipeImage = (recipe) => {
  if (recipe && 'image' in recipe) {
    return (
      <div className='col s12 m6'>
        <img src={recipe.image} alt='' />
      </div>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log("state",state)
  const param = useParams();
  const { id } = ownProps;
  const recipes = state.firestore.data.recipes;
  const recipe = recipes ? recipes[id] : null;
  return {
    recipe: recipe,
    id: id,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ 
    collection: 'recipes' 
  }])
)(RecipeDetails);
