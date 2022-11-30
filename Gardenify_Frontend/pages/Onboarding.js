import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button,
} from 'react-native';
import Buttons from '../components/Buttons.js';
import {fontBold, white} from '../globalStyles.js';

const Onboarding = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View
        style={{
          flex: 3,
          flexDirection: 'column',
          backgroundColor: white,
        }}></View>

      <View style={{flex: 2, backgroundColor: '#fff'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Image
            source={require('../assets/images/finalLogo.svg')}
            style={{flex: 1, width: '50%'}}
          />
          <Text
            style={{
              ...fontBold,
              color: '#000000',
              fontSize: 30,
            }}>
            Gardenify
          </Text>
          <Text
            style={{
              maxWidth: '50%',
              ...fontBold,
              color: '#999',
              fontSize: 14,
              textAlign: 'center',
              paddingTop: 10,
            }}></Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <Buttons
            btn_text={'Getting Started'}
            on_press={() => {
              navigation.replace('Login');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
