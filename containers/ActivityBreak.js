import React, {useState} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
import { useSelector } from 'react-redux'

const breakFiveMin = () => {
    console.log('break 5 min')
}

const breakThirtyMin = () => {
    console.log('break 30 min')
}

export default function ActivityBreak () {
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    let intervalHandle = null   
    let manualSecondsRemaining = 0; 

    // console.log('text input')
    // console.log(value)

    const startCountDown = (value) => {
        console.log('startCountDown')
        let time = value;
        console.log(time)
        let calcSecondsRemanining = time * 60
        //setSecondsRemaining(calcSecondsRemanining);
        manualSecondsRemaining = time*60;
        console.log('setSecondsRemaining')
        console.log(manualSecondsRemaining)
        intervalHandle = setInterval(tick, 1000);
        // this.setState({
        //   isClicked : true
        // })
      }

    const tick = () => {
        console.log('tick')
        console.log(manualSecondsRemaining)
        let min = Math.floor(manualSecondsRemaining / 60);
        let sec = manualSecondsRemaining - (min * 60);
        //let prevSecondsRemaining = secondsRemaining;

        console.log(min)
        console.log(sec)
        console.log(manualSecondsRemaining)
    
        setMin(min);
        setSec(sec);
    
        if (sec < 10) {
            setSec("0" + sec)
        }
    
        if (min < 10) {
          setMin("0" + min)
        }
    
        if (min === 0 & sec === 0) {
          clearInterval(intervalHandle);
        }

        //setSecondsRemaining(prevSecondsRemaining--)
        manualSecondsRemaining--;
    }

    return (
        <View style={styles.activityBreakContainer}>
        <Text style={styles.breakText}>Break</Text>
        <TouchableOpacity
            style={styles.button}
            onPress={() => startCountDown(1)}
            >
         <Text style={styles.buttonText}>5min</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => startCountDown(1)}
            >
         <Text style={styles.buttonText}>30min</Text>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    activityBreakContainer: {
        flex: 2,
        marginTop: 0,
        marginLeft: 15,
    },
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
    breakText: {
        fontSize: 22,
        color: "#fff",
        textAlign: "center",
        marginBottom: 5,
      },
});