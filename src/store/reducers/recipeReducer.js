const initState = {
    recipes: [
        {id: '1', title: "Date Balls", author: "Samuel Benjamin", prepTime: "20 minutes", totalTime: "60 minutes", servingSize: 6,
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
        image: '../../../public/img/food.jpg'},
        {id: '2', title: "Date Balls", author: "Samuel Benjamin", prepTime: "20 minutes", totalTime: "60 minutes", servingSize: 6,
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
        image: '../../../public/img/food.jpg'},
        {id: '3', title: "Date Balls", author: "Samuel Benjamin", prepTime: "20 minutes", totalTime: "60 minutes", servingSize: 6,
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
        image: '../../../public/img/food.jpg'}
    ]
}
// need to add some sort of auth and cookbook list to this

const recipeReducer = (state = initState, action) => {
    return state
}

export default recipeReducer;



