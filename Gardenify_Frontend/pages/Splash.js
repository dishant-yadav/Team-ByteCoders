import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';  
import scrollViewStyle, {color2, fontBlack, white} from './../globalStyles';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Onboarding');
  }, 3000);
  return (
    <ScrollView style={scrollViewStyle}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={color2}
      />
      <Image
        source={require('../assets/images/icon.png')}
        style={{width: 50, height: 50}}
      />
      <Text
        style={{
          ...fontBlack,
          fontSize: 30,
          color: white,
        }}>
        Gardenify
      </Text>
    </ScrollView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
