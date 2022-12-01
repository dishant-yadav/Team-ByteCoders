import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  scrollViewStyle,
  contentContainerStyle,
  white,
  textStyle,
  color2,
  fontBold,
  fontMedium,
  black,
  fontSemiBold,
  shadow2,
  color1,
  color4,
  color3,
} from './../globalStyles';

const Item = ({name, lat, lon, status, plantID}, index) => (
  <TouchableOpacity style={styles.item} onPress={() => toPlantPage(plantID)}>
    <View style={{justifyContent: 'flex-start'}}>
      <Text style={styles.textStyle1}>Name : {name}</Text>
      <Text style={styles.textStyle1}>Status : {status}</Text>
      <Text style={styles.textStyle1}>Latitude : {lat}</Text>
      <Text style={styles.textStyle1}>Longitude : {lon}</Text>
    </View>
  </TouchableOpacity>
);

const PlantDetail = ({navigation}) => {
  return (
    <View>
      <Text>PlantDetail</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: color3,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 20,
  },
  title: {
    fontSize: 32,
    color: black,
    paddingTop: 10,
    fontBold,
  },
  textStyle1: {
    fontSize: 22,
    color: black,
    fontBold,
    textAlign: 'center',
  },
});

export default PlantDetail;
