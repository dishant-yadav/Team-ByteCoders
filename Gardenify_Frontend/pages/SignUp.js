import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Buttons from '../components/Buttons.js';
import {
  black,
  color1,
  contentContainerStyle,
  fontBold,
  fontMedium,
  fontSemiBold,
  scrollViewStyle,
  white,
} from '../globalStyles.js';

const signUpUser = async (name, email, pass, lat, lon) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      mail: email,
      pass: pass,
      latitude: lat,
      longitude: lon,
    }),
  };
  const response = await fetch(
    'https://gardenify.herokuapp.com/signup/',
    requestOptions,
  );
  const data = await response.json();
  if (data.success === true) {
    console.log(data.data.id);
    return true;
  } else {
    return false;
  }
};

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [lat, setLat] = useState(10);
  const [lon, setLon] = useState(20);

  return (
    <ScrollView style={scrollViewStyle}>
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <Text
            style={{
              ...fontBold,
              fontSize: 32,
              fontWeight: 'bold',
              color: color1,
              paddingBottom: 10,
            }}>
            SignUp
          </Text>
          <Image
            source={require('./../assets/images/logo.png')}
            style={{width: 200, height: 200, borderRadius: 20}}
          />
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
            }}>
            <Icon name="user" size={22} color="#818181" />
            <TextInput
              onChangeText={name => setName(name)}
              style={styles.inputStyle}
              placeholder="Enter Name"
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
            <Icon name="envelope-o" size={22} color="#818181" />
            <TextInput
              onChangeText={email => setEmail(email)}
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
              onChangeText={pass => setPass(pass)}
              style={styles.inputStyle}
              placeholder="Enter Password"
              secureTextEntry={true}
              placeholderTextColor="#818181"
            />
          </View>
          <View style={{width: '110%'}}>
            <Buttons
              btn_text={'Sign Up'}
              on_press={() => {
                console.log('Clicked');
                const success = signUpUser(name, email, pass, lat, lon);
                if (success) {
                  navigation.replace('Login');
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
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  inputStyle: {
    position: 'relative',
    height: '100%',
    width: '90%',
    ...fontBold,
    paddingLeft: 20,
    color: black,
    fontSize: 26,
  },
});
