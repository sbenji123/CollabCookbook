const initState = {}

const recipeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NAV_TO_RECIPE': {
      console.log('Navigated to Recipe Page', action.recipe);
      state.recipe = action.recipe;
      break;
    }
    case 'CREATE_RECIPE': {
      console.log('Recipe Created', action.recipe);
      break;
    }
    case 'CREATE_RECIPE_ERROR': {
      console.log('Create Project Error', action.err);
      break;
    }
    case 'ADD_CREATED_RECIPE_TO_USER':{
      console.log('Recipe Added to user', action.recipe);
      break;
    }
    case 'ADD_CREATED_RECIPE_TO_USER_ERROR':{
      console.log('Added to user Error', action.err);
      break;
    }
    case 'ADD_CREATED_RECIPE_TO_COOKBOOK':{
      console.log('Recipe Added to Cookbook', action.recipe);
      break;
    }
    case 'ADD_CREATED_RECIPE_TO_COOKBOOK_ERROR':{
      console.log('Added to Cookbook Error', action.err);
      break;
    }
    case 'EDIT_RECIPE': {
      console.log('Recipe Edited', action.recipe);
      break;
    }
    case 'EDIT_RECIPE_ERROR': {
      console.log('Recipe Edit Error', action.err);
      break;
    }
    case 'EDIT_RECIPE_IN_USER': {
      console.log('Recipe Edited In User', action.recipe);
      break;
    }
    case 'EDIT_RECIPE_IN_USER_ERROR': {
      console.log('Recipe Edit In User Error', action.err);
      break;
    }
    case 'DELETE_RECIPE': {
      console.log('Recipe Deleted', action.recipe);
      break;
    }
    case 'DELETE_RECIPE_ERROR': {
      console.log('Recipe Edit Error', action.err);
      break;
    }
    case 'DELETE_RECIPE_FROM_COOKBOOK': {
      console.log('Recipe Deleted from cookbook', action.recipe);
      break;
    }
    case 'DELETE_RECIPE_FROM_COOKBOOK_ERROR': {
      console.log('Recipe Deleted from cookbook error', action.recipe);
      break;
    }
    case 'DELETE_RECIPE_FROM_USER': {
      console.log('Recipe Deleted frmo user', action.recipe);
      break;
    }
    case 'DELETE_RECIPE_FROM_USER_ERROR': {
      console.log('Recipe Deleted error from user', action.recipe);
      break;
    }
    default: {
      console.log('No action associated with', action.type);
    }
  }
  return state;
};

export default recipeReducer;
