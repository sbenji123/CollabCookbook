import React from 'react';
import IngredientList from './IngredientList';
import DirectionList from './DirectionList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import DeleteRecipe from './DeleteRecipe';

const RecipeDetails = (props) => {

  const { auth, recipe, id } = props;
  if (recipe) {
    return (
      <div className='container white recipe-details'>
        {displayHeading(recipe)}
        {quantitativeRecipeDetails(recipe)}
        <IngredientList ingredients={recipe.ingredients} />
        <DirectionList directions={recipe.directions} />
        {editButtons(auth, recipe, id)}
        <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {recipe.authorFirstName} {recipe.authorLastName}</div>
          </div>
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

const displayHeading = (recipe) => {
  const image = displayRecipeImage(recipe)
  return (
    <div className='row'>
      <div className='s12 m6'>
        <span>
          <h4>{recipe.recipeTitle}</h4>
        </span>
      </div>
      {image}
    </div>
  )
};

const displayRecipeImage = (recipe) => {
  if (recipe && 'image' in recipe) {
    return (
      <div className='s12 m6'>
        <img src={recipe.image} alt='' />
      </div>
    );
  } else {
    return null;
  }
};

const quantitativeRecipeDetails = (recipe) => {
  return (
    <table className='striped'>
      <thead>
        <tr>
          <th>Attribution</th>
          <th>Category</th>
          <th>Prep Time</th>
          <th>Total Time</th>
          <th>Serving Size</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{recipe.recipeAttribution}</td>
          <td>{recipe.recipeCategory}</td>
          <td>{recipe.prepTime}</td>
          <td>{recipe.totalTime}</td>
          <td>{recipe.servingSize}</td>
        </tr>
      </tbody>
    </table>
  );
};

const editButtons = (auth, recipe, id) => {
  if (recipe.authorId === auth.uid) {
    return (
      <div className="row">
        <div className="col s6 center"><Link to={'/recipes/' + id + '/edit'}>
          <button className='btn pink lighten-3 z-depth-1'>
            Edit
          </button>
        </Link></div>
        <div className="col s6 center">
        <DeleteRecipe id={id}/></div>
      </div>
  )} else {
    return null
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

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ 
    collection: 'recipes', 
  }])
)(RecipeDetails);

