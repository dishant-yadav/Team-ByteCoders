import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './../navigation/screens/Home';
import Details from './../navigation/screens/Details';
import PlantInfo from './../navigation/screens/PlantInfo';
import Activities from './../navigation/screens/Activities';

//Screen names
const homeName = 'Home';
const detailsName = 'Details';
const infoName = 'Info';
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
        name={detailsName}
        component={Details}
        options={{
          headerShown: false,
          tabBarIcon: data => {
            return <Ionicons name="add" size={30} color="black" />;
          },
        }}
      />
      <Tab.Screen
        name={infoName}
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
