export const navToRecipe = (recipe) => {
  return (dispatch, getState) => {
    console.log('DISPATCH');
    console.log(recipe);

    dispatch({ type: 'NAV_TO_RECIPE', recipe });
  };
};

export const createRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // format string to arrays
    const directions = recipe.directions + '';
    recipe.directions = directions.split('\n');
    const ingredients = recipe.ingredients + '';
    recipe.ingredients = ingredients.split('\n');

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .add({
        ...recipe,
        authorId: 12345,
        createdAt: new Date(),
      })
      .then(() => {
        dispatch({ type: 'CREATE_RECIPE', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_PROJECT_ERROR', err });
      });

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

export const editRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database

    console.log('State', getState);

    // format string to arrays
    const directions = recipe.directions + '';
    recipe.directions = directions.split('\n');
    const ingredients = recipe.ingredients + '';
    recipe.ingredients = ingredients.split('\n');

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .doc()
      .update({
        ...recipe,
      })
      .then(() => {
        dispatch({ type: 'EDIT_RECIPE', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_PROJECT_ERROR', err });
      });

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

export const removeRecipe = (recipe) => {
  return (dispatch, getState) => {
    dispatch({ type: 'REMOVE_RECIPE', recipe });
  };
};
