import * as React from 'react';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { List, RadioButton } from 'react-native-paper';
import { AccordionStyle } from '../Style/AccordionStyle';
import { deviceHeight, deviceWidth } from '../Style/Dimensions';
import { filterTypes } from '../Types/FilterTypes';
import Filter from './Filters/Filter';
import { ReportGrid } from './Report/ReportGrid';

export const Accordion2 = () => {
  const [expandedReport, setExpandedReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleReportPress = () => setExpandedReport(!expandedReport);

  const selectReport = (reportType: string) => {
    setSelectedReport(reportType);
    setSearchResults([]);
  };

  const getFiltersForReport = (reportType: string) => {
    switch (reportType) {
      case 'Månadsrapport':
        return ['year', 'month', 'meter'];
      case 'Årsrapport':
        return ['year', 'meter'];
      case 'Jämför år':
        return ['year', 'yearTwo', 'meter'];
      case 'Analysrapport':
        return ['dateRange', 'meter'];
      default:
        return [];
    }
  };

  return (
    <ScrollView>
      <List.Section>
        <List.Item
          style={{
            backgroundColor: '#fff',
            width: deviceWidth * 0.9,
          }}
          title={selectedReport || '-- Välj rapport --'}
          onPress={handleReportPress}
          right={(props) => (
            <List.Icon
              {...props}
              icon={expandedReport ? 'chevron-up' : 'chevron-down'}
            />
          )}
          titleStyle={{ color: '#222', fontSize: deviceHeight * 0.025 }}
        />
        {expandedReport && (
          <View>
            <RadioButton.Group
              onValueChange={(newValue) => selectReport(newValue)}
              value={selectedReport}
            >
              {filterTypes.rapporter.map((report) => (
                <TouchableOpacity
                  key={report.id}
                  style={AccordionStyle.listItem}
                  onPress={() => selectReport(report.type)}
                >
                  <RadioButton
                    value={report.type}
                    color={'#FF7043'}
                  />
                  <Text style={AccordionStyle.listText}>{report.type}</Text>
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          </View>
        )}
        {expandedReport && selectedReport && (
          <View
            style={{
              borderWidth: 1,
              borderColor: 'red',
              backgroundColor: '#fff',
            }}
          >
            <Filter
              filters={getFiltersForReport(selectedReport)}
              setFilteredResults={setSearchResults}
              meterData={[]}
              showButton={false}
            />
            <ReportGrid
              selectedReport={selectedReport}
              searchResults={searchResults}
            />
          </View>
        )}
      </List.Section>
    </ScrollView>
  );
};

export default Accordion2;
