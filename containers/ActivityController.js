import React, {useState} from 'react'
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
  } from 'react-native';
import { useSelector } from 'react-redux'
import TimerInput from '../components/TimerInput'
import ActivityButton from '../components/ActivityButton';

export default function ActivityTimer () {
    const [value, setTimerValue] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [visi, setVisi] = useState(0);
    const [secRemaining, setSecRemaining] = useState(0);
    let intervalHandle = null   
    let manualSecondsRemaining = 0; 

    function onChangeInput(text) {
        console.log('inside onChangetext')
        console.log(text)
        setTimerValue(text)
    }

    // const startTimer = () => {
    //     console.log('timer started')
    // }

    const startTimer = () => {
        console.log('startCountDown')
        let time = value;
        console.log('time')
        console.log(time)
        let calcSecondsRemanining = time * 60
        console.log('tcalcSecondsRemaniningme')
        console.log(calcSecondsRemanining);
        () => setSecRemaining(60);
        manualSecondsRemaining = time*60;
        console.log('setSecRemaining')
        console.log(secRemaining)
        setVisi(40)
        intervalHandle = setInterval(tick, 1000);
        // this.setState({
        //   isClicked : true
        // })
      }

    const tick = () => {
        console.log('tick')
        setVisi('40')
        console.log(visi)
        setSecRemaining(60);
        console.log(secRemaining)
        let min = Math.floor(secRemaining / 60);
        let sec = secRemaining - (min * 60);


        console.log(min)
        console.log(sec)
        console.log(secRemaining)
    
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
          setTimerValue('')
        }
        let prevSecRemaining = secRemaining;
        console.log(prevSecRemaining);
        setSecRemaining(prevSecRemaining--)
        //manualSecondsRemaining--;
    }

    return (
        <View>
            <View >
                <TimerInput changeTimerInput={onChangeInput} input={value} min={min} sec= {sec}/>
            </View>
            <View style={styles.activityControllerButtonsContainer}>
                <ActivityButton  buttonText='Start Break' startTimer={startTimer}/>
                {/* add a spacer */}
                <View style={{ backgroundColor: 'grey', width:20, height: 20, margin: 10}}>
                    <Text></Text>
                </View>
                <ActivityButton  buttonText='Start Activity' startTimer={startTimer} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    activityControllerButtonsContainer: {
        flexDirection: 'row',
        marginRight: 10,
        alignItems: "center"
    }
});