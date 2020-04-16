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

// function TimerCountDown () {
//     const signup = () => {
//         console.log('inside callback')
//       }
//     const {value} = useTimerInputData(signup);
//     console.log('TimerCountDown')
//     console.log({value})
//     return (
//         <View style={styles.timerCountDownContainer}>
//             <Text style={styles.timerTitle}>{value}</Text>
//         </View>
//     )
// }

const useTimerInputData = (callback) => {
    const [value, onChangeText] = useState();

    const handleOnChangeText = (text) => {
        onChangeText(text);
           if(value){
               console.log('calling callback');
               console.log(callback);
                callback();
            }
        }
        return {
            handleOnChangeText,
            value
        };
    }

function TimerInput({changeTimerInput, input}) {
    //const {value, handleOnChangeText} = useTimerInputData(callback);
    //const [value, onChangeText] = useState();
    let value = 0;

    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [secondsRemaining, setSecondsRemaining] = useState(0);
    let intervalHandle = null   
    let manualSecondsRemaining = 0; 

    const startCountDown = () => {
        console.log('startCountDown')
        let time = value;
        console.log(time)
        let calcSecondsRemanining = time * 60
        setSecondsRemaining(calcSecondsRemanining);
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
        let prevSecondsRemaining = secondsRemaining;

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
        <View>
            <View style={styles.timerInputContainer}>
            <Text style={styles.timerTitle}>Input time</Text>
            <TextInput
                style={{ height: 20, borderColor: 'gray', borderWidth: 1, color: "#fff" }}
                onChangeText={text => changeTimerInput(text)}
                keyboardType="number-pad"
                value={value}
            />
            </View>
            <View style={styles.timerCountDownContainer}>
                    {/* <Text style={styles.timerTitle}>Min : {min} : Sec {sec}</Text> */}
                    <Text style={styles.timerTitle}>Min : {input}</Text>
            </View>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={startCountDown}
                    >
                 <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
            </View>

        </View>
        );
        
}

export default function Timer () {
    const [value, setTimerValue] = useState(0);

    function onChangeInput(text) {
        console.log('inside onChangetext')
        console.log(text)
        setTimerValue(text)
    }
    //const{value, handleOnChangeText} = useTimerInputData(myCallback);
    console.log('timer')
    console.log(value)

    return(
        <View style={styles.timerContainer}> 
            <TimerInput changeTimerInput={onChangeInput} input={value}/>
            {/* <TimerCountDown counter={value}/> */}
        </View>
    )

}

const styles = StyleSheet.create({
    timerContainer: {
        marginLeft: 100
    },
    timerInputContainer: {
       // flex: 1
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
    // button: {
    //     backgroundColor: "blue",
    //     padding: 20,
    //     borderRadius: 5,
    //   },
    // buttonText: {
    //     fontSize: 20,
    //     color: '#fff',
    //     textAlign: "center",
    //   }, 
});