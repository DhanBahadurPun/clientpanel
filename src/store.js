import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import "firebase/firestore";
//Reducers
// @todo
import notifyReducer from "./reducers/notifyReducer";
import settingReducer from "./reducers/settingReducer";

const firebaseConfig = {
  apiKey: "AIzaSyBX0bO_9MfwIsUOhgB6BKk9PHc9ldsPq20",
  authDomain: "reactclientpanel-f2f90.firebaseapp.com",
  databaseURL: "https://reactclientpanel-f2f90.firebaseio.com",
  projectId: "reactclientpanel-f2f90",
  storageBucket: "reactclientpanel-f2f90.appspot.com",
  messagingSenderId: "641050106022"
};

// react-redux-firesbase Config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for profile instead of Real time DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

// Init firestore
const firestore = firebase.firestore();
const settings = { /* your setting */ timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // needed if using firestore
)(createStore);

// Add firestore to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingReducer
});

// check for settings in localStorage
if (localStorage.getItem("settings") == null) {
  // default settings
  const defaultSettings = {
    disableBalanceOnAdd: true,
    disableBalanceOnEdit: false,
    allowRegistration: false
  };
  // set to localStorage
  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}
// Create initial state

const initialState = {
  settings: JSON.parse(localStorage.getItem("settings"))
};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
