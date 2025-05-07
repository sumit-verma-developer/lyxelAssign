import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors, screenHeight, screenWidth} from '../utils/Constants';
import {resetAndNavigate} from '../navigation/NavigationUtils';

const Splash: FC = () => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      resetAndNavigate('Login');
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.bgcolor,
  },
  image: {
    width: screenWidth*.6,
    height: screenHeight*.6,
    resizeMode: 'contain',
  },
});

export default Splash;
