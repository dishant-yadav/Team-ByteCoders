import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Buttons from '../components/Buttons.js';
import {fontBold} from '../globalStyles.js';

const Onboarding = ({navigation}) => {
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={{flex: 3, flexDirection: 'column', backgroundColor: '#ddd'}}>
        <ImageBackground
          source={require('../assets/images/icon.png')}
          style={{flex: 1, width: '100%', backgroundColor: '#fff'}}
        />
      </View>

      {/* button and text */}
      <View style={{flex: 2, backgroundColor: '#fff'}}>
        {/* Text part */}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Text
            style={{
              ...fontBold,
              color: '#000000',
              fontSize: 30,
            }}>
            Gardenify
          </Text>
          <Text
            style={{
              maxWidth: '50%',
              ...fontBold,
              color: '#999',
              fontSize: 14,
              textAlign: 'center',
              paddingTop: 10,
            }}>
            All new in one place, be the first to know last new
          </Text>
        </View>

        {/* Button */}
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          {/* <TouchableOpacity style={{justifyContent:'center',width:'90%',backgroundColor:Colors.primary,height:50,marginBottom:30,borderRadius:10}} 
                    onPress={()=>navigation.navigate("Login")}
                    >
                        <Text style={{fontSize:15,letterSpacing:1.5,textAlign:'center',position:'relative',fontFamily:'OpenSans-SemiBold',color:Colors.white}} >Get Started</Text>


                    </TouchableOpacity> */}
          <Buttons
            btn_text={'Get Started'}
            on_press={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
