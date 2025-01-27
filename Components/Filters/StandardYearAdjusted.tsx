import React from 'react';
import { View } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface StandardYearAdjustedProps {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

export default function StandardYearAdjusted({
  isChecked,
  setIsChecked,
}: StandardYearAdjustedProps) {
  return (
    <View>
      <Checkbox.Item
        label="Normalårskorrigerat"
        status={isChecked ? 'checked' : 'unchecked'}
        onPress={() => setIsChecked(!isChecked)}
        color="#0060df"
      />
    </View>
  );
}
