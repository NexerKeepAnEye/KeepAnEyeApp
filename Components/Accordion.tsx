import * as React from 'react';
import { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { DataTable, List, Text } from 'react-native-paper';
import { mockedData, reportPretendData } from '../MockedData/mockedReportTypes';

const Accordion = () => {
  const [expanded, setExpanded] = useState(true);
  const [selectedReport, setSelectedReport] = useState('');

  const handlePress = () => setExpanded(!expanded);

  const doSomething = (reportType: string) => {
    setSelectedReport(reportType);
    setExpanded(false);
  };

  return (
    <>
      <List.Section>
        <View
          style={{
            width: '90%',
            borderWidth: 1,
            borderColor: '#d9d9d9',
            borderRadius: 10,
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              padding: '5%',
              justifyContent: 'center',
              position: 'relative',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                flex: 1,
                fontSize: 18,
                fontWeight: 'bold',
              }}
            >
              {selectedReport || '-- Välj rapport --'}
            </Text>
            <TouchableOpacity
              onPress={handlePress}
              style={{ position: 'absolute', right: -1 }}
            >
              <List.Icon
                icon={expanded ? 'chevron-up' : 'chevron-down'}
                style={{
                  width: 65,
                  height: 65,
                  backgroundColor: '#d9d9d9',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: expanded ? 0 : 10,
                }}
              />
            </TouchableOpacity>
          </View>
          {expanded && (
            <View
              style={{
                width: '100%',
                borderTopWidth: 1,
                borderColor: '#d9d9d9',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              {mockedData.rapporter.map((report) => (
                <Pressable
                  key={report.id}
                  onPress={() => doSomething(report.type)}
                >
                  <List.Item
                    title={report.type}
                    style={{
                      borderBottomWidth: 1,
                      borderColor: '#d9d9d9',
                    }}
                  />
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </List.Section>
      <View style={{ width: '90%', marginTop: 20 }}>
        {selectedReport && (
          <>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                marginBottom: 10,
              }}
            >
              {selectedReport}
            </Text>
            <DataTable>
              <DataTable.Header
                style={{
                  backgroundColor: '#d9d9d9',
                  justifyContent: 'space-evenly',
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
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
