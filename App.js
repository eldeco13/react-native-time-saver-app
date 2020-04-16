import React, { useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  View,
  FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';

//import { useData } from './hooks/useData'

import Constants from 'expo-constants';
//import {db} from './config/firebase' 
import * as Localization from 'expo-localization';

import { Provider } from 'react-redux'
//import configureStore from './store'

import HomeScreen from './screens/HomeScreen';
import RecordActivityScreen from './screens/RecordActivityScreen';

import firebase from 'firebase/app';
//import 'firebase/auth'
import 'firebase/firestore'// <- needed if using firestore
// import 'firebase/functions' // <- needed if using httpsCallable
import { createStore, combineReducers, compose } from 'redux'
import { ReactReduxFirebaseProvider, firebaseReducer } from 'react-redux-firebase'
import { createFirestoreInstance, firestoreReducer } from 'redux-firestore' // <- needed if using firestore
import {fbConfig} from './config'
import {decode, encode} from 'base-64'

if (!global.btoa) {  global.btoa = encode }
if (!global.atob) { global.atob = decode }

// const initialState = window.__INITIAL_STATE__ || {
//   firebase: { authError: null }
// }

// const store = configureStore(initialState)

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users'
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
}

// Initialize firebase instance
firebase.initializeApp(fbConfig)

// Initialize other services on firebase instance
firebase.firestore() // <- needed if using firestore
// firebase.functions() // <- needed if using httpsCallable

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer 
})

// Create store with reducers and initial state
const initialState = {}
const store = createStore(rootReducer, initialState)

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
}



//const
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleAlign: 'center',
            headetMode: 'screen',
            // headerLeft: () => (
            //   <Button
            //     onPress={() => alert('This is a button!')}
            //     title="Info"
            //     color="#fff"
            //   />
            // ),
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
              marginBottom: 10
            },
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Activities List' }}
            />
          <Stack.Screen
            name="RecordActivity"
            component={RecordActivityScreen}
            options={{ title: 'Record Activity' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
   // marginTop: Constants.statusBarHeight,
    backgroundColor: "#192338",
    paddingVertical: 50,
    flexDirection: 'row-reverse'
    //position: "relative"
  },
  activity: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "grey",
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10
  },
});
