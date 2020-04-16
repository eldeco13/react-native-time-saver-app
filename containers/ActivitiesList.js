
import React from 'react';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {
    FlatList,
    View,
    StyleSheet
  } from 'react-native';

import Activity from '../components/Activity'
import {FlatListItemSeparator} from '../components/FlatListItemSeperator'
import ActivityRecorder from '../components/ActivityRecorder';


export default function ActivitiesList ({ navigation }) {
    const [selected, setSelected] = React.useState(new Map());
    useFirestoreConnect([
        { collection: 'timesaver'}
      ])
    const activities = useSelector(state => state.firestore.ordered.timesaver)
    console.log('todos')
    console.log(activities)
  
    const onSelect = React.useCallback(
      id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));
  
        setSelected(newSelected);
      },
      [selected],
    );

    return( 
        <FlatList
            data={activities}
            ItemSeparatorComponent={FlatListItemSeparator}
            renderItem={({ item }) => (
            <View style={styles.activityContainer}>
                <Activity
                    id={item.id}
                    // title={item.title}
                    selected={!!selected.get(item.id)}
                    onSelect={onSelect}
                    navigation={navigation}
                />
                <ActivityRecorder
                    id={item.id}
                    />
            </View>
            )}
            keyExtractor={item => item.id}
            extraData={selected}
      />
    )
}

const styles = StyleSheet.create({
    activityContainer: {
        flexDirection: "row"
    }
});