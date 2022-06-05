const initState = {}

const cookbookReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_COOKBOOK': {
      console.log(action)
      console.log('Cookbook Created', action.cookbook);
      break;
    }
    case 'CREATE_COOKBOOK_ERROR': {
      console.log('Create Project Error', action.err);
      break;
    }
    case 'EDIT_COOKBOOK': {
      console.log('Cookbook Edited', action.cookbook);
      break;
    }
    case 'EDIT_COOKBOOK_ERROR': {
      console.log('Cookbook Edit Error', action.err);
      break;
    }
    case 'DELETE_COOKBOOK': {
      console.log(action)
      console.log('Cookbook Deleted', action.cookbook);
      break;
    }
    case 'DELETE_COOKBOOK_ERROR': {
      console.log('Cookbook DELETE Error', action.err);
      break;
    }
    case 'ADD_RECIPE_BY_ID_TO_COOKBOOK': {
      console.log('Add recipe by id to cookbook', action.cookbook);
      break;
    }
    case 'ADD_RECIPE_BY_ID_TO_COOKBOOK_ERROR': {
      console.log('Add recipe by id to cookbook Error', action.err);
      break;
    }
    case 'DELETE_RECIPE_BY_ID_FROM_COOKBOOK': {
      console.log('Delete recipe by from to cookbook', action.cookbook);
      break;
    }
    case 'DELETE_RECIPE_BY_ID_FROM_COOKBOOK_ERROR': {
      console.log('Delete recipe by id from cookbook Error', action.err);
      break;
    }
    default: {
      console.log('No action associated with', action.type);
    }
  }
  return state;
}

export default cookbookReducer;