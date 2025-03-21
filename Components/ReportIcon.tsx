import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ReportIcon({ reportType }: { reportType: string }) {
  const isReportType = (reportType: string, types: string[]) =>
    types.includes(reportType);

  const iconSelector = (reportType: string) => {
    if (
      isReportType(reportType, ['Jämför år', 'Månadsrapport', 'Årsrapport'])
    ) {
      return 'bar-chart';
    } else if (isReportType(reportType, ['Analysrapport'])) {
      return 'show-chart';
    }
    return 'help-outline';
  };

  return (
    <View>
      <Icon
        name={iconSelector(reportType)}
        style={{ fontSize: 30, color: '#234' }}
      />
    </View>
  );
}
