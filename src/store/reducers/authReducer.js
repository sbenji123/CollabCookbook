const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR': {
      console.log('login error');
      return {
        ...state,
        authError: 'Login failed'
      }
    }
    case 'LOGIN_SUCCESS': {
      console.log('login success');
      return {
        authError: null
      }
    }
    case 'PASSWORD_RESET_SUCESS':{
      console.log("password reset sucess")
      return state
    }
    case 'PASSWORD_RESET_ERROR':{
      console.log("password reset error", action.err.message)
      return state
    }
    case 'SIGN_OUT_SUCESS': {
      console.log("sign out success")
      return state
    }
    case "SIGN_UP_SUCCESS": {
      console.log("sign up success")
      return{
        ...state,
        authError: null
      }
    }
    case "SIGN_UP_ERROR": {
      console.log("sign up error")
      return {
        ...state,
        authError: action.err.message
      }
    }
    default:
      return state
  }
};

export default authReducer;