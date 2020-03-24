import React, { useState, useEffect, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  View,
  FlatList
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';

import { useData } from './hooks/useData'
import RecordActivityScreen from './features/record_activity/RecordActivityScreen'

import Constants from 'expo-constants';
import {db} from './config/firebase'
import * as Localization from 'expo-localization';


//ItemSeparatorComponent
FlatListItemSeparator = () => <View style={styles.line} />;

//const
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headetMode: 'screen',
          // headerLeft: () => (
          //   <Button
          //     onPress={() => alert('This is a button!')}
          //     title="Info"
          //     color="#fff"
          //   />
          // ),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 10
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Activities List' }}
          />
        <Stack.Screen
          name="RecordActivity"
          component={RecordActivityScreen}
          options={{ title: 'Record Activity' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function HomeScreen({ navigation }) {
  const [state] = useData([]);
  const [selected, setSelected] = React.useState(new Map());

  const onSelect = React.useCallback(
    id => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));

      setSelected(newSelected);
    },
    [selected],
  );
  console.log('app')
  console.log({ state });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={state.data}
        ItemSeparatorComponent={FlatListItemSeparator}
        renderItem={({ item }) => (
          <Activity
            id={item.id}
            title={item.title}
            selected={!!selected.get(item.id)}
            onSelect={onSelect}
            navigation={navigation}
          />
        )}
        keyExtractor={item => item.id}
        extraData={selected}
      />
    </SafeAreaView>
  )
}

function Activity({ id, title, selected, onSelect, navigation }) {
  return (
    <TouchableOpacity
      //onPress={() => onSelect(id)}
      onPress={() => navigation.navigate('RecordActivity', {
        itemId: id,
        otherParam: title,
      })}
      style={[
        styles.activity,
        { backgroundColor: selected ? '#FA7B5F' : '#192338' },
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // marginTop: Constants.statusBarHeight,
    backgroundColor: "#192338",
    paddingVertical: 50,
    flexDirection: 'row-reverse'
    //position: "relative"
  },
  activity: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "grey",
  },
  line: {
    height: 0.5,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.5)"
  },
  title: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10
  },
});
