import { firestoreConnect } from "react-redux-firebase";


export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: "LOGIN_SUCCESS"})
    }).catch((err) => {
      dispatch({type: "LOGIN_ERROR", err })
    });
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() =>{
      dispatch({type: "SIGN_OUT_SUCCESS"})
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((resp) =>{
      return firestore.collection('users').doc(resp.user.uid).set({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        initials: newUser.firstName[0].toUpperCase() + newUser.lastName[0].toUpperCase()
      })
    }).then(() => {
      dispatch({type: "SIGN_UP_SUCESS"})
    }).catch((err) => {
      dispatch({type: "SIGN_UP_ERROR", err})
    })
  }
}