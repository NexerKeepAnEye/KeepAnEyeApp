declare module '*.png' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  import { ImageSourcePropType } from 'react-native';
  const value: ImageSourcePropType;
  export default value;
}

declare module '*.ttf' {
  import { FontSource } from 'expo-font';
  const value: FontSource;
  export default value;
}

declare module '@env' {
  export const EXPO_PUBLIC_API_URL: string;
}
