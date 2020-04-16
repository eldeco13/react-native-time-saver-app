// import { createStore, compose } from 'redux'
// import firebase from 'firebase/app'
// import 'firebase/auth'
// import 'firebase/database'
// import 'firebase/firestore' // make sure you add this for firestore
// //import { reactReduxFirebase } from 'react-redux-firebase'
// import { firebase as fbConfig } from './config'
// import rootReducer from './reducer'

// import { createStore, combineReducers, compose } from 'redux'
// import {
//     ReactReduxFirebaseProvider,
//     firebaseReducer
//   } from 'react-redux-firebase'
//   import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore


// export default function configureStore(initialState, history) {
//   // Initialize Firebase instance
//   firebase.initializeApp(fbConfig)

//   // react-redux-firebase config
// const rrfConfig = {
//     userProfile: 'users'
//     // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
//   }

// // Initialize firebase instance
// firebase.initializeApp(fbConfig)

// // Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore

// // Add firebase to reducers
// const rootReducer = combineReducers({
//     firebase: firebaseReducer,
//     firestore: firestoreReducer // <- needed if using firestore
//   })

//   // Create store with reducers and initial state
// const initialState = {}
// const store = createStore(rootReducer, initialState)

// //   const createStoreWithMiddleware = compose(
// //     reactReduxFirebase(firebase, {
// //       userProfile: 'users',
// //     //   useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
// //     //   enableLogging: false
// //     })
// //   )(createStore)

//   const store = createStoreWithMiddleware(rootReducer)

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('./reducer', () => {
//       const nextRootReducer = require('./reducer')
//       store.replaceReducer(nextRootReducer)
//     })
//   }

//   return store
// }