import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getID = async () => {
  try {
    const data = await AsyncStorage.getItem('ownerID');
    const id = JSON.parse(data);
    console.log(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getNearbyPlants = async () => {
  const res = await fetch();
  return data;
};

const getLocation = async () => {
  try {
    const data = await AsyncStorage.getItem('location');
    const location = JSON.parse(data);
    console.log(location);
    return location;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default function Home({navigation}) {
  // useEffect(() => {
  //   return () => {
  //     getID();
  //   };
  // }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
        Home Screen
      </Text>
      <Button title='"Press' onPress={() => getLocation()} />
    </View>
  );
}
