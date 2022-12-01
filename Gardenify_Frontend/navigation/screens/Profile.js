import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, Text} from 'react-native';

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

const ID = getID();

const getProfileData = async () => {
  const res = await fetch(`http://gardenify.herokuapp.com${getID()}`);
};

const Profile = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Name : {}</Text>
    </View>
  );
};

export default Profile;
