export const createCookbook = (cookbook) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    const cookbookBlurb = {
      cookbookTitle: cookbook.cookbookTitle,
      cookbookAttribution: cookbook.cookbookAttribution
    }

    // make async call to database
    const firestore = getFirestore();
    firestore
      .collection('cookbooks')
      .add({
        ...cookbook,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        recipes: [],
        createdAt: new Date(),
      })
      .then(created_cookbook => {
        firestore.collection("users").doc(authorId).update({
          cookbooks: firestore.FieldValue.arrayUnion({...cookbookBlurb, cookbookId: created_cookbook.id})
        })
        dispatch({ type: 'CREATE_COOKBOOK', created_cookbook });
      })
      .catch(err => {
        dispatch({ type: 'CREATE_COOKBOOK_ERROR', err });
      });

    // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
  };
};

const isRecipeInCookbook = (cookbookId, recipeId, getFirestore) => {
  const firestore = getFirestore()
  firestore.collection('recipes').doc(recipeId).get()
    .then((recipe) => {
      if (recipe.exists){
        console.log(recipe.data().cookbooks.includes(cookbookId))
        return recipe.data().cookbooks.includes(cookbookId)
      } 
    }).catch((err) => {
      return false
    })
}

export const addRecipeToCookbookById = (cookbookId, recipeId) =>{
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('recipes').doc(recipeId).get()
    .then((recipe) => {
      if (recipe.exists){
        console.log(recipe.data().cookbooks.includes(cookbookId))
        return recipe.data().cookbooks.includes(cookbookId)
      } else {
        return false
      }
    }).then((recipeAlreadyPresent) => {
        if (recipeAlreadyPresent){
          console.log("Repeat ID in cookbook")
        } else {
          console.log("ADDING")
          // make async call to database
          
          firestore
            .collection('recipes')
            .doc(recipeId)
            .update({
              cookbooks: firestore.FieldValue.arrayUnion(cookbookId)
            })

          firestore
            .collection('recipes')
            .doc(recipeId)
            .get()
            .then((recipeObject) => {
              const recipe = recipeObject.data()
              const recipeBlurb = {
                recipeId: recipeId,
                recipeTitle: recipe.recipeTitle,
                recipeAttribution: recipe.recipeAttribution
              }
              firestore
                .collection('cookbooks')
                .doc(cookbookId)
                .update({
                  recipes: firestore.FieldValue.arrayUnion(recipeBlurb)
                })
                .then((added_recipe) => {
                  dispatch({ type: 'ADD_RECIPE_BY_ID_TO_COOKBOOK', added_recipe });
                })
            })
            .catch(err => {
              dispatch({ type: 'ADD_RECIPE_BY_ID_TO_COOKBOOK_ERROR', err });
            });
        }
    }).catch((err) => {
      dispatch({ type: 'ADD_RECIPE_BY_ID_TO_COOKBOOK_ERROR', err });
    })
  };
};

export const deleteRecipeFromCookbook = (cookbookId, recipeId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore.collection('recipes').doc(recipeId).get()
    .then((recipe) => {
      if (recipe.exists){
        return recipe.data().cookbooks.includes(cookbookId)
      } else {
        return false
      }
    }).then((recipePresent) => {
      if (recipePresent){
        // make async call to database
        const firestore = getFirestore();
        firestore
          .collection('recipes')
          .doc(recipeId)
          .update({
            cookbooks: firestore.FieldValue.arrayRemove(cookbookId)
          })

        firestore
          .collection('recipes')
          .doc(recipeId)
          .get()
          .then((recipeObject) => {
            const recipe = recipeObject.data()
            const recipeBlurb = {
              recipeId: recipeId,
              recipeTitle: recipe.recipeTitle,
              recipeAttribution: recipe.recipeAttribution
            }
            firestore
              .collection('cookbooks')
              .doc(cookbookId)
              .update({
                recipes: firestore.FieldValue.arrayRemove(recipeBlurb)
              })
              .then((added_recipe) => {
                dispatch({ type: 'DELETE_RECIPE_BY_ID_FROM_COOKBOOK', added_recipe });
              })
          })
        .catch(err => {
          dispatch({ type: 'DELETE_RECIPE_BY_ID_FROM_COOKBOOK_ERROR', err });
        });
      } else {
        console.log("Recipe ID not in cookbook")
      }
      }).catch((err) => {
          dispatch({ type: 'DELETE_RECIPE_BY_ID_FROM_COOKBOOK_ERROR', err });
    })
  }
}


export const editCookbook = (cookbook) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
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


    const cookbookBlurb = {
      cookbookId: id,
      cookbookTitle: cookbook.cookbookTitle,
      cookbookAttribution: cookbook.cookbookAttribution
    }
    console.log(cookbookBlurb)
    // remove cookbook from user
    const authorId = getState().firebase.auth.uid;
    firestore
      .collection('users')
      .doc(authorId)
      .update({
        recipes: firestore.FieldValue.arrayRemove(cookbookBlurb)
      })

    // remove cookbook frmo all recipe instances
    cookbook.recipes.forEach((recipe) => {
      firestore
        .collection("recipes")
        .doc(recipe.recipeId)
        .update({
          cookbooks: firestore.FieldValue.arrayRemove(cookbookBlurb)
        })
    })

  };
};
