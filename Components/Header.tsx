import * as React from 'react';
import { Image, View } from 'react-native';
import logoKAE from '../assets/UpscaleLogo.jpg';
import { headerStyle } from '../Style/HeaderStyle';

export function LogoTitle() {
  return (
    <View style={{ height: 70, padding: 5 }}>
      <Image
        style={headerStyle.HeaderLogo}
        source={logoKAE}
        resizeMode="contain"
      />
    </View>
  );
}
