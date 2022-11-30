import * as React from 'react';
import {View, Text} from 'react-native';

export default function PlantInfo({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text
        onPress={() => alert('This is the "Home" screen.')}
        style={{fontSize: 26, fontWeight: 'bold', color: 'black'}}>
        Plant Info Screen
      </Text>
    </View>
  );
}
