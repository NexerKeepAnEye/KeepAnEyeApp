import * as React from 'react';
import { Image, SafeAreaView } from 'react-native';
import logoKAE from '../assets/upscalelogo2.jpg';
import { headerStyle } from '../Style/HeaderStyle';

export function LogoTitle() {
  return (
    <SafeAreaView style={headerStyle.container}>
      <Image
        style={headerStyle.HeaderLogo}
        source={logoKAE}
        resizeMode="contain"
      />
    </SafeAreaView>
  );
}
