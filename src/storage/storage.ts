import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const saveToken = (token: string) => {
  storage.set('auth_token', token);
};

export const getToken = () => {
  return storage.getString('auth_token');
};

export const removeItem = (key: string) => {
  storage.getString(key);
  return Promise.resolve();
};
