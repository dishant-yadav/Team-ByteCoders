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

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
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
            }}>
            <Icon name="envelope-o" size={22} color="#818181" />
            <TextInput
              onChangeText={name => setName(name)}
              value={name}
              style={styles.input}
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
              style={styles.input}
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
              style={styles.input}
              placeholder="Enter Password"
              secureTextEntry={true}
              placeholderTextColor="#818181"
            />
          </View>

          <View style={{width: '95%', marginBottom: 30}}>
            <Text
              style={{
                fontSize: 17,
                ...fontSemiBold,
                color: '#818181',
                alignSelf: 'flex-end',
                paddingTop: 10,
              }}>
              Forgot Password?
            </Text>
          </View>

          <Buttons
            btn_text={'Login'}
            on_press={() => console.log('Clicked Sign Up')}
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
            onPress={() => navigation.navigate('SignUp')}>
            SignUp
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  input: {
    position: 'relative',
    height: '100%',
    width: '90%',
    ...fontBold,
    paddingLeft: 20,
    color: black,
  },
  social_btn: {
    height: 55,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  social_img: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
});
