import {useReducer, useCallback} from 'react'

import timeRecordReducer, {initialStateRecordActivity} from '../reducer'
import {startRecord, stopRecord} from '../action/actionCreators' 
import {db} from '../config/firebase'

const recordInDBReducer = () => {

}
//
const useRecordActivity = (startTime) => {
    //const [state, dispatch] = useReducer(recordInDBReducer, initialStateRecordActivity)

    const makeRequest = async () => {
         await db.collection("record-activities").add({
            //id: docRef.id,
            // activityID: itemId,
            // activityName: otherParam,
            startDate: startTime,
            // hours: state.hours,
            // minutes: state.minutes,
            // endDate: new Date(),
            // created: new Date()
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
    makeRequest();
    return [startTime]
}

export default useRecordActivity;