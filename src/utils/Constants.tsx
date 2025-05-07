import {Dimensions} from 'react-native';

export const screenHeight = Dimensions.get('screen').height;
export const screenWidth = Dimensions.get('screen').width;

export enum FONTS {
  RobotoBlack = 'Roboto-Black',
  RobotoBlackItalic = 'Roboto-BlackItalic',
  RobotoBold = 'Roboto-Bold',
  RobotoBoldItalic = 'Roboto-BoldItalic',
  RobotoItalic = 'Roboto-BoldItalic',
  RobotoLight = 'Roboto-Light',
  RobotoLightItalic = 'Roboto-LightItalic',
  RobotoMedium = 'Roboto-Medium',
  RobotoMediumItalic = 'Roboto-MediumItalic',
  RobotoRegular = 'Roboto-Regular',
  RobotoThin = 'Roboto-Thin',
  RobotoThinItalic = 'Roboto-ThinItalic',
}

export enum Colors {
  primary = '#FFC201',
  active = '#1054E8',
  inactive = '#666',
  lightText = '#222',
  background = '#fff',
  text = '#222',
  bgcolor = '#FAF1E6',
  green = '#00B300',
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('en-US', {month: 'short'});
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
};
