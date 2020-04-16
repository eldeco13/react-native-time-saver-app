import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'

const playIcon = require('../assets/images/play_arrow_black.png')
const stopIcon = require('../assets/images/stop_black.png')

export default function ActivityRecorder({id}) {
    const [recordId, setRecordId] = useState('');
    useFirestoreConnect([
        { collection: 'recordActivity',
        doc: recordId}
      ])
    const firestore = useFirestore()
    const activity = useSelector(
        ({ firestore: { data } }) => data.timesaver && data.timesaver[id]
    )
    const record = 
        useSelector( ({ firestore: { data } }) => data.recordActivity && data.recordActivity[recordId])

    //const timeRecorder = useSelector(state => state.firestore.ordered.recordActivity)

    // const recordedActivity = useSelector(
    //     (({recordActivity}) => data.recordActivity)
    // )

    function startRecording() {
        console.log('starting recording')
        const recordActivity = { activity: activity.title, startTime: new Date() }
        // return firestore.collection('recordActivity').add(recordActivity).then(() => {
        //     printFirestore();
        // })
        return firestore.collection('recordActivity').add(recordActivity)
            .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            setRecordId(docRef.id)
          })
      }

    async function stopRecording(){
        console.log('stop recording')
        let msDiff = Math.abs((new Date() - record.startTime.toDate()) / 1000);
        let fhours = Math.floor(msDiff / 3600) % 24;
        let fminutes = Math.floor(msDiff / 60) % 60;
        console.log(msDiff);
        console.log(fhours)
        console.log(fminutes)                                     
         return await firestore.collection('recordActivity').doc(recordId).update({stopTime: new Date(), duration: msDiff, hours: fhours, minutes: fminutes})
        // .then(calculateDuration())
    }

    async function calculateDuration() {
        await stopRecording();
        console.log('record')
        console.log(record)
        const {startTime, stoptime} = record;
        console.log(startTime)
        console.log(stoptime)
    }

    console.log('recordId')
    console.log(recordId)



    return (
    <View style={styles.activitiesRecorderContainer}>   
        <View style={styles.controlsContainer}>
            <TouchableOpacity onPress={startRecording}>
                <Image source={playIcon} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={calculateDuration}> 
                <Image source={stopIcon} style={styles.icon} />
                {/* <Text style={{color: 'white'}}>{timeRecorder}</Text>  */}
            </TouchableOpacity>

        </View>
    </View>

    )
}

const styles = StyleSheet.create({
    activitiesRecorderContainer: {
        flex: 1
    },
    controlsContainer: {
        padding: 10,
        // backgroundColor: '#202020',
        flexDirection: 'row',
        alignItems: 'center',
        // marginTop: 175,
      },
      icon: {
        tintColor: '#fff',
        height: 36,
        width: 36,
        marginLeft: 15,
        marginRight: 15,
      },
})
