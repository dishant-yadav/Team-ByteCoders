import QRCode from 'react-native-qrcode-svg';
import {View, Text} from 'react-native';
import {color2, contentContainerStyle, textStyle} from '../globalStyles';

// Simple usage, defaults for all but the value
const QR = ({naviagtion, route}) => {
  const {id} = route.params;
  return (
    <View style={[contentContainerStyle, {backgroundColor: color2}]}>
      <Text style={[textStyle, {marginBottom: 20}]}>Here is your QR Code</Text>
      <View style={{padding: 20, borderRadius: 10, backgroundColor: white}}>
        <QRCode value={id} />
      </View>
      <Text style={[textStyle, {marginTop: 20}]}>Take a Screenshot</Text>
    </View>
  );
};

export default QR;
