import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './../navigation/screens/Home';
import AddPlant from './../navigation/screens/AddPlant';
import PlantInfo from './../navigation/screens/PlantInfo';
import Activities from './../navigation/screens/Activities';

//Screen names
const homeName = 'Home';
const addPlantName = 'AddPlant';
const scanCodeName = 'Scan';
const activitiesname = 'Activities';

const Tab = createBottomTabNavigator();

function MainContainer() {
  return (
    // <NavigationContainer>
    <Tab.Navigator
      initialRouteName={homeName}
      // screenOptions={({route}) => ({
      //   tabBarIcon: ({focused, color, size}) => {
      //     let iconName;
      //     let rn = route.name;

      screenOptions={{
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          paddingBottom: 10,
          fontSize: 0,
        },
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      }}>
      <Tab.Screen
        name={homeName}
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: data => {
            return <Ionicons name="home" size={30} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name={addPlantName}
        component={AddPlant}
        options={{
          headerShown: false,
          tabBarIcon: data => {
            return <Ionicons name="add" size={30} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name={scanCodeName}
        component={PlantInfo}
        options={{
          headerShown: false,
          tabBarIcon: data => {
            return <Ionicons name="list" size={30} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name={activitiesname}
        component={Activities}
        options={{
          headerShown: false,
          tabBarIcon: data => {
            return <Ionicons name="settings" size={30} color="black" />;
          },
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}

export default MainContainer;
