export const createRecipe = (recipe) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type: 'CREATE_RECIPE', recipe})
        // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
    }
}