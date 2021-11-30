const initState = {
    recipe: {id: '1', title: "Date Balls", author: "Samuel Benjamin", prepTime: "20 minutes", totalTime: "60 minutes", servingSize: 6,
            ingrediants: ["1 stick of butter",
                        "1 cup of brown sugar",
                        "8 oz. chopped dates",
                        "1 egg, beaten",
                        "1 teaspoon of vanilla",
                        "3 cups of Rice Krispies",
                        "1 package of coconut"],
            directions: ["Put the first 3 ingredients in a large skillet and stir on low until it becomes steamy hot, but not boiling.",
                        "Take off the stove and add the beaten egg and vanilla.",
                        "Return to the stove and cook slowly for 5 minutes. Add the Rice Krispies, mix well and remove from heat.",
                        "Cool mixture slightly.  Roll small balls of the mixture in coconut.  Place them on wax paper to cool.  Place in refrigerator or freezer until serving."],
            image: '/img/food.jpg'},
}
// need to add some sort of auth and cookbook list to this

const recipeReducer = (state = initState, action) => {
    switch (action.type) {
        case 'NAV_TO_RECIPE': {
            console.log('Navigated to Recipe Page', action.recipe)
            state.recipe = action.recipe
            break
        } case 'CREATE_RECIPE': {
            console.log('Recipe Created', action.recipe)
            state.recipe = action.recipe
            break
        } case 'EDIT_RECIPE': {
            console.log('Recipe Edited', action.recipe)
            state.recipe = action.recipe
            break
        } case 'DELETE_RECIPE': {
            console.log('Recipe Deleted', action.recipe)
            break
        } default :{
            console.log("No action associated with", action.type)
        }
    }
    return state
}

export default recipeReducer;



