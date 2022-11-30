import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

import Buttons from '../components/Buttons.js';
import {
  black,
  fontBold,
  fontMedium,
  fontSemiBold,
  white,
  scrollViewStyle,
  contentContainerStyle,
} from '../globalStyles.js';

const setID = async id => {
  try {
    await AsyncStorage.setItem('ownerID', JSON.stringify(id));
    console.log('Data Saved');
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (email, pass) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      mail: email,
      pass: pass,
    }),
  };
  const response = await fetch(
    'https://gardenify.herokuapp.com/signin',
    requestOptions,
  );
  const data = await response.json();
  console.log(data);
  setID(data.data);
  if (data.success === true) {
    console.log(data.data);
    return true;
  }
};

// Function to get permission for location
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Geolocation Permission',
        message: 'Can we access your location?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    // console.log('granted', granted);
    if (granted === 'granted') {
      console.log('You can use Geolocation');
      return true;
    } else {
      console.log('You cannot use Geolocation');
      return false;
    }
  } catch (err) {
    return false;
  }
};

const storeCoordinates = async coordinates => {
  try {
    await AsyncStorage.setItem('location', JSON.stringify(coordinates));
    console.log('Data Saved');
  } catch (error) {
    console.log(error);
  }
};

// const getCoordinates = async () => {
//   try {
//     const data = await AsyncStorage.getItem('location');
//     const coordinates = JSON.parse(data);
//     console.log(coordinates);
//     return coordinates;
//   } catch (error) {
//     console.log(error);
//   }
// };
let coords = [];

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState([0, 0]);
  const [id, setId] = useState('');

  // function to check permissions and get Location
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          async position => {
            () =>
              setLocation([
                position.coords.latitude,
                position.coords.longitude,
              ]);
            console.log([position.coords.latitude, position.coords.longitude]);
            await storeCoordinates([
              position.coords.latitude,
              position.coords.longitude,
            ]);
            console.log('location got');
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation([]);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
        // console.log(location);
      }
    });
  };

  return (
    <ScrollView
      style={scrollViewStyle}
      contentContainerStyle={contentContainerStyle}>
      <StatusBar barStyle="dark-content" backgroundColor={white} />
      <View
        style={{
          flex: 2,
          flexDirection: 'column',
          backgroundColor: '#fff',
          paddingTop: 40,
          paddingHorizontal: '3%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              ...fontBold,
              fontSize: 30,
              color: black,
              paddingBottom: 10,
            }}>
            Login Screen
          </Text>
        </View>

        <View style={{flexDirection: 'column', paddingTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ededed',
              width: '100%',
              borderRadius: 10,
              height: 60,
              paddingLeft: 20,
              marginTop: 30,
            }}>
            <Icon name="envelope-o" size={22} color="#818181" />
            <TextInput
              onChangeText={email => setEmail(email)}
              value={email}
              style={styles.inputStyle}
              placeholder="Enter Email"
              placeholderTextColor="#818181"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ededed',
              width: '100%',
              borderRadius: 10,
              height: 60,
              paddingLeft: 20,
              marginTop: 30,
            }}>
            <Icon name="lock" size={22} color="#818181" />
            <TextInput
              onChangeText={password => setPassword(password)}
              value={password}
              style={styles.inputStyle}
              placeholder="Enter Password"
              secureTextEntry={true}
              placeholderTextColor="#818181"
            />
          </View>

          <View style={{width: '110%'}}>
            <Buttons
              btn_text={'Login'}
              on_press={async () => {
                console.log('Clicked Login');
                const success = await loginUser(email, password);
                if (success) {
                  console.log(getLocation());
                  navigation.replace('MainContainer');
                }
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
          flexDirection: 'column',
          paddingHorizontal: '3%',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            backgroundColor: '#fff',
            marginBottom: 40,
          }}>
          <Text
            style={{
              ...fontMedium,
              fontSize: 17,
              color: '#818181',
            }}>
            Don't have a account?
          </Text>
          <Text
            style={{
              fontSize: 18,
              ...fontSemiBold,
              color: '#333',
            }}
            onPress={() => {
              loginUser(email, password);
              navigation.navigate('SignUp');
            }}>
            SignUp
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  inputStyle: {
    position: 'relative',
    height: '100%',
    width: '90%',
    ...fontBold,
    paddingLeft: 20,
    color: black,
    fontSize: 22,
  },
});
