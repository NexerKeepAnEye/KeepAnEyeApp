import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { deviceHeight, deviceWidth } from '../Style/Dimensions';
import { MeterData } from '../Types/Type';
import { formatValue } from '../Utils/FormatValue';

interface MeterDataLineChartProps {
  filteredResults: MeterData[];
  resolution: string;
  maxValue: number;
  productName: string;
}

export default function MeterDataLineChart({
  filteredResults,
  resolution,
  maxValue,
  productName,
}: MeterDataLineChartProps) {
  const dynamicSpacing =
    (deviceWidth * 2 - deviceWidth * 0.1) / filteredResults.length;

  // const roundMaxValue = Math.round(maxValue) * 1.6;

  const getRoundedMaxValue = (value: number) => {
    if (value >= 1000) {
      return Math.ceil(value / 1000) * 1000;
    } else if (value >= 100) {
      return Math.ceil(value / 100) * 100;
    } else if (value >= 10) {
      return Math.ceil(value / 10) * 10;
    } else if (value >= -2 && value <= 2) {
      return 2;
    } else {
      return Math.ceil(value);
    }
  };
  const getLowestValue = (data: MeterData[]) => {
    return Math.min(...data.map((item) => item.Value));
  };
  const roundMaxValue = getRoundedMaxValue(maxValue) * 1.5;

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    switch (resolution) {
      case 'Dag':
        return `${date.getDate()}/${date.getMonth() + 1}`;
      case 'Timma':
        return `${date.getDate()}/${date.getMonth() + 1}`;
      case 'Månad':
        return `${date.getMonth() + 1}/${date.getFullYear().toString().slice(-2)}`;
      case 'År':
        return `${date.getFullYear()}`;
      default:
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear().toString().split('20')[1]}`;
    }
  };

  const getFormattedData = () => {
    const sortedResults = [...filteredResults].sort(
      (a, b) => new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime(),
    );
    const seenDates = new Set();
    const step =
      sortedResults.length > 7 ? Math.round((sortedResults.length - 2) / 6) : 1;

    return sortedResults
      .map((item, index) => {
        const formattedDate = formatDate(item.DateTime);
        const isEdgeCase =
          index === 1 ||
          index === sortedResults.length - 2 ||
          index === sortedResults.length - 3;

        const date = new Date(item.DateTime);
        const dateString =
          resolution === 'Timma'
            ? `${date.getDate()}/${date.getMonth() + 1} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
            : date.toLocaleDateString();

        if (
          seenDates.has(formattedDate) ||
          (sortedResults.length <= 7 &&
            isEdgeCase &&
            (resolution === 'Timma' || resolution === 'Dag')) ||
          (sortedResults.length > 7 &&
            index !== 0 &&
            index !== sortedResults.length - 1 &&
            (index - 1) % step !== 0)
        ) {
          return {
            label: '',
            value: parseFloat(item.Value.toFixed(3)) || 0,
            date: dateString,
          };
        }

        seenDates.add(formattedDate);
        return {
          value: parseFloat(item.Value.toFixed(3)) || 0,
          label: formattedDate,
          date: dateString,
        };
      })
      .filter((item) => item && !isNaN(item.value));
  };

  const formattedData = getFormattedData().filter((item) => !isNaN(item.value));
  const minValue = getLowestValue(filteredResults);

  return (
    <ScrollView horizontal>
      <LineChart
        areaChart
        scrollAnimation
        hideDataPoints1
        roundToDigits={3}
        data={formattedData}
        startFillColor="#ea5b0c"
        startOpacity={0.3}
        height={deviceHeight * 0.27}
        noOfSections={6}
        maxValue={roundMaxValue}
        initialSpacing={0}
        showDataPointsForMissingValues
        focusEnabled
        adjustToWidth
        showDataPointLabelOnFocus
        yAxisLabelWidth={deviceWidth * 0.1}
        labelsExtraHeight={deviceHeight * 0.055}
        xAxisLabelsHeight={deviceHeight * 0.025}
        xAxisLabelsVerticalShift={10}
        spacing={
          filteredResults.length < 8 ? dynamicSpacing / 3 : dynamicSpacing / 2
        }
        yAxisOffset={minValue <= 0 ? minValue - 0.5 : 0}
        endSpacing={deviceWidth * 0.08}
        xAxisLabelTextStyle={{
          right: 5,
          overFlow: 'visible',
        }}
        color1="#ea5b0c"
        textColor1="#222"
        textFontSize1={deviceHeight * 0.02}
        dataPointsColor1="#ea5b0c"
        overflowTop={1}
        rulesType="dashed"
        pointerConfig={{
          pointerStripHeight: deviceHeight * 0.2,
          pointerStripColor: 'transparent',
          pointerStripWidth: 2,
          pointerColor: '#ea5b0c',
          radius: 6,
          pointerLabelWidth: deviceWidth * 0.15,
          pointerLabelHeight: deviceHeight * 0.07,
          pointerStripUptoDataPoint: true,
          autoAdjustPointerLabelPosition: true,
          pointerVanishDelay: 150000,
          activatePointersInstantlyOnTouch: true,
          pointerLabelComponent: (items: string | number) => {
            const item = items[0];
            const itemDate = new Date(item.date).toString();

            const sortedResults = [...filteredResults].sort(
              (a, b) =>
                new Date(a.DateTime).getTime() - new Date(b.DateTime).getTime(),
            );

            const itemIndex = sortedResults.findIndex((index) => {
              const indexDate = new Date(index.DateTime).toString();
              return indexDate === itemDate;
            });

            const isOverHalf =
              itemIndex > sortedResults.length / 2 && sortedResults.length > 4;

            return (
              <View
                style={{
                  position: 'relative',
                  minWidth: deviceWidth * 0.25,
                  minHeight: deviceHeight * 0.06,
                  maxHeight: deviceHeight * 1,
                  maxWidth: deviceWidth * 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 4,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: deviceWidth * 0,
                    height: deviceHeight * 0.01,
                  },
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,
                  overflow: 'visible',
                  top: -deviceHeight * 0.02,
                  left: isOverHalf ? -deviceWidth * 0.15 : 0,
                }}
              >
                <Text>{item.date}</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {formatValue(item.value) + ' ' + productName}
                </Text>
              </View>
            );
          },
        }}
      />
    </ScrollView>
  );
}
