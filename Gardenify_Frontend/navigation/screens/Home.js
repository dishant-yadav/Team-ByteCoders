import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Linking,
  Button,
} from 'react-native';
import Buttons from '../../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Card} from 'react-native-paper';
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
} from '../../globalStyles';
import {PlantDetail} from '../../pages';

const getID = async () => {
  try {
    const data = await AsyncStorage.getItem('ownerID');
    const id = JSON.parse(data);
    console.log(id);
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const getLocation = async () => {
  try {
    const data = await AsyncStorage.getItem('location');
    const location = JSON.parse(data);
    console.log(location);
    return location;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const [lat, lon] = [20.2775, 85.7774];

const getNearbyPlants = async () => {
  // const [lat, lon] = await getLocation();
  const url = `https://gardenify.herokuapp.com/plants/latitude=${lat}&longitude=${lon}`;
  const res = await fetch(url);
  const resJSON = await res.json();
  // console.log(resJSON);
  return resJSON;
};

const getPlantByID = async ID => {
  const res = await fetch(`https://gardenify.herokuapp.com/plant/${ID}`);
  const resJSON = await res.JSON();
  const {latitude, longitude} = resJSON;
  const origin = '' + lat + ',' + lon;
  const destination = '' + latitude + ',' + longitude;
  const link = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  await Linking.openURL(link);
};

const Item = ({name, lat, lon, status, plantID}, index) => (
  <TouchableOpacity style={styles.item} onPress={() => getPlantByID(plantID)}>
    <View style={{justifyContent: 'flex-start'}}>
      <Text style={styles.textStyle1}>Name : {name}</Text>
      <Text style={styles.textStyle1}>Status : {status}</Text>
      <Text style={styles.textStyle1}>Latitude : {lat}</Text>
      <Text style={styles.textStyle1}>Longitude : {lon}</Text>
    </View>
  </TouchableOpacity>
);

const value = [
  {
    name: 'Rrty',
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    plantID: '21eoOMdvESqXZWIcYrSA',
    image: 'Ftt',
    geohash: 'tgsgrgmjrx',
    statusHistory: [0],
    curentStatus: 0,
    lastUpdated: {
      seconds: 1669879001,
      nanoseconds: 308000000,
    },
    isDiseased: false,
    latitude: 20.2775837,
    accountCreationDate: {
      seconds: 1669879001,
      nanoseconds: 308000000,
    },
    longitude: 85.7774602,
    statusHistoryDate: [
      {
        seconds: 1669879001,
        nanoseconds: 308000000,
      },
    ],
  },
  {
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    accountCreationDate: {
      seconds: 1669877111,
      nanoseconds: 222000000,
    },
    isDiseased: false,
    plantID: 'FENpSK4Oyjp82N0HTWOR',
    geohash: 'tgsgrgmjrx',
    latitude: 20.2775837,
    statusHistory: [0],
    image: 'Ttyyy',
    lastUpdated: {
      seconds: 1669877111,
      nanoseconds: 222000000,
    },
    statusHistoryDate: [
      {
        seconds: 1669877111,
        nanoseconds: 222000000,
      },
    ],
    curentStatus: 0,
    longitude: 85.7774602,
    name: 'Rtt',
  },
  {
    curentStatus: 0,
    lastUpdated: {
      seconds: 1669877341,
      nanoseconds: 389000000,
    },
    name: 'Tyu',
    statusHistory: [0],
    image: 'Rrty',
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    statusHistoryDate: [
      {
        seconds: 1669877341,
        nanoseconds: 389000000,
      },
    ],
    isDiseased: false,
    latitude: 20.2775837,
    accountCreationDate: {
      seconds: 1669877341,
      nanoseconds: 389000000,
    },
    longitude: 85.7774602,
    geohash: 'tgsgrgmjrx',
    plantID: 'ForbWFNreLwymjIYtpuC',
  },
  {
    curentStatus: 0,
    statusHistoryDate: [
      {
        seconds: 1669878629,
        nanoseconds: 647000000,
      },
    ],
    lastUpdated: {
      seconds: 1669878629,
      nanoseconds: 647000000,
    },
    plantID: 'JdktjRnHZenSQEQblwP5',
    name: '4t5',
    geohash: 'tgsgrgmjrx',
    image: 'Rtty',
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    isDiseased: false,
    accountCreationDate: {
      seconds: 1669878629,
      nanoseconds: 647000000,
    },
    latitude: 20.2775837,
    statusHistory: [0],
    longitude: 85.7774602,
  },
  {
    image: 'Ftt',
    curentStatus: 0,
    plantID: 'UJh9qxpSWUSIj3D28Eub',
    isDiseased: false,
    accountCreationDate: {
      seconds: 1669879041,
      nanoseconds: 921000000,
    },
    name: 'Rrt',
    statusHistory: [0],
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    geohash: 'tgsgrgmjrx',
    longitude: 85.7774602,
    statusHistoryDate: [
      {
        seconds: 1669879041,
        nanoseconds: 921000000,
      },
    ],
    lastUpdated: {
      seconds: 1669879041,
      nanoseconds: 921000000,
    },
    latitude: 20.2775837,
  },
  {
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    geohash: 'tgsgrgmjrx',
    latitude: 20.2775837,
    name: 'Tty',
    lastUpdated: {
      seconds: 1669878970,
      nanoseconds: 414000000,
    },
    plantID: 'UQsOQQEF8tZYOFr6SaYf',
    accountCreationDate: {
      seconds: 1669878970,
      nanoseconds: 414000000,
    },
    longitude: 85.7774602,
    statusHistoryDate: [
      {
        seconds: 1669878970,
        nanoseconds: 414000000,
      },
    ],
    statusHistory: [0],
    image: 'Rtty',
    isDiseased: false,
    curentStatus: 0,
  },
  {
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    statusHistory: [0],
    isDiseased: false,
    statusHistoryDate: [
      {
        seconds: 1669878815,
        nanoseconds: 226000000,
      },
    ],
    latitude: 20.2775837,
    name: 'Fty',
    plantID: 'VuQx6qxSejhr4Dr4fcLN',
    image: 'Ftyy',
    longitude: 85.7774602,
    curentStatus: 0,
    accountCreationDate: {
      seconds: 1669878815,
      nanoseconds: 226000000,
    },
    geohash: 'tgsgrgmjrx',
    lastUpdated: {
      seconds: 1669878815,
      nanoseconds: 226000000,
    },
  },
  {
    longitude: 85.7774602,
    geohash: 'tgsgrgmjrx',
    name: 'Ttt',
    statusHistory: [0],
    lastUpdated: {
      seconds: 1669878891,
      nanoseconds: 499000000,
    },
    latitude: 20.2775837,
    curentStatus: 0,
    isDiseased: false,
    plantID: 'XuVF36MEaENBrIhq8rYP',
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    image: 'Rtt',
    statusHistoryDate: [
      {
        seconds: 1669878891,
        nanoseconds: 499000000,
      },
    ],
    accountCreationDate: {
      seconds: 1669878891,
      nanoseconds: 499000000,
    },
  },
  {
    statusHistoryDate: [
      {
        seconds: 1669877335,
        nanoseconds: 236000000,
      },
    ],
    name: 'Tyu',
    latitude: 20.2775837,
    statusHistory: [0],
    isDiseased: false,
    lastUpdated: {
      seconds: 1669877335,
      nanoseconds: 236000000,
    },
    accountCreationDate: {
      seconds: 1669877335,
      nanoseconds: 236000000,
    },
    plantID: 'amQOavru87hFiqJMvtWa',
    longitude: 85.7774602,
    geohash: 'tgsgrgmjrx',
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    curentStatus: 0,
    image: 'Rrty',
  },
  {
    accountCreationDate: {
      seconds: 1669878773,
      nanoseconds: 168000000,
    },
    curentStatus: 0,
    longitude: 85.7774602,
    isDiseased: false,
    geohash: 'tgsgrgmjrx',
    latitude: 20.2775837,
    statusHistory: [0],
    name: 'Fy',
    lastUpdated: {
      seconds: 1669878773,
      nanoseconds: 168000000,
    },
    plantID: 'cvJgjW85hZPiC7NEqDex',
    image: '55y',
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    statusHistoryDate: [
      {
        seconds: 1669878773,
        nanoseconds: 168000000,
      },
    ],
  },
  {
    image: '55y',
    plantID: 'dDWAmbjyVu5N0O0ezCgj',
    geohash: 'tgsgrgmjrx',
    lastUpdated: {
      seconds: 1669878779,
      nanoseconds: 144000000,
    },
    statusHistoryDate: [
      {
        seconds: 1669878779,
        nanoseconds: 144000000,
      },
    ],
    longitude: 85.7774602,
    statusHistory: [0],
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    accountCreationDate: {
      seconds: 1669878779,
      nanoseconds: 144000000,
    },
    name: 'Fy',
    curentStatus: 0,
    isDiseased: false,
    latitude: 20.2775837,
  },
  {
    ownerID: 'lSrk5hE0i7P2uERsWbI2jyNgwf63',
    statusHistoryDate: [
      {
        seconds: 1669876922,
        nanoseconds: 431000000,
      },
    ],
    lastUpdated: {
      seconds: 1669876922,
      nanoseconds: 431000000,
    },
    name: 'Ft',
    curentStatus: 0,
    longitude: 85.7774602,
    isDiseased: false,
    latitude: 20.2775837,
    geohash: 'tgsgrgmjrx',
    plantID: 'jVSw44aGnrqXyQ2ym7jG',
    accountCreationDate: {
      seconds: 1669876922,
      nanoseconds: 431000000,
    },
    image: '45t',
    statusHistory: [0],
  },
];

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   return async () => {
  //     const value = await getNearbyPlants();
  //     setData(value);
  //     setLoading(false);
  //   };
  // }, []);

  const renderItem = ({item, index}) => {
    return (
      <Item
        name={item.name}
        lat={item.latitude}
        lon={item.longitude}
        status={item.curentStatus}
        index={index}
      />
    );
  };

  return (
    <ScrollView style={{backgroundColor: white}}>
      <StatusBar barStyle="dark-content" backgroundColor={white} />
      <View style={styles.headerStyle}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={{
            width: 50,
            height: 50,
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
        />
        <Image
          source={require('../../assets/images/gardenify.png')}
          style={{
            width: 200,
            height: 50,
            borderBottomRightRadius: 10,
            borderTopRightRadius: 10,
          }}
        />
      </View>

      <View>
        <View style={{width: '90%', marginLeft:40}}>
          <Buttons
            btn_text={'Get Nearby Plants'}
            on_press={() => setData(value)}
          />
        </View>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => 'key' + index}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    paddingLeft: 150,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    width: 250,
  },
  paragraph: {
    fontSize: 30,
    ...fontSemiBold,
    textAlign: 'center',
    padding: 20,
    paddingTop: 50,
    color: black,
  },
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

export default Home;

// contentContainerStyle = {contentContainerStyle};
