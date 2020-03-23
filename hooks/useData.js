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

  export const useData = (initialData) => {
    const collection = db.collection("time-saver");
    const [data, setData] = useState(initialData);
    console.log("initialData -> : " + initialData);


    useEffect(() => {
        //this executes after the first return, bacause of it's async nature
        const fetchData = async () => {
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
                        });
                    
                 });
                 console.log("set data -> ")
                 console.log(API_DATA);
                 setData(API_DATA);
        };
        console.log('before fetchdata')
        fetchData();
      }, []);
      //return [data];
      //the lines below execute befor the call to the async method - which return the initial_data
      //initial data gets printed temporarily on teh screen

      console.log('before return')
      console.log(data)


      return [ data.length <= 0 ?
        loading : data ]
  }