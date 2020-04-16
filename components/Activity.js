import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
import { useSelector } from 'react-redux'



export default function Activity({ id, selected, navigation }) {
    console.log('id' + id)
    // useFirestoreConnect([{
    //     collection: 'timesaver',
    //     doc: id
    //   }])
    const activity = useSelector(
        ({ firestore: { data } }) => data.timesaver && data.timesaver[id]
    )
    console.log('activity')
    console.log(activity)
    return (

        <View style={styles.activityDescription} >
                <TouchableOpacity
                    onPress={() => onSelect(id)}
                    onPress={() => navigation.navigate('RecordActivity', {
                    activityId: id,
                    //otherParam: activity.title,
                    })}
                    style={[
                    styles.activity,
                    { backgroundColor: selected ? '#FA7B5F' : '#192338' },
                    ]}
                >

                <Text style={styles.activityTitle}>{activity.title}</Text>
            </TouchableOpacity>
        </View>
    );
  }

  const styles = StyleSheet.create({

    activityDescription: {
        flex: 2
    },
    activityTitle: {
        fontSize: 32,
        color: "#fff",
        textAlign: "center",
        marginBottom: 10,
      },
  });