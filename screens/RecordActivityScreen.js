import React, { useState} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';
import { useSelector } from 'react-redux'
import ActivityTimer from '../containers/ActivityTimer'
import ActivityBreak from '../containers/ActivityBreak'
import ActivityController from '../containers/ActivityController'

export default function RecordActivityScreen({route, navigation }) {
    const { activityId } = route.params;
    const activity = useSelector(
        ({ firestore: { data } }) => data.timesaver && data.timesaver[activityId]
      )

    return(
      <View style={styles.recordActivityContainer}>
          <View>
            <Text style={styles.activityTitleContainer}>
                {activity.title}
            </Text>
          </View>
          <View style={styles.timerAndBreakContainer}>
            {/* <ActivityBreak />
            <ActivityTimer />  */}
            <ActivityController />
          </View>
      </View> 
    )
}

const styles = StyleSheet.create({
    recordActivityContainer: {
      flex: 1,
     // marginTop: Constants.statusBarHeight,
      backgroundColor: "#192338",
      paddingVertical: 20,
      //position: "relative"
    },
    activityTitleContainer: {
        fontSize: 32, 
        color: "#fff", 
        marginBottom: 20,
        textAlign: "center",
        
      },
    timerAndBreakContainer: {
        alignItems: "center"
    },

  });