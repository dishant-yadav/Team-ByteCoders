import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import scrollViewStyle, {
  black,
  color2,
  fontBlack,
  white,
} from './../globalStyles';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('MainContainer');
  }, 500);
  return (
    <ScrollView style={scrollViewStyle}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={color2}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/icon.png')}
          style={{width: 50, height: 50}}
        />
        <Text
          style={{
            ...fontBlack,
            fontSize: 48,
            color: black,
            marginTop: 400,
          }}>
          Gardenify
        </Text>
      </View>
    </ScrollView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
