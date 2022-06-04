export const createCookbook = (cookbook) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('cookbooks')
      .add({
        ...cookbook,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date(),
      })
      .then(created_recipe => {
        dispatch({ type: 'CREATE_COOKBOOK', created_recipe });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_COOKBOOK_ERROR', err });
      });

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

const isRecipeInCookbook = (cookbook, recipeId) => {
  return false
}

export const addRecipeToCookbookById = (cookbookId, recipeId) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    if (isRecipeInCookbook(cookbookId, recipeId)){
    } else {
      // make async call to database
      const firestore = getFirestore();
      firestore
        .collection('recipes')
        .doc(recipeId)
        .get()
        .then((recipe) => {
          firestore
            .collection('cookbooks')
            .doc(cookbookId)
            .collection('recipes')
            .doc(recipeId)
            .set({...recipe.data()})
            .then((added_recipe) => {
              dispatch({ type: 'ADD_RECIPE_BY_ID_TO_COOKBOOK', added_recipe });
            })
        })
        .catch(err => {
          dispatch({ type: 'ADD_RECIPE_BY_ID_TO_COOKBOOK_ERROR', err });
        });
    }
  };
};

export const editCookbook = (cookbook) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    console.log("STATE", cookbook);

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('cookbooks')
      .doc(cookbook.id)
      .update({
        ...cookbook,
      })
      .then(() => {
        dispatch({ type: 'EDIT_COOKBOOK', cookbook });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_COOKBOOK_ERROR', err });
      });

  };
};

export const deleteCookbook = (id, cookbook) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to cookbook database
    const firestore = getFirestore();
    firestore
      .collection('cookbooks')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: 'DELETE_COOKBOOK', cookbook });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_COOKBOOK_ERROR', err });
      });

    // remove cookbook from user

    // remove cookbook frmo all recipe instances
    cookbook.recipes.forEach((recipe) => {

    })

  };
};
