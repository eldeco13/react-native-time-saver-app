
import React, { useState, useRef, useReducer, useCallback} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    Button,
    View,
    Image,
    FlatList
  } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';


import * as Localization from 'expo-localization';
import timeRecordReducer, {initialStateRecordActivity} from '../reducer'
import useRecordActivity from '../hooks/useRecordActivity'
import {startRecord, stopRecord} from '../action/actionCreators' 

import ActivitiesList from '../containers/ActivitiesList'




export default function HomeScreen({ navigation }) {

    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={styles.homeScreenContainer}>
          <View style={styles.activitiesListContainer} > */}
            <ActivitiesList navigation={navigation}/>
          {/* </View> */}
          {/* <View style={styles.activitiesRecorderContainer} >
              <View style={styles.controlsContainer}>
                <Image source={playIcon} style={styles.icon} />
                <Image source={stopIcon} style={styles.icon} />
              </View>
          </View> */}
        {/* </View> */}

      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
     // marginTop: Constants.statusBarHeight,
      backgroundColor: "#192338",
      paddingVertical: 50,
    //   flexDirection: 'row-reverse'
      //position: "relative"
    },
    // homeScreenContainer: {
    //    flexDirection: 'row',
    //    alignItems: "center"
    // },
    // activitiesListContainer: {

    // },
    // controlsContainer: {
    //     padding: 10,
    //     backgroundColor: '#202020',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     marginTop: 175,
    //   },
    //   icon: {
    //     tintColor: '#fff',
    //     height: 16,
    //     width: 16,
    //     marginLeft: 5,
    //     marginRight: 5,
    //   },
  });
  