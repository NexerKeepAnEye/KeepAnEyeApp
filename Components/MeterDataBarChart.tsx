// import { useState } from 'react';
// import { View } from 'react-native';
// import { BarChart } from 'react-native-gifted-charts';
// import { Text } from 'react-native-paper';
// import { data } from '../MockedData/MeterData';
// import { BarChartStyle } from '../Style/ChartStyle';
// import { Tooltip } from '../Types/Interfaces/Type';
// import * as React from 'react';

// export default function MeterDataBarChart() {
//   const [tooltip, setTooltip] = useState<Tooltip>({
//     originalValue: 0,
//     visible: false,
//     value: 0,
//     x: 0,
//     y: 0,
//   });

//   const formatMonth = (date: Date) => {
//     return date.toLocaleString('default', { month: 'short' });
//   };

//   const sortedData = data.sort(
//     (a, b) => a.datetime.getTime() - b.datetime.getTime(),
//   );

//   const chartData = sortedData.map((item) => ({
//     value: item.value, // Use original value for bar height
//     label: formatMonth(item.datetime),
//     frontColor: '#ea5b0c',
//     gradientColor: '#ea5b0c',
//     originalValue: item.value, // Add original value to chart data
//   }));

//   const maxValue =
//     Math.ceil(Math.max(...data.map((item) => item.value)) / 2000) * 2000;
//   const stepValue = maxValue / 3; // Adjust this value to get 4 steps including 0

//   const handleBarPress = (
//     value: number,
//     x: number,
//     y: number,
//     originalValue: number,
//   ) => {
//     setTooltip({ originalValue, visible: true, value: originalValue, x, y });
//   };

//   return (
//     <View style={BarChartStyle.chartContainer}>
//       <BarChart
//         data={chartData}
//         focusBarOnPress
//         isAnimated
//         height={200}
//         barWidth={30}
//         barBorderTopLeftRadius={4}
//         barBorderTopRightRadius={4}
//         frontColor="#6a1b9a"
//         yAxisLabelTexts={Array.from({ length: 4 }, (_, i) =>
//           (i * stepValue).toString(),
//         )}
//         stepValue={stepValue}
//         maxValue={maxValue}
//         onPress={(item: Tooltip, index: number, x: number, y: number) =>
//           handleBarPress(item.value, x, y, item.originalValue)
//         }
//         renderTooltip={() => {
//           return (
//             <View style={BarChartStyle.tooltip}>
//               <Text style={BarChartStyle.tooltipText}>{tooltip.value}</Text>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }
