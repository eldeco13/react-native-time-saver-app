import useRecordActivity from '../hooks/useRecordActivity'

export const initialStateRecordActivity = {
    activityState: null,
    stopTime: null,
    stopTimeFormatted: null,
    minutes: null,
    hours: null,
    timeElapsed: null,
}

const STOPPED = "Stopped"
const STARTED = "Started"

const timeRecordReducer = (state, action) => {
  switch (action.type){
    case 'START':
      return {
        ...state,
        activityState: STARTED,
        startTime: new Date(),
        stopTime: null,
        stopTimeFormatted: null,
        startTimeFormatted: new Date().toLocaleTimeString(),
      }
    case 'STOP':
      let msDiff = Math.abs((new Date() - state.startTime) / 1000)
      let fhours = Math.floor(msDiff / 3600) % 24;
      let fminutes = Math.floor(msDiff / 60) % 60;
      const [startTime] = useRecordActivity(state.startTime)
      console.log('makeRequest - reducer')
        console.log(startTime)
        return {
         ...state,
         activityState: STOPPED,
         stopTime: new Date(),
         stopTimeFormatted: new Date().toLocaleTimeString(),
         minutes: fminutes,
         hours: fhours,
         timeElapsed: `hours : ${fhours}, minutes : ${fminutes}`,
        }
      default:
        throw new Error();
  }
}

export default timeRecordReducer;