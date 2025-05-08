import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import API from '../services/api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Colors, FONTS, screenHeight, screenWidth} from '../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from '../commons/Loader';
import {isValidPhoneNumber} from '../commons/isValidPhoneNumber';
import {LoginScreenNavigationProp, RootStackParamList} from '../types';
import {Screen} from 'react-native-screens';
import ScreenWrapper from '../commons/ScreenWrapper';

const LoginScreen: FC = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{mobile?: string}>({});
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const validate = () => {
    let err: {mobile?: string} = {};
    var valid = true;

    if (!isValidPhoneNumber(mobile)) {
      err.mobile = 'Enter a Valid Phone Number';
      valid = false;
    }
    setError(err);
    return valid;
  };

  const handleLogin = async () => {
    const valid = validate();
    if (!valid) {
      return;
    }
    try {
      setLoading(true);
      let result = await API.post('login', {mobile});
      console.log('result', result);
      if (
        result?.data?.status_code == 200 &&
        result?.data?.message.includes('Your OTP Sent Successfully')
      ) {
        navigation.navigate('OTP', {mobile});
      }
      if (
        result?.data?.status_code == 203 &&
        result?.data?.error.includes('You’re not an islander, be One Now!')
      ) {
        Alert.alert(result?.data?.error);
      }
    } catch (error) {
      Alert.alert('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper header={false}>
      <View style={styles.container}>
        <>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/images/logo.png')}
              style={styles.image}
            />
            <Text style={styles.title}>WELCOME TO REACT-NATIVE WORLD</Text>
          </View>

          <View>
            <Text style={styles.label}>SIGN IN</Text>
            <Text style={styles.subLabel}>
              Hi! Welcome back, you’ve been missed
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="phone-outline"
                size={22}
                color={Colors.placeholderColor}
                style={styles.iconStyle}
              />
              <TextInput
                placeholder="Enter your mobile number..."
                keyboardType="number-pad"
                value={mobile}
                onChangeText={setMobile}
                style={styles.inputWithIcon}
                placeholderTextColor={Colors.placeholderColor}
                maxLength={10}
              />
            </View>
            {error?.mobile && <Text style={styles.err}>{error?.mobile}</Text>}
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.buttonText}>PROCEED</Text>
          </TouchableOpacity>
        </>
        <Loader loading={loading} />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAF1E6',
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: '600',
    color: '#474747',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingLeft: 50,
  },
  label: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.reddishbrown,
    fontFamily: FONTS.RobotoBlack,
  },

  subLabel: {
    fontSize: RFValue(12),
    marginBottom: 20,
    color: Colors.placeholderColor,
    fontFamily: FONTS.RobotoRegular,
  },
  button: {
    backgroundColor: '#F7931E',
    padding: 15,
    borderRadius: 25,
    marginTop: '10%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#0D1318',
    fontWeight: 'bold',
  },
  image: {
    width: '70%',
    height: '45%',
    resizeMode: 'contain',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E6D6BC',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 8,
    backgroundColor: Colors.bgcolor,
  },

  iconStyle: {
    marginRight: 10,
  },

  inputWithIcon: {
    flex: 1,
    paddingVertical: 14,
    fontSize: RFValue(12),
    color: '#000',
    backgroundColor: Colors.bgcolor,
  },
  err: {
    fontSize: RFValue(10),
    color: 'red',
    marginLeft: 15,
  },
});

export default LoginScreen;
