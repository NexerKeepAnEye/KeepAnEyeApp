import * as Font from 'expo-font';

import Inter_Italic_VariableFont_opsz_wght from '../Fonts/Inter-Italic-VariableFont_opsz,wght.ttf';
import Inter_VariableFont_opsz_wght from '../Fonts/Inter-VariableFont_opsz,wght.ttf';
import Inter_18pt_Black from '../Fonts/Inter_18pt-Black.ttf';
import Inter_18pt_BlackItalic from '../Fonts/Inter_18pt-BlackItalic.ttf';
import Inter_18pt_Bold from '../Fonts/Inter_18pt-Bold.ttf';
import Inter_18pt_BoldItalic from '../Fonts/Inter_18pt-BoldItalic.ttf';
import Inter_18pt_ExtraBold from '../Fonts/Inter_18pt-ExtraBold.ttf';
import Inter_18pt_ExtraBoldItalic from '../Fonts/Inter_18pt-ExtraBoldItalic.ttf';
import Inter_18pt_ExtraLight from '../Fonts/Inter_18pt-ExtraLight.ttf';
import Inter_18pt_ExtraLightItalic from '../Fonts/Inter_18pt-ExtraLightItalic.ttf';
import Inter_18pt_Italic from '../Fonts/Inter_18pt-Italic.ttf';
import Inter_18pt_Light from '../Fonts/Inter_18pt-Light.ttf';
import Inter_18pt_LightItalic from '../Fonts/Inter_18pt-LightItalic.ttf';
import Inter_18pt_Medium from '../Fonts/Inter_18pt-Medium.ttf';
import Inter_18pt_MediumItalic from '../Fonts/Inter_18pt-MediumItalic.ttf';
import Inter_18pt_Regular from '../Fonts/Inter_18pt-Regular.ttf';
import Inter_18pt_SemiBold from '../Fonts/Inter_18pt-SemiBold.ttf';
import Inter_18pt_SemiBoldItalic from '../Fonts/Inter_18pt-SemiBoldItalic.ttf';
import Inter_18pt_Thin from '../Fonts/Inter_18pt-Thin.ttf';
import Inter_18pt_ThinItalic from '../Fonts/Inter_18pt-ThinItalic.ttf';
import Merriweather_Black from '../Fonts/Merriweather-Black.ttf';
import Merriweather_BlackItalic from '../Fonts/Merriweather-BlackItalic.ttf';
import Merriweather_Bold from '../Fonts/Merriweather-Bold.ttf';
import Merriweather_BoldItalic from '../Fonts/Merriweather-BoldItalic.ttf';
import Merriweather_Italic from '../Fonts/Merriweather-Italic.ttf';
import Merriweather_Light from '../Fonts/Merriweather-Light.ttf';
import Merriweather_LightItalic from '../Fonts/Merriweather-LightItalic.ttf';
import Merriweather_Regular from '../Fonts/Merriweather-Regular.ttf';

const useFonts = async () => {
  await Font.loadAsync({
    inter_Black: Inter_18pt_Black,
    inter_BlackItalic: Inter_18pt_BlackItalic,
    inter_Bold: Inter_18pt_Bold,
    inter_BoldItalic: Inter_18pt_BoldItalic,
    inter_ExtraBold: Inter_18pt_ExtraBold,
    inter_ExtraBoldItalic: Inter_18pt_ExtraBoldItalic,
    inter_ExtraLight: Inter_18pt_ExtraLight,
    inter_ExtraLightItalic: Inter_18pt_ExtraLightItalic,
    inter_Italic: Inter_18pt_Italic,
    inter_Light: Inter_18pt_Light,
    inter_LightItalic: Inter_18pt_LightItalic,
    inter_Medium: Inter_18pt_Medium,
    inter_MediumItalic: Inter_18pt_MediumItalic,
    inter_Regular: Inter_18pt_Regular,
    inter_SemiBold: Inter_18pt_SemiBold,
    inter_SemiBoldItalic: Inter_18pt_SemiBoldItalic,
    inter_Thin: Inter_18pt_Thin,
    inter_ThinItalic: Inter_18pt_ThinItalic,
    inter_Italic_Variable: Inter_Italic_VariableFont_opsz_wght,
    inter_Variable: Inter_VariableFont_opsz_wght,
    merriweather_Black: Merriweather_Black,
    merriweather_BlackItalic: Merriweather_BlackItalic,
    merriweather_Bold: Merriweather_Bold,
    merriweather_BoldItalic: Merriweather_BoldItalic,
    merriweather_Italic: Merriweather_Italic,
    merriweather_Light: Merriweather_Light,
    merriweather_LightItalic: Merriweather_LightItalic,
    merriweather_Regular: Merriweather_Regular,
  });
};

export default useFonts;
