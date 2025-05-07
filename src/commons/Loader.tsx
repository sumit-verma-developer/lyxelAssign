import React, { FC } from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';

interface LoaderProps {
  loading: boolean;
  message?: string;
}

/**
 * Loader Component
 * @author
 */
const Loader: FC<LoaderProps> = ({ loading }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={loading}>
      <View style={styles.modalContainer}>
        <ActivityIndicator size="large" color="#0000FF" />
        
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  messageText: {
    fontSize: 20,
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
  },
});
