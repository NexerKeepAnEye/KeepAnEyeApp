import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Text } from 'react-native-paper';
import { useFilterContext } from '../Context/FilterContext';
import { usePremiseContext } from '../Context/PremiseContext';
import { BarChartStyle } from '../Style/ChartStyle';
import { deviceHeight } from '../Style/Dimensions';
import { MeterData, Tooltip } from '../Types/Type';
import { formatValue } from '../Utils/FormatValue';

interface MeterDataBarChartProps {
  filteredResults: MeterData[];
  resolution: string;
}

export default function MeterDataBarChart({
  filteredResults,
  resolution,
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
    if (resolution === 'Yearly') {
      return date.getFullYear().toString();
    }
    if (resolution === 'Monthly') {
      return date.toLocaleString('default', { month: 'short' });
    } else {
      return date.toLocaleString('se-SV', { month: 'short' });
    }
  };

  const groupAndSumData = (data: MeterData[]) => {
    const groupedData = new Map();

    data.forEach((item) => {
      const date = new Date(item.DateTime);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!groupedData.has(monthYear)) {
        groupedData.set(monthYear, { ...item, Value: 0 });
      }

      const existingItem = groupedData.get(monthYear);
      existingItem.Value += item.Value;
    });

    return Array.from(groupedData.values());
  };

  const groupedData = groupAndSumData(filteredResults);

  const sortedData = groupedData.sort(
    (a, b) => new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime(),
  );

  const chartData = sortedData.map((item) => ({
    value: item.Value,
    label: formatMonth(new Date(item.DateTime)),
    frontColor: '#ea5b0c',
    gradientColor: '#ea5b0c',
    originalValue: item.Value,
    dataPointText: item.Value.toString(),
  }));

  const maxValue =
    Math.ceil(Math.max(...groupedData.map((item) => item.Value)) / 1000) * 1000;
  const stepValue = maxValue / 5;

  const handleBarPress = (
    value: number,
    x: number,
    y: number,
    originalValue: number,
  ) => {
    setTooltip({ originalValue, visible: true, value: originalValue, x, y });
  };

  const { state: filterstate } = useFilterContext();
  const { state: premiseState } = usePremiseContext();
  const productCode = filterstate.meter.map((m) => m.ProductCode).toString();
  const productName =
    premiseState.products.find((item) => item.Code === productCode)?.Unit || '';

  return (
    <View style={BarChartStyle.chartContainer}>
      <BarChart
        overflowTop={deviceHeight * 0.01}
        data={chartData}
        focusBarOnPress={true}
        focusedBarConfig={{
          color: '#f5a25d',
        }}
        isAnimated
        adjustToWidth
        height={deviceHeight * 0.27}
        barWidth={30}
        spacing={20}
        barBorderTopLeftRadius={4}
        barBorderTopRightRadius={4}
        yAxisColor={'#2222'}
        xAxisColor={'#2222'}
        yAxisExtraHeight={20}
        stepValue={stepValue}
        maxValue={maxValue}
        yAxisLabelWidth={deviceHeight * 0.06}
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
              <Text style={BarChartStyle.tooltipText}>
                {formatValue(tooltip.value) + ' ' + productName}
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
}
