import * as React from 'react';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Text } from 'react-native-paper';
import { BarChartStyle } from '../Style/ChartStyle';
import { MeterData, Tooltip } from '../Types/Type';

interface MeterDataBarChartProps {
  filteredResults: MeterData[];
}

export default function MeterDataBarChart({
  filteredResults,
}: MeterDataBarChartProps) {
  const [tooltip, setTooltip] = useState<Tooltip>({
    originalValue: 0,
    visible: false,
    value: 0,
    x: 0,
    y: 0,
  });

  filteredResults = filteredResults.filter((item) => item.Value > 0);

  useEffect(() => {
    console.log('filteredResults in MeterDataBarChart:', filteredResults);
  }, [filteredResults]);

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'short' });
  };

  const sortedData = filteredResults.sort(
    (a, b) => new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime(),
  );

  const chartData = sortedData.map((item) => ({
    value: item.Value,
    label: formatMonth(new Date(item.DateTime)),
    frontColor: '#ea5b0c',
    gradientColor: '#ea5b0c',
    originalValue: item.Value,
  }));

  const maxValue =
    Math.ceil(Math.max(...filteredResults.map((item) => item.Value)) / 1000) *
    1000;
  const stepValue = maxValue / 3;

  const handleBarPress = (
    value: number,
    x: number,
    y: number,
    originalValue: number,
  ) => {
    setTooltip({ originalValue, visible: true, value: originalValue, x, y });
  };

  return (
    <View style={BarChartStyle.chartContainer}>
      <BarChart
        data={chartData}
        focusBarOnPress
        isAnimated
        height={250}
        barWidth={30}
        barBorderTopLeftRadius={4}
        barBorderTopRightRadius={4}
        frontColor="#6a1b9a"
        yAxisLabelTexts={Array.from({ length: 4 }, (_, i) =>
          (i * stepValue).toString(),
        )}
        stepValue={stepValue}
        maxValue={maxValue}
        onPress={(item: Tooltip, index: number, x: number, y: number) =>
          handleBarPress(item.value, x, y, item.originalValue)
        }
        renderTooltip={() => {
          return (
            <View style={BarChartStyle.tooltip}>
              <Text style={BarChartStyle.tooltipText}>{tooltip.value}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
