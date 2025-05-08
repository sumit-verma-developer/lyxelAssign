import React, {useEffect,ReactNode} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const ScreenWrapper = ({
  children,
  header = true,
  backEnabled = false,
  title = '',
  backDisabled = false,
  backHandleRemove = () => {},
}: {
  children: ReactNode;
  header?: boolean;
  backEnabled?: boolean;
  title?: string;
  backDisabled?: boolean;
  backHandleRemove?: () => void;
}) => {
    useEffect(() => {
        if (backDisabled) {
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true // prevents back action
          );
      
          return () => {
            backHandler.remove(); // correctly remove the listener
            backHandleRemove();   // call the user-defined cleanup if needed
          };
        }
      }, [backDisabled, backHandleRemove]);

  return (
    <SafeAreaView style={styles.screenContainer} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.select({ios: 'padding', android: undefined})}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ScreenWrapper;
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  
});
