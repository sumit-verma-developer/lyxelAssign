import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import API from '../services/api';
import {saveToken} from '../storage/storage';

type RootStackParamList = {
  Login: undefined;
  OTP: {mobile: string};
  Products: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'OTP'>;

const OtpScreen: FC<Props> = props => {
  const {route, navigation} = props;
  const {mobile} = route.params;
  //   const {mobile} = route.params;
  const [otp, setOtp] = useState('');

  const handleVerify = async () => {
    try {
      const res = await API.post('otp-verify', {mobile, otp});
      saveToken(res.data.token);
      navigation.replace('Products');
    } catch {
      Alert.alert('OTP verification failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ALMOST READY TO POUR!</Text>
      <Text style={styles.subtitle}>Please enter the OTP sent to {mobile}</Text>
      <TextInput
        placeholder="1234"
        value={otp}
        onChangeText={setOtp}
        keyboardType="number-pad"
        style={styles.input}
        maxLength={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>VERIFY</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FAF1E6',
  },
  title: {fontSize: 22, fontWeight: 'bold'},
  subtitle: {fontSize: 14, marginVertical: 10},
  input: {borderWidth: 1, borderRadius: 10, padding: 15, marginBottom: 20},
  button: {backgroundColor: '#F7931E', padding: 15, borderRadius: 10},
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: 'bold'},
});

export default OtpScreen;
