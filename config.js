// export const env = 'dev'

//config for firebase
export const fbConfig = {
    apiKey: "AIzaSyAar1q5PCiUUOUyvUw_JgEP7I7WNgRNuxc",
    authDomain: "react-native-f5221.firebaseapp.com",
    databaseURL: "https://react-native-f5221.firebaseio.com",
    projectId: "react-native-f5221",
    storageBucket: "react-native-f5221.appspot.com",
    messagingSenderId: "985364194171",
    appId: "1:985364194171:web:0f1f7d0380fd73f85f13de",
    measurementId: "G-QYVQ3EB7XR"
  };

  export const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
    enableLogging: false
  }
  
  export default {
    fbConfig,
    rrfConfig
  }