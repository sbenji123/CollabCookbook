export const navToRecipe = (recipe) => {
    return (dispatch, getState) => {
        dispatch({type: 'NAV_TO_RECIPE', recipe})
    }
}

export const createRecipe = (recipe) => {
    return (dispatch, getState) => {
        // make async call to database

        // format string to arrays
        const directions = recipe.directions + ''
        recipe.directions = directions.split('\n')
        const ingredients = recipe.ingredients + ''
        recipe.ingredients = ingredients.split('\n')

        dispatch({type: 'CREATE_RECIPE', recipe})
        // can do this cuz of JS6 dispatch({type: 'CREATE_RECIPE', recipe: recipe})
    }
}

export const editRecipe = (recipe) => {
    return (dispatch, getState) => {
        // make async call to database

        // format string to arrays
        const directions = recipe.directions + ''
        recipe.directions = directions.split('\n')
        const ingredients = recipe.ingredients + ''
        recipe.ingredients = ingredients.split('\n')

        dispatch({type: 'EDIT_RECIPE', recipe})
    }
}