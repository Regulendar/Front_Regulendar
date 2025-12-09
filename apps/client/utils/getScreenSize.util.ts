import { Dimensions } from 'react-native';

type IGetScreenSize = () => { windowWidth: number; windowHeight: number; screenWidth: number; screenHeight: number };

export const getScreenSize: IGetScreenSize = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;
  return { windowWidth, windowHeight, screenWidth, screenHeight };
};
