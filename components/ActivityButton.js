import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
import { useSelector } from 'react-redux'
import Timer from './Timer'

export default function ActivityButton ({buttonText, startTimer}) {
    return (
        <View>
            <TouchableOpacity
                style={styles.button}
                onPress={startTimer}
                >
            <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "blue",
        padding: 20,
        borderRadius: 5,
      },
    buttonText: {
        fontSize: 20,
        color: '#fff',
        textAlign: "center",
      }, 
});