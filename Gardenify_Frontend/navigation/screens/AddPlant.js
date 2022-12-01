import React, {useState, useEffect} from 'react';
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
import Buttons from './../../components/Buttons';
import {
  black,
  fontBold,
  fontMedium,
  fontSemiBold,
  white,
  scrollViewStyle,
  contentContainerStyle,
} from '../../globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getCoordinates = async () => {
  try {
    const data = await AsyncStorage.getItem('location');
    const coordinates = JSON.parse(data);
    // console.log(coordinates);
    return coordinates;
  } catch (error) {
    console.log(error);
  }
};

const [lati, long] = [20.2775837, 85.7774602];

const addPlant = async (name, image, lat, lon, ID) => {
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      ownerID: ID,
      name: name,
      image: image,
      latitude: lat,
      longitude: lon,
    }),
  };

  const response = await fetch(
    'http://192.168.124.186:4000/plant/',
    requestOptions,
  );
  const data = await response.json();
  if (data.success === true) {
    console.log(data.data);
    return data.data;
  }
};

const AddPlant = ({navigation}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [lat, setLat] = useState(lati);
  const [lon, setLon] = useState(long);

  // useEffect(() => {
  //   return async () => {
  //     setCoords(await getCoordinates());
  //   };
  // }, []);

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
            Add Plant
          </Text>
        </View>

        <View style={{flexDirection: 'column', paddingTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ededed',
              width: '100%',
              borderRadius: 10,
              height: 60,
              paddingLeft: 20,
              marginTop: 30,
            }}>
            <Icon name="envelope-o" size={22} color="#818181" />
            <TextInput
              onChangeText={name => setName(name)}
              value={name}
              style={styles.inputStyle}
              placeholder="Enter Plant Name"
              placeholderTextColor="#818181"
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#ededed',
              width: '100%',
              borderRadius: 10,
              height: 60,
              paddingLeft: 20,
              marginTop: 30,
            }}>
            <Icon name="link" size={22} color="#818181" />
            <TextInput
              onChangeText={image => setImage(image)}
              value={image}
              style={styles.inputStyle}
              placeholder="Enter Plant Image Link (URI)"
              placeholderTextColor="#818181"
            />
          </View>

          <View style={{width: '110%'}}>
            <Buttons
              btn_text={'Add Plant'}
              on_press={async () => {
                console.log('Clicked Add Plant');
                const PID = await addPlant(
                  name,
                  image,
                  lat,
                  lon,
                  'lSrk5hE0i7P2uERsWbI2jyNgwf63',
                );
                navigation.navigate('QR', {id: PID});
              }}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

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

export default AddPlant;
