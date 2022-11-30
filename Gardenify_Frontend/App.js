import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {
  scrollViewStyle,
  contentContainerStyle,
  textStyle,
} from './globalStyles';

const App = () => {
  return (
    <ScrollView
      style={scrollViewStyle}
      contentContainerStyle={contentContainerStyle}>
      <View>
        <Text style={textStyle}>App</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default App;
