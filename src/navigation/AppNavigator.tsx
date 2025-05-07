import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {FC} from 'react';

import Splash from '../screens/Splash';
import LoginScreen from '../screens/LoginScreen';
import OtpScreen from '../screens/OtpScreen';
import ProductScreen from '../screens/ProductScreen';
import {navigationRef} from './NavigationUtils';
import {RFValue} from 'react-native-responsive-fontsize';

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  OTP: {mobile: string};
  Products: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OtpScreen} />
        <Stack.Screen
          name="Products"
          component={ProductScreen}
          options={{
            headerShown: true,
            headerTitle: 'HOT BEVERAGE',
            headerTintColor: 'black',
            headerTitleStyle: {fontSize: RFValue(16),color: '#6C3428'},
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#FFF1E6',
            },
            headerShadowVisible: true,
            
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
