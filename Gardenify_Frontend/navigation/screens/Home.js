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
} from 'react-native';
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

const getNearbyPlants = async () => {
  // const [lat, lon] = await getLocation();
  const [lat, lon] = [20.2775, 85.7774];
  const url = `http://192.168.124.186:4000/plants/latitude=${lat}&longitude=${lon}`;
  const res = await fetch(url);
  const resJSON = await res.json();
  console.log(resJSON);
  return resJSON;
};

const Item = ({name, lat, lon, status}, index) => (
  <TouchableOpacity style={styles.item} onPress={() => getPlantById(index)}>
    <View style={{justifyContent:"flex-start"}}>
      <Text style={styles.textStyle1}>Name : {name}</Text>
      <Text style={styles.textStyle1}>Status : {status}</Text>
      <Text style={styles.textStyle1}>Latitude : {lat}</Text>
      <Text style={styles.textStyle1}>Longitude : {lon}</Text>
    </View>
  </TouchableOpacity>
);

const Home = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return async () => {
      const value = await getNearbyPlants();
      setData(value);
      setLoading(false);
    };
  }, []);

  const getPlantById = index => {
    console.log(data[index]);
  };

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
        <Text style={textStyle}>Nearby Plants</Text>
      </View>
      {loading ? (
        <ActivityIndicator size={100} color={color1} style={{marginTop: 80}} />
      ) : (
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => 'key' + index}
        />
      )}
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
