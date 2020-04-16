import React, {useState} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
  } from 'react-native';
import { useSelector } from 'react-redux'

export default function TimerInput({changeTimerInput, input, min, sec}) {

    return (
        <View>
            <View style={styles.timerInputContainer}>
                <Text style={styles.timerTitle}>Input time</Text>
                <TextInput
                    style={{ height: 20, borderColor: 'gray', borderWidth: 1, color: "#fff" }}
                    onChangeText={text => changeTimerInput(text)}
                    keyboardType="number-pad"
                    value={input}
                />
            </View>
            <View style={styles.timerCountDownContainer}>
                <Text style={styles.timerTitle}>Min : {min} : Sec {sec}</Text>
                {/* <Text style={styles.timerTitle}>Min : {input}</Text> */}
            </View>
        </View>
        );
    }


const styles = StyleSheet.create({
    timerContainer: {
        marginLeft: 100
    },
    timerInputContainer: {
    //    flex: 1
    },
    timerCountDownContainer: {
       // flex: 2
    },
    timerTitle: {
        fontSize: 22,
        color: "#fff",
        textAlign: "center",
        marginBottom: 5,
      },
});