import React from 'react';
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';

interface ButtonWrapperProps {
  title: string;
  loading: boolean;
  disabled?: boolean;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  indicatorColor?: string;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  title,
  loading,
  disabled = false,
  onPress,
  style,
  textStyle,
  indicatorColor = 'white',
}) => {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={{ color: 'gray', borderless: true }}>
        {!loading ? (
          <Text style={textStyle}>{title}</Text>
        ) : (
          <View>
            <ActivityIndicator size="large" color={indicatorColor} />
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default ButtonWrapper;
