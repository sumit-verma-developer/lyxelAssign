import React, {FC, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import API from '../services/api';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {Colors, screenHeight, screenWidth} from '../utils/Constants';

// ✅ Define RootStackParamList here
type RootStackParamList = {
  Login: undefined;
  OTP: {mobile: string};
  Products: undefined;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;

const LoginScreen: FC = () => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    try {
      setLoading(true);
      await API.post('login', {mobile});
      navigation.navigate('OTP', {mobile});
    } catch (error) {
      Alert.alert('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', flexWrap: 'wrap'}}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>WELCOME TO REACT-NATIVE WORLD</Text>
      </View>

      <View>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Enter your mobile number..."
          keyboardType="number-pad"
          value={mobile}
          onChangeText={setMobile}
          style={styles.input}
          placeholderTextColor={Colors.lightText}
        />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}>
        <Text style={styles.buttonText}>PROCEED</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FAF1E6',
  },
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  input: {borderWidth: 1, padding: 15, borderRadius: 10, marginBottom: 20,
    borderColor:''
  },
  button: {
    backgroundColor: '#F7931E',
    padding: 15,
    borderRadius: 10,
    marginTop: '10%',
  },
  buttonText: {textAlign: 'center', color: '#fff', fontWeight: 'bold'},
  image: {
    width: screenWidth * 0.6,
    height: screenHeight * 0.4,
    resizeMode: 'contain',
  },
});

export default LoginScreen;
