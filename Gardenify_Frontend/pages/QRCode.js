import React, {Component} from 'react';

import {StyleSheet, Text, TouchableOpacity, Linking} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';

const getPlantByID = async id => {
  const res = await fetch(`https://gardenify.herokuapp.com/plants/${id}`);
  const resJSON = await res.json();
  console.log(resJSON);
  return resJSON;
};

export default class QRCode extends Component {
  async onSuccess(e) {
    // const url = `https://gardenify.herokuapp.com/plants/${e.data}`;
    console.log(true);
    Linking.openURL('https://www.google.com');
    // const data = await getPlantByID(e.data);
  }

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess.bind(this)}
        showMarker={true}
        topContent={
          <Text style={styles.centerText}>
            Scan the
            <Text style={styles.textBold}> QR Code</Text> placed near the plant
            and assess the Plant's Health
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>Flashlight On</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
    marginTop: 60,
  },
});
