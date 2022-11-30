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
  fontBold,
  fontMedium,
  fontSemiBold,
  white,
  scrollViewStyle,
  contentContainerStyle,
} from '../globalStyles.js';

const loginUser = async (name, email) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: name,
      mail: email,
    }),
  };
  const response = await fetch(
    'https://gardenify.herokuapp.com/signin',
    requestOptions,
  );
  const data = await response.json();
  if (data.success === true) {
    console.log(data.data);
    return true;
  }
};

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
              width: '95%',
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
              width: '95%',
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

          <Buttons
            btn_text={'Login'}
            on_press={() => {
              const success = loginUser(email, password);
              if (success) {
                navigation.navigate('Home');
                console.log('Clicked Login');
              }
            }}
          />
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
