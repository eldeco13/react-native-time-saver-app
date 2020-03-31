import React, {
    Fragment,
    useState,
    useEffect,
    useReducer,
    View,
    Text
  } from 'react';

  import {db} from '../config/firebase'

  const API_DATA = [];
  const loading = [{
      id: "1",
      title: "loading....."
    }]

    const dataFetchReducer = (state, action) => {
      switch (action.type) {
        // case 'FETCH_INIT':
        //   return { ...state };
        case 'FETCH_SUCCESS':
          return { 
          ...state,
          data: action.payload,
          }
        default:
          throw new Error();
      }
    };

  export const useData = (initialData) => {
    const collection = db.collection("time-saver");
    //const [data, setData] = useState(initialData);
    const [state, dispatch] = useReducer(dataFetchReducer, {
      data: initialData,
    });
    console.log("initialData -> : " + initialData);


    useEffect(() => {
        //this executes after the first return, bacause of it's async nature
        const fetchData = async () => {
            //dispatch({ type: 'FETCH_INIT' });
            console.log('start')
            await collection.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data()); 
                            //this line above blocks the lines below from executing
                                      API_DATA.push(
                                        {
                                            id: doc.id,
                                            title: doc.data().title,
                                        }
                                      )
                            dispatch({ type: 'FETCH_SUCCESS', payload: API_DATA });

                        });
                    
                 });
                //  console.log("set data -> ")
                //  console.log(API_DATA);
                //  setData(API_DATA);
        };
        console.log('before fetchdata')
        fetchData();
      }, []);
      //return [data];
      //the lines below execute befor the call to the async method - which return the initial_data
      //initial data gets printed temporarily on teh screen

      console.log('before return')
      console.log(state)


      return [ state.data.length <= 0 ?
        loading : state ]
      //return [state]
  }