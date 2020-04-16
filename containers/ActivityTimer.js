import React from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
import { useSelector } from 'react-redux'
import Timer from '../components/Timer'

export default function ActivityTimer () {
    return (
        <View style={styles.activityTimerContainer}>
            <Timer />
        </View>
    );
}

const styles = StyleSheet.create({
    activityTimerContainer: {
        flex: 5,
        marginRight: 15,
    }
});