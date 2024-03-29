import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import RecipeList from '../recipe/RecipeList';
import { createRecipe } from '../../store/actions/recipeActions';
import AddRecipeToCookbook from './AddRecipeToCookbook';
import DeleteCookbook from './DeleteCookbook';
import DeleteRecipeFromCookbook from './DeleteRecipeFromCookbook';

const CookbookDetails = (props) => {
  const { createRecipe, auth, cookbook, id } = props;
  if (cookbook) {
    return (
      <div className='container white cookbook-details'>
        {displayHeading(cookbook)}
        <RecipeList recipeList={cookbook.recipes} />
        {AddRecipeButtons(auth, id)}
        {CookbookAdminButtons(auth, cookbook, id, createRecipe)}
        <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {cookbook.authorFirstName} {cookbook.authorLastName}</div>
          </div>
      </div>
    );
  } else {
    return (
      <div className='container white cookbook-details'>
        <h1>Cookbook Not Found</h1>
      </div>
    );
  }
};

const displayHeading = (cookbook) => {
  const image = displayCookbookImage(cookbook)
  return (
    <div>
      <div className='row'>
        <div className='s12 m6'>
          <span>
            <h4>{cookbook.cookbookTitle}</h4>
          </span>
        </div>
        {image}
      </div>
      <div className="row">
        {cookbook.description}
      </div>
    </div>
  )
};

const displayCookbookImage = (cookbook) => {
  if (cookbook && 'image' in cookbook) {
    return (
      <div className='s12 m6'>
        <img src={cookbook.image} alt='' />
      </div>
    );
  } else {
    return null;
  }
};

const AddRecipeButtons = (auth, cookbookId) => {
  if (auth.uid){
    return (
      <div className="row">
          <div className="col center">
          <AddRecipeToCookbook id={cookbookId}/>
        </div>
        <div className="col center">
          <Link to={'/cookbooks/' + cookbookId + '/recipe/create'}>
            <button className="btn pink lighten-3 z-depth-1">
              Add New Recipe
            </button>
          </Link>
        </div>
      </div>
    )
  } else {
    return null
  }
  
}

const CookbookAdminButtons = (auth, cookbook, id) => {
  if (cookbook.authorId === auth.uid) {
    return (
      <div className="row">
        <div className="col center">
          <Link to={'/cookbooks/' + id + '/edit'}>
            <button className='btn pink lighten-3 z-depth-1'>
              Edit Cookbook
            </button>
          </Link>
        </div>
        <div className="col center">
          <DeleteRecipeFromCookbook id={id} cookbook={cookbook}/> 
        </div>
        <div className="col center">
          <DeleteCookbook id={id} cookbook={cookbook}/> 
        </div>
      </div>
  )} else {
    return null
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps;
  const cookbooks = state.firestore.data.cookbooks;
  const cookbook = cookbooks ? cookbooks[id] : null;
  return {
    cookbook: cookbook,
    id: id,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createRecipe: (recipe, cookbook) => dispatch(createRecipe(recipe, cookbook))
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((state)=>{
    return[{
      collection: 'cookbooks',
      orderBy: 'cookbookTitle'
      // doc: state.id,
      // storeAs: 'cookbook'
    }]
  }),
)(CookbookDetails);

