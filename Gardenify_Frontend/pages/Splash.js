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
  fontBold,
  white,
} from './../globalStyles';

const Splash = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, 2500);
  return (
    <ScrollView style={[scrollViewStyle, {backgroundColor: color2}]}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={color2}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 110,
        }}>
        <Image
          source={require('../assets/images/logo.png')}
          style={{width: 250, height: 250, borderRadius: 30, marginTop: 40}}
        />
        <Text style={{fontSize: 54, color: white, ...fontBold, marginTop: 65}}>
          Gardenify
        </Text>
      </View>
    </ScrollView>
  );
};

export default Splash;

const styles = StyleSheet.create({});
