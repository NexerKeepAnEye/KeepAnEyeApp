import * as React from 'react';
import { Image } from 'react-native';
import logoKAE from '../assets/logoKAE.png';
import { headerStyle } from '../Style/HeaderStyle';

export function LogoTitle() {
  return (
    <Image
      style={headerStyle.HeaderLogo}
      source={logoKAE}
    />
  );
}
