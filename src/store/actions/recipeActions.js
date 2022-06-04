

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

    // add to recipe database
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
        const recipeBlurb = {
            recipeId: created_recipe.id,
            recipeTitle: recipe.recipeTitle,
            recipeAttribution: recipe.recipeAttribution
        }
        console.log(recipeBlurb)
        // add new recipe to user's recipes
        firestore
          .collection('users')
          .doc(authorId)
          .update({
            recipes: firestore.FieldValue.arrayUnion(recipeBlurb)
          })
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
            .update({
              recipes: firestore.FieldValue.arrayUnion(recipeBlurb)
            })
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

const changedTitle = (oldRecipe, newRecipe) => {
  return oldRecipe.recipeTitle !== newRecipe.recipeTitle
}

const changedAttribution = (oldRecipe, newRecipe) => {
  console.log(oldRecipe, newRecipe)
  return oldRecipe.recipeAttribution !== newRecipe.recipeAttribution

}

export const editRecipe = (oldRecipe, newRecipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    console.log("STATE", oldRecipe);

    // format string to arrays
    const directions = newRecipe.directions + '';
    newRecipe.directions = directions.split('\n');
    const ingredients = newRecipe.ingredients + '';
    newRecipe.ingredients = ingredients.split('\n');

    // edit in recipe database
    const firestore = getFirestore();
    firestore
      .collection('recipes')
      .doc(newRecipe.id)
      .update({
        ...newRecipe,
      })
      .then(() => {
        dispatch({ type: 'EDIT_RECIPE', newRecipe });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_RECIPE_ERROR', err });
      });
    
    if (changedAttribution(oldRecipe, newRecipe) || changedTitle(oldRecipe, newRecipe)) {
      console.log("Deep Dive needed for recipe edit")
      const oldRecipeBlurb = {
        recipeId: oldRecipe.id,
        recipeTitle: oldRecipe.recipeTitle,
        recipeAttribution: oldRecipe.recipeAttribution
      }
      const newRecipeBlurb = {
        recipeId: newRecipe.id,
        recipeTitle: newRecipe.recipeTitle,
        recipeAttribution: newRecipe.recipeAttribution
      }
      // edit in user database
      const authorId = getState().firebase.auth.uid;
      firestore
        .collection('users')
        .doc(authorId)
        .update({
          recipes: firestore.FieldValue.arrayRemove(oldRecipeBlurb)
        })
      .then(() => {
        firestore
          .collection('users')
          .doc(authorId)
          .update({
            recipes: firestore.FieldValue.arrayUnion(newRecipeBlurb)
          })
      })
      .then(() => {
        dispatch({ type: 'EDIT_RECIPE_IN_USER', newRecipe });
      })
      .catch((err) => {
        dispatch({ type: 'EDIT_RECIPE_IN_USER_ERROR', err });
      });

        // edit in all cookbooks that it is in
        const cookbooksRecipeIsIn = newRecipe.cookbooks
        cookbooksRecipeIsIn.forEach((cookbookId) => {
          firestore
            .collection('cookbooks')
            .doc(cookbookId)
            .update({
              recipes: firestore.FieldValue.arrayRemove(oldRecipeBlurb)
            })
          .then(() => {
            firestore
              .collection('cookbooks')
              .doc(cookbookId)
              .update({
                recipes: firestore.FieldValue.arrayUnion(newRecipeBlurb)
              })
          })
          .then(() => {
            dispatch({ type: 'EDIT_RECIPE_IN_COOKBOOK', newRecipe });
          })
          .catch((err) => {
            dispatch({ type: 'EDIT_RECIPE_IN_COOKBOOK_ERROR', err });
          });
        })
    }

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

export const deleteRecipeCompletely = (id, recipe) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const recipeBlurb = {
      recipeId: id,
      recipeTitle: recipe.recipeTitle,
      recipeAttribution: recipe.recipeAttribution
  }
    
    // delete from recipe database
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

    // delete in user database
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .update({
        recipes: firestore.FieldValue.arrayRemove(recipeBlurb)
      })
      .then((recipe) => {
        dispatch({ type: 'DELETE_RECIPE_FROM_USER', recipe });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_RECIPE_FROM_USER_ERROR', err });
      });

    // delete in all cookbooks that it is in
    const allCookbooks = recipe.cookbooks
    allCookbooks.forEach((cookbookId) => {
      firestore
        .collection('cookbooks')
        .doc(cookbookId)
        .update({
          recipes: firestore.FieldValue.arrayRemove(recipeBlurb)
        })
        .then((recipe) => {
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
