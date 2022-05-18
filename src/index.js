import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import reportWebVitals from './reportWebVitals';
import rootReducer from './store/reducers/rootReducer';
import { createFirestoreInstance, getFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from './config/fbConfig';

// can have many middleware to enhance the store
const store = createStore(
  rootReducer,
  applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const rffProps = {
  firebase: firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance: createFirestoreInstance,
};

ReactDOM.render(
  // <React.StrictMode> can remove
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rffProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>,
  // </React.StrictMode>, CAN REMOVE THIS EEVNTUALLY TO GET THINGS OUT OF
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
