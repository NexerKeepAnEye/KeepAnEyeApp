import * as React from 'react';
import { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { DataTable, List, Text } from 'react-native-paper';
import { mockedData, reportPretendData } from '../MockedData/mockedReportTypes';
import { AccordionStyle, DataTableStyle } from '../Style/AccordionStyle';

const Accordion = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');

  const handlePress = () => setExpanded(!expanded);

  const doSomething = (reportType: string) => {
    setSelectedReport(reportType);
    setExpanded(false);
  };

  return (
    <>
      <List.Section>
        <View style={AccordionStyle.container}>
          <View style={AccordionStyle.content}>
            <Text style={AccordionStyle.header}>
              {selectedReport || '-- Välj rapport --'}
            </Text>
            <TouchableOpacity
              onPress={handlePress}
              style={AccordionStyle.dDL}
            >
              <List.Icon
                icon={expanded ? 'chevron-up' : 'chevron-down'}
                style={[
                  AccordionStyle.listButton,
                  { borderBottomRightRadius: expanded ? 0 : 10 },
                ]}
              />
            </TouchableOpacity>
          </View>
          {expanded && (
            <View style={AccordionStyle.listExpanded}>
              {mockedData.rapporter.map((report) => (
                <Pressable
                  key={report.id}
                  onPress={() => doSomething(report.type)}
                >
                  <List.Item
                    title={report.type}
                    style={AccordionStyle.listItem}
                    titleStyle={AccordionStyle.listText}
                  />
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </List.Section>
      <View style={DataTableStyle.container}>
        {selectedReport && (
          <>
            <Text style={AccordionStyle.headerChanged}>
              {selectedReport} !!!!OBS FELAKTIG DATA!!!
              {/* need to create calculations insted of fetching from mocked reports */}
            </Text>
            <DataTable>
              <DataTable.Header style={DataTableStyle.header}>
                <DataTable.Title>ID</DataTable.Title>
                <DataTable.Title>Value</DataTable.Title>
                <DataTable.Title>Cost</DataTable.Title>
                <DataTable.Title>Timestamp</DataTable.Title>
              </DataTable.Header>
              {reportPretendData[
                selectedReport as keyof typeof reportPretendData
              ]?.map((report) => (
                <DataTable.Row key={report.id}>
                  <DataTable.Cell>{report.id}</DataTable.Cell>
                  <DataTable.Cell>{report.value}</DataTable.Cell>
                  <DataTable.Cell>{report.cost}</DataTable.Cell>
                  <DataTable.Cell>{report.timestamp}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </>
        )}
      </View>
    </>
  );
};

export default Accordion;
