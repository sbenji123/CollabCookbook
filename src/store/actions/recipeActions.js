

export const navToRecipe = (recipe) => {
  return (dispatch, getState) => {
    console.log('DISPATCH');
    console.log(recipe);

    dispatch({ type: 'NAV_TO_RECIPE', recipe });
  };
};

export const createRecipe = (recipe, cookbookId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    console.log("bingo")
    // format string to arrays
    const directions = recipe.directions + '';
    recipe.directions = directions.split('\n');
    const ingredients = recipe.ingredients + '';
    recipe.ingredients = ingredients.split('\n');
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    const newRecipe = {
      ...recipe,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date(),
      cookbooks: cookbookId ? [cookbookId] : []
    }

    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .add(newRecipe)
      .then(created_recipe => {
        console.log("CREATE RECIPE")
        dispatch({ type: 'CREATE_RECIPE', created_recipe });
        return created_recipe
      })
      .then((created_recipe) => {
        // add new recipe to user's recipes
        firestore
          .collection('users')
          .doc(authorId)
          .collection('recipes')
          .doc(created_recipe.id)
          .set({...newRecipe})
          .then(updated_user => {
            dispatch({ type: 'ADD_CREATED_RECIPE_TO_USER', updated_user });
            return updated_user
          })
          .catch(err => {
            dispatch({ type: 'ADD_CREATED_RECIPE_TO_USER_ERROR', err });
          });

        // add recipe to cookbook if there is one
        if (cookbookId){
          console.log("Cookbook here")
          firestore
            .collection('cookbooks')
            .doc(cookbookId)
            .collection('recipes')
            .doc(created_recipe.id)
            .set({...newRecipe})
            .then(updated_cookbook => {
              dispatch({ type: 'ADD_CREATED_RECIPE_TO_COOKBOOK', updated_cookbook });
              return updated_cookbook
            })
            .catch(err => {
              dispatch({ type: 'ADD_CREATED_RECIPE_TO_COOKBOOK_ERROR', err });
            });
        }
      })
      .catch(err => {
        dispatch({ type: 'CREATE_RECIPE_ERROR', err });
      });
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

    // edit in recipe database
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
    
      
    // edit in user database
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .collection('recipes')
      .doc(recipe.id)
      .update({
        ...recipe
      })
      .then(() => {
        dispatch({ type: 'EDIT_RECIPE_IN_USER', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_RECIPE_IN_USER_ERROR', err });
      });

      // edit in all cookbooks that it is in

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

export const deleteRecipe = (id, recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    
    // delete from recipe database
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .doc(id)
      .delete()
      .then((recipe) => {
        console.log("Del Rep",recipe)
        dispatch({ type: 'DELETE_RECIPE', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_PROJECT_ERROR', err });
      });

    // delete in user database
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .collection('recipes')
      .doc(id)
      .delete()
      .then((recipe) => {
        dispatch({ type: 'DELETE_RECIPE_FROM_USER', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_RECIPE_FROM_USER_ERROR', err });
      });

    // delete in all cookbooks that it is in
    const allCookbooks = recipe.cookbooks
    console.log("ALL COOKBOOKS", allCookbooks)
    allCookbooks.forEach((cookbookId) => {
      firestore
        .collection('cookbooks')
        .doc(cookbookId)
        .collection('recipes')
        .doc(id)
        .delete()
        .then((recipe) => {
          console.log("SUCCESS:", recipe)
          dispatch({ type: 'DELETE_RECIPE_FROM_COOKBOOK', recipe });
        })
        .catch((err) => {
          console.log(err)
          dispatch({ type: 'DELETE_RECIPE_FROM_COOKBOOK_ERROR', err });
        });
    })

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};
