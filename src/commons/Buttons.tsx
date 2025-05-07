import React from 'react';
import {
  Pressable,
  StyleSheet,
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../utils/Constants';
import ButtonWrapper from './ButtonWrapper'; // Assuming you have this component already

// Replace these with actual types/values from your project
const R = {
  colors: {
    primary: '#3b82f6',
    LIGHTBLUE: '#60a5fa',
  },
  fonts: {
    Medium: 'System',
  },
};

interface ButtonProps {
  title?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  layout?: 'simple' | 'icon';
  backgroundColor?: string;
  iconColor?: string;
  icon?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  title = '',
  loading = false,
  disabled = false,
  onPress,
  layout = 'simple',
  backgroundColor = Colors.green,
  iconColor = '#FFF',
  icon = 'add', // fallback icon name
  buttonStyle = {},
  textStyle = {},
  textColor = '#FFF',
}) => {
  return layout === 'simple' ? (
    <ButtonWrapper
      title={title}
      loading={loading}
      disabled={disabled}
      style={[
        styles.btnStyle,
        disabled ? styles.disabledStyle : { backgroundColor: backgroundColor },
        buttonStyle,
      ]}
      textStyle={[styles.textStyle, { color: textColor }, textStyle]}
      onPress={onPress}
      indicatorColor="white"
    />
  ) : (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: R.colors.primary, borderless: true }}
      style={[
        styles.circleBtn,
        { backgroundColor: backgroundColor },
        buttonStyle,
      ]}>
      <Icon name={icon} size={20} color={iconColor} />
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnStyle: {
    borderRadius: 30,
    paddingVertical: 12,
    justifyContent: 'center',
    width: 140,
    height: 45,
    elevation: 25,
    overflow: 'hidden',
    shadowColor: '#171717',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1,
    backgroundColor: R.colors.LIGHTBLUE,
  },
  activeStyle: { backgroundColor: R.colors.LIGHTBLUE },
  disabledStyle: { backgroundColor: 'grey' },
  textStyle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    margin: 3,
    fontFamily: R.fonts.Medium,
  },
  circleBtn: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});
