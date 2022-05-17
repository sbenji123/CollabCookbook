// combining all other reducers into 1 reducer
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer";
import { combineReducers } from "redux";
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    recipe: recipeReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer;