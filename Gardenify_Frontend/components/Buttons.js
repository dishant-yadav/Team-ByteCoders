import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {color1, color2, color3, fontBlack, fontBold} from '../globalStyles';

const Buttons = ({on_press, btn_text}) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        width: '90%',
        backgroundColor: color1,
        height: 50,
        marginVertical: 30,
        borderRadius: 10,
      }}
      onPress={on_press}>
      <Text
        style={{
          fontSize: 22,
          letterSpacing: 1.5,
          textAlign: 'center',
          position: 'relative',
          ...fontBold,
          color: '#FFFFFF',
        }}>
        {btn_text}
      </Text>
    </TouchableOpacity>
  );
};

export default Buttons;

const styles = StyleSheet.create({});
