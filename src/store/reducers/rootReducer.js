// combining all other reducers into 1 reducer
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    auth: authReducer,
    recipes: recipeReducer
})

export default rootReducer;