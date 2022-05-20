const initState = {}

const recipeReducer = (state = initState, action) => {
  switch (action.type) {
    case 'NAV_TO_RECIPE': {
      console.log('Navigated to Recipe Page', action.recipe);
      state.recipe = action.recipe;
      break;
    }
    case 'CREATE_RECIPE': {
      console.log(action)
      console.log('Recipe Created', action.recipe);
      break;
    }
    case 'CREATE_RECIPE_ERROR': {
      console.log('Create Project Error', action.err);
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
    case 'DELETE_RECIPE': {
      console.log('Recipe Deleted', action.recipe);
      break;
    }
    case 'DELETE_RECIPE_ERROR': {
      console.log('Recipe Edit Error', action.err);
      break;
    }
    default: {
      console.log('No action associated with', action.type);
    }
  }
  return state;
};

export default recipeReducer;
