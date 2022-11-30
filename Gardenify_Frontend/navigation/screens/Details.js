import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  black,
  color1,
  color3,
  fontBlack,
  fontBold,
  textStyle,
} from '../../globalStyles';
import {ActivityIndicator} from 'react-native';

const getNearbyPlants = async () => {
  // const [lat, lon] = await getLocation();
  const [lat, lon] = [5, 5.05];
  const url = `https://gardenify.herokuapp.com/plants/latitude=${lat}&longitude=${lon}`;
  // console.log(url);
  const res = await fetch(url);
  const resJSON = await res.json();
  // console.log(resJSON);
  return resJSON;
};

const Item = ({name, lat, lon}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    <View>
      <Text style={styles.textStyle1}>Latitude : {lat}</Text>
      <Text style={styles.textStyle1}>Longitude : {lon}</Text>
    </View>
  </View>
);

const value = [
  {
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
    longitude: 5.05,
    accountCreationDate: {
      seconds: 1669744759,
      nanoseconds: 71000000,
    },
    curentStatus: 0,
    name: 'Rose',
    geohash: 's0gs6yjr1e',
    latitude: 5,
    lastUpdated: {
      seconds: 1669744759,
      nanoseconds: 71000000,
    },
    image: '4',
    isDiseased: false,
  },
  {
    latitude: 5,
    curentStatus: 0,
    longitude: 5.05,
    image: '4',
    accountCreationDate: {
      seconds: 1669734414,
      nanoseconds: 399000000,
    },
    isDiseased: false,
    name: 'Rose',
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
    lastUpdated: {
      seconds: 1669734414,
      nanoseconds: 399000000,
    },
    geohash: 's0gs6yjr1e',
  },
  {
    image: '4',
    longitude: 5.05,
    latitude: 5,
    accountCreationDate: {
      seconds: 1669734536,
      nanoseconds: 199000000,
    },
    geohash: 's0gs6yjr1e',
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
    isDiseased: false,
    curentStatus: 0,
    lastUpdated: {
      seconds: 1669734536,
      nanoseconds: 199000000,
    },
    name: 'Rose',
  },
  {
    longitude: 5.05,
    latitude: 5,
    lastUpdated: {
      seconds: 1669744695,
      nanoseconds: 535000000,
    },
    accountCreationDate: {
      seconds: 1669744695,
      nanoseconds: 535000000,
    },
    image: '4',
    isDiseased: false,
    geohash: 's0gs6yjr1e',
    name: 'Rose',
    curentStatus: 0,
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
  },
  {
    geohash: 's0gs6yjr1e',
    curentStatus: 0,
    lastUpdated: {
      seconds: 1669734371,
      nanoseconds: 318000000,
    },
    isDiseased: false,
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
    accountCreationDate: {
      seconds: 1669734371,
      nanoseconds: 318000000,
    },
    name: 'Rose',
    image: '4',
    latitude: 5,
    longitude: 5.05,
  },
  {
    isDiseased: false,
    image: '4',
    name: 'Rose',
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
    lastUpdated: {
      seconds: 1669715561,
      nanoseconds: 138000000,
    },
    curentStatus: 0,
    latitude: 5,
    longitude: 5.05,
    accountCreationDate: {
      seconds: 1669715561,
      nanoseconds: 138000000,
    },
    geohash: 's0gs6yjr1e',
  },
  {
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
    accountCreationDate: {
      seconds: 1669731181,
      nanoseconds: 207000000,
    },
    curentStatus: 0,
    latitude: 5,
    name: 'Rose',
    isDiseased: false,
    image: '4',
    longitude: 5.05,
    lastUpdated: {
      seconds: 1669731181,
      nanoseconds: 207000000,
    },
    geohash: 's0gs6yjr1e',
  },
  {
    name: 'Rose',
    isDiseased: false,
    image: '4',
    geohash: 's0gs6yjr1e',
    lastUpdated: {
      seconds: 1669731141,
      nanoseconds: 938000000,
    },
    latitude: 5,
    longitude: 5.05,
    accountCreationDate: {
      seconds: 1669731141,
      nanoseconds: 938000000,
    },
    curentStatus: 0,
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
  },
  {
    accountCreationDate: {
      seconds: 1669715503,
      nanoseconds: 358000000,
    },
    isDiseased: true,
    ownerID: 'D3nP44k6ppVX5oDqp6M32u2506I2',
    curentStatus: 5,
    longitude: 5.05,
    latitude: 5,
    name: 'Rose',
    image: '<img uri>',
    geohash: 's0gs6yjr1e',
    lastUpdated: {
      seconds: 1669716021,
      nanoseconds: 588000000,
    },
  },
];

export default function Details({navigation}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return () => {
      // const value = await getNearbyPlants();
      setData(value);
      setLoading(false);
    };
  }, []);

  const renderItem = ({item}) => {
    return <Item name={item.name} lat={item.latitude} lon={item.longitude} />;
  };

  return (
    <View style={{marginBottom: 40}}>
      <Text style={[textStyle, {marginBottom: 10}]}>Nearby Plants</Text>
      {loading ? (
        <ActivityIndicator size={100} color={color1} style={{marginTop: 80}} />
      ) : (
        <View style={{flex: 1}}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </View>
      )}
    </View>
  );
}

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
