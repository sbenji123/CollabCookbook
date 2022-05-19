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
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    console.log(profile, authorId)

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .add({
        ...recipe,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(created_recipe => {
        dispatch({ type: 'CREATE_RECIPE', created_recipe });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_RECIPE_ERROR', err });
      });

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

export const editRecipe = (recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    console.log("STATE", recipe);

    // format string to arrays
    const directions = recipe.directions + '';
    recipe.directions = directions.split('\n');
    const ingredients = recipe.ingredients + '';
    recipe.ingredients = ingredients.split('\n');

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .doc(recipe.id)
      .update({
        ...recipe,
      })
      .then(() => {
        dispatch({ type: 'EDIT_RECIPE', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_RECIPE_ERROR', err });
      });

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

export const deleteRecipe = (id) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .doc(id)
      .delete()
      .then((recipe) => {
        dispatch({ type: 'DELETE_RECIPE', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_PROJECT_ERROR', err });
      });

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};
