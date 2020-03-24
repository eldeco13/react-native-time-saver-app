import React, { useState, useRef, useReducer} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
} from 'react-native';

import {db} from '../../config/firebase'
import * as Localization from 'expo-localization';

const STOPPED = "Stopped"
const STARTED = "Started"

const timeRecordReducer = (state, action) => {
  switch (action.type){
    case 'START':
      return {
        ...state,
        activityState: STARTED,
        startTime: action.payload
      }
    case 'STOP':
        return {
          ...state,
          activityState: STOPPED,
         stopTime: action.payload
        }
      default:
        throw new Error();
  }
}

export default function RecordActivityScreen({ route, navigation }) {
    /* 2. Get the param */
    const [state, dispatch] = useReducer(timeRecordReducer,{
      activityStatstatee: STOPPED,
    })
    const { itemId } = route.params;
    const { otherParam } = route.params;
    const [time, setTime] = useState(new Date())
    //const [startTime, setStartTime] = useState('')
    //const [stopTime, setStopTime] = useState('')
    //const [activityState, setActivityState] = useState(STOPPED)
    const [timeElapsed, setTimeElapsed] = useState('')
    const savedCallback = useRef();
  
      // Remember the latest callback.
      // useEffect(() => {
      //   savedCallback.current = callback;
      // }, [callback]);
  
    // useEffect(() => {
    //   setInterval( () => {
    //     setCurTime(new Date().getTime())
  
  
    //     //console.log(date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec);
  
    //   },1000)
    //   // return () => {
    //   //   cleanup
    //   // }
    // }, [curTime])
  
    const recordActivityStart = () => {
      console.log('recordActivityStart')
      //let time = new Date().getTime(); //Current time, used for calculations
      let date = new Date().getDate(); //Current Date
      let month = new Date().getMonth() + 1 //Current Month
      let year = new Date().getFullYear(); //Current Year
      let hours = new Date().getHours(); //Current Hours
      let min = new Date().getMinutes(); //Current Minutes
      let sec = new Date().getSeconds(); //Current Seconds
  
      //i will need to commit the data at some point -- after stop
      const formattedDate = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
      setTime(new Date())
      //setStartTime(formattedDate);
      dispatch({type: 'START', payload: formattedDate})
      //setActivityState(STARTED)
      console.log('state.time');
      console.log(state.startTime);
    }
  
    const recordActivityStop = () => {
      console.log('recordActivityStop')
      //let stopTime = new Date().getTime(); //Current time, used for calculations
      let date = new Date().getDate(); //Current Date
      let month = new Date().getMonth() + 1 //Current Month
      let year = new Date().getFullYear(); //Current Year
      let hours = new Date().getHours(); //Current Hours
      let min = new Date().getMinutes(); //Current Minutes
      let sec = new Date().getSeconds(); //Current Seconds
  
      //i will need to commit the data at some point -- after stop
      const formattedDate = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
      //setTime(time)
      //setStopTime(formattedDate);
      dispatch({type: 'STOP', payload: formattedDate})
      //setActivityState(STOPPED)
  
      //move the calculation of elapsed time to a new function
      console.log(time)
      let msDiff = Math.abs((new Date().getTime() - time.getTime()) / 1000);    //stop activity time - start activity time
      //https://www.toptal.com/software/definitive-guide-to-datetime-manipulation
      
      //console.log(msDiff)
      // get hours 
      let fhours = Math.floor(msDiff / 3600) % 24;
      let fminutes = Math.floor(msDiff / 60) % 60;
      //let daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      console.log("hrs / min")
      console.log(fhours);
      console.log(fminutes);
      setTimeElapsed(`hours : ${new Date().getHours() - time.getHours()}, minutes : ${new Date().getMinutes() - time.getMinutes()}`);
      
      //
  
      //commit
      // Add a new document with a generated id.
        let docRef = db.collection("record-activities").add({
          //id: docRef.id,
          activityID: itemId,
          activityName: otherParam,
          startDate: time,
          hours: fhours,
          minutes: fminutes,
          endDate: new Date(),
          created: new Date()
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          docRef.update({
            id: docRef.id
          });
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  
    return (
  
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#192338"}}>
        <Text style={{fontSize: 42, color: "#fff", marginBottom: 20}}>
          {otherParam}
        </Text>
  
        <View style={{flexDirection: 'row', alignItems: 'space-between', backgroundColor: "#192338", marginBottom: 20}}>
          <Button  style={{fontSize: 22, color: "#fff", margin: 10}} title="Start" onPress={() => recordActivityStart()} />
          <Button style={{fontSize: 22, color: "#fff"}} title="Stop" onPress={() => recordActivityStop()} />
        </View>
  
        {/* <Button title="Go to Home" onPress={() => navigation.navigate('Home')} /> */}
        {/* <Button title="Go back" onPress={() => navigation.goBack()} /> */}
        <View>
              <Text style={{fontSize: 22, color: "#fff", }}>
                Activity Status : {state.activityState}
              </Text>
              <Text style={{fontSize: 22, color: "#fff", }}>
                Start Time : {state.startTime}
              </Text>
              <Text style={{fontSize: 22, color: "#fff", }}>
                Stop Time : {state.stopTime}
              </Text>
              <Text style={{fontSize: 22, color: "#fff", }}>
                Duration : {timeElapsed}
              </Text>
          </View>
          <Text style={{fontSize: 22, color: "#fff", }}>Country: {Localization.locale}</Text>
      </View>
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
