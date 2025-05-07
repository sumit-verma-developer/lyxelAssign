import React, {FC, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {OtpInput} from 'react-native-otp-entry';
import API from '../services/api';
import {saveToken} from '../storage/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from '../utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Loader from '../commons/Loader';

type RootStackParamList = {
  Login: undefined;
  OTP: {mobile: string};
  Products: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const OtpScreen: FC<Props> = ({route, navigation}) => {
  const {mobile} = route.params;
  const [otp, setOtp] = useState('');
  const [errorr, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [otpResendDisabled, setOtpResendDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log('mobile', mobile);

  useEffect(() => {
    if (timer === 0) {
      setOtpResendDisabled(false); // Enable resend when timer hits 0
      return;
    }

    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const handleVerify = async () => {
    if (otp?.length < 4) {
      setError('Please enter the full 4-digit OTP');
      return;
    }

    try {
      setLoading(true);
      const verifyResult = await API.post('otp-verify', {mobile, otp});
      console.log('verifyResult', verifyResult);

      if (verifyResult?.status == 200) {
        if (verifyResult?.data?.token) {
          saveToken(verifyResult?.data?.token);
          navigation.navigate('Products');
          
        } else {
          setError('Invalid OTP. Please try again.');
        }
      } else {
        Alert.alert(
          verifyResult?.data?.error || 'An unexpected error occurred.',
        );
      }
    } catch (e) {
      console.log('OTP Error:', e);
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!otpResendDisabled) {
      setTimer(60);
      setOtpResendDisabled(true);
      try {
        await API.post('otp-send', {mobile});
        Alert.alert(
          'OTP Sent',
          'A new OTP has been sent to your mobile number.',
        );
      } catch (e) {
        Alert.alert('Error', 'Failed to send OTP. Please try again later.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <MaterialCommunityIcons
          name="arrow-left"
          size={30}
          color={Colors.placeholderColor}
        />
      </TouchableOpacity>
      <>
        <Text style={styles.title}>ALMOST READY TO</Text>
        <Text style={styles.titleBold}>POUR!</Text>

        <Text style={styles.subtitle}>
          Please enter the OTP sent to your{'\n'}mobile no. +91
          {mobile.slice(-10).replace(/(\d{2})\d{6}(\d{2})/, '$1******$2')}
        </Text>

        <OtpInput
          numberOfDigits={4}
          focusColor="#F7931E"
          onTextChange={text => {
            setOtp(text);
            setError('');
          }}
          textInputProps={{
            keyboardType: 'number-pad',
            maxLength: 4,
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.otpBox,
            pinCodeTextStyle: styles.otpText,
          }}
        />

        {errorr !== '' && <Text style={styles.errorText}>{errorr}</Text>}

        <Text style={styles.timerText}>
          Resend code in{' '}
          <Text style={styles.timerCountdown}>
            00:{timer < 10 ? `0${timer}` : timer}
          </Text>
        </Text>
        {timer == 0 && (
          <TouchableOpacity
            style={[
              {
                alignItems: 'center',
                paddingBottom: 20,
                width: 120,
                marginBottom: 30,
                justifyContent: 'center',
                alignSelf: 'center',
              },
              otpResendDisabled && {opacity: 0.5},
            ]}
            onPress={handleResendOtp}
            disabled={otpResendDisabled}>
            <Text style={[styles.buttonText, {color: '#456de6'}]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={handleVerify}>
          <Text style={styles.buttonText}>VERIFY</Text>
        </TouchableOpacity>
      </>
      <Loader loading={loading} />
    </View>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF1E6',
    paddingHorizontal: 20,
    paddingTop: '20%',
  },
  title: {
    fontSize: 22,
    color: '#6C3428',
    fontWeight: '600',
  },
  titleBold: {
    fontSize: 22,
    color: '#6C3428',
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 14,
    marginTop: 15,
    color: '#444',
    lineHeight: 20,
  },
  otpContainer: {
    marginVertical: 30,
    justifyContent: 'space-between',
  },
  otpBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  otpText: {
    fontSize: 20,
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  timerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
    marginBottom: 30,
  },
  timerCountdown: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#F7931E',
    padding: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: RFValue(12),
    color: '#0D1318',
  },
  backButton: {
    backgroundColor: Colors.bgcolor,
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#ECD0A4',
    borderWidth: 1,
    marginBottom: 30,
  },
});
