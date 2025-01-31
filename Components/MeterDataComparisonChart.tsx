import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Text } from 'react-native-paper';
import { BarChartStyle } from '../Style/ChartStyle';
import { CompareChartStyle } from '../Style/CompareChartStyle';
import { MeterData, Tooltip } from '../Types/Type';

interface MeterDataBarChartProps {
  filteredResults: MeterData[];
  resolution: string;
  year: string | undefined;
  yearTwo: string | undefined;
}

export default function MeterDataBarChart({
  filteredResults,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolution,
  year,
  yearTwo,
}: MeterDataBarChartProps) {
  const [tooltip, setTooltip] = useState<Tooltip>({
    originalValue: 0,
    visible: false,
    value: 0,
    x: 0,
    y: 0,
  });

  filteredResults = filteredResults.filter((item) => item.Value > 0);

  const formatMonth = (date: Date) => {
    return date.toLocaleString('default', { month: 'short' }).split('.')[0];
  };

  const groupDataByMonth = (data: MeterData[], year: string) => {
    const groupedData = new Map();

    data.forEach((item) => {
      const date = new Date(item.DateTime);
      const month = date.getMonth();
      const key = `${month}-${year}`;

      if (!groupedData.has(key)) {
        groupedData.set(key, { ...item, Value: 0 });
      }

      const existingItem = groupedData.get(key);
      existingItem.Value += item.Value;
    });

    return groupedData;
  };

  const groupedDataYearOne = year
    ? groupDataByMonth(filteredResults, year)
    : new Map();
  const groupedDataYearTwo = yearTwo
    ? groupDataByMonth(filteredResults, yearTwo)
    : new Map();

  const combinedData = [];
  const labels = [];
  for (let month = 0; month < 12; month++) {
    const keyYearOne = `${month}-${year}`;
    const keyYearTwo = `${month}-${yearTwo}`;

    const dataYearOne = groupedDataYearOne.get(keyYearOne) || { Value: 0 };
    const dataYearTwo = groupedDataYearTwo.get(keyYearTwo) || { Value: 0 };

    combinedData.push({
      value: dataYearOne.Value,
      spacing: 2,
      label: `${formatMonth(new Date(parseInt(year || '0'), month))}`,
      labelWidth: 55,
      frontColor: '#ea5b0c',
      gradientColor: '#ea5b0c',
      originalValue: dataYearOne.Value,
      dataPointText: dataYearOne.Value.toString(),
    });

    combinedData.push({
      value: dataYearTwo.Value,
      label: '',
      frontColor: '#AF220A',
      gradientColor: '#6a1b9a',
      originalValue: dataYearTwo.Value,
      dataPointText: dataYearTwo.Value.toString(),
    });

    labels.push(`${formatMonth(new Date(parseInt(year || '0'), month))}`);
  }

  const maxValue =
    Math.ceil(Math.max(...combinedData.map((item) => item.value)) / 10000) *
    10000;
  const stepValue = maxValue / 10;

  const handleBarPress = (
    value: number,
    x: number,
    y: number,
    originalValue: number,
  ) => {
    setTooltip({ originalValue, visible: true, value: originalValue, x, y });
  };

  return (
    <View style={CompareChartStyle.chartContainer}>
      <BarChart
        overflowTop={50}
        spacing={20}
        data={combinedData}
        focusBarOnPress
        isAnimated
        height={250}
        barWidth={25}
        barBorderTopLeftRadius={4}
        barBorderTopRightRadius={4}
        frontColor="#6a1b9a"
        stepValue={stepValue}
        maxValue={maxValue}
        yAxisLabelWidth={50}
        xAxisLabelTexts={labels}
        xAxisLabelTextStyle={{ flex: 1 }}
        onPress={(item: Tooltip, index: number, x: number, y: number) =>
          handleBarPress(item.value, x, y, item.originalValue)
        }
        renderTooltip={() => {
          return (
            <View
              style={[
                BarChartStyle.tooltip,
                { top: tooltip.y, left: tooltip.x },
              ]}
            >
              <Text style={CompareChartStyle.tooltipText}>{tooltip.value}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
