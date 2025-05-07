import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

export const saveToken = (token: string) => {
  storage.set('auth_token', token);
};

export const getToken = () => {
  return storage.getString('auth_token');
};



// import {MMKV} from 'react-native-mmkv';

// const storage = new MMKV();

// const reduxStore = {
//   setItem: (key: string, val: any) => {
//     storage.set(key, val);
//     return Promise.resolve(true);
//   },
//   getItem: (key: string) => {
//     const value = storage.getString(key);
//     return Promise.resolve(value);
//   },
//   removeItem: (key: string) => {
//     storage.delete(key);
//     return Promise.resolve();
//   },
// };

// export default reduxStore;
