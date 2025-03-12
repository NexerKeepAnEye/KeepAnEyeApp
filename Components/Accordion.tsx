import * as React from 'react';
import { useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { AccordionStyle } from '../Style/AccordionStyle';
import { deviceHeight, deviceWidth } from '../Style/Dimensions';
import { filterTypes } from '../Types/FilterTypes';
import { ReportGrid } from './Report/ReportGrid';

export const Accordion = () => {
  const [expandedReport, setExpandedReport] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleReportPress = () => setExpandedReport(!expandedReport);

  const selectReport = (reportType: string) => {
    setSelectedReport(reportType);
    setSearchResults([]);
    setExpandedReport(false);
  };

  const sortedReports = filterTypes.rapporter.sort((a, b) =>
    a.type.localeCompare(b.type),
  );

  return (
    <View style={{ marginTop: deviceHeight * 0.01 }}>
      <List.Section>
        <View style={AccordionStyle.container}>
          <TouchableOpacity onPress={handleReportPress}>
            <View style={AccordionStyle.content}>
              <Text style={AccordionStyle.header}>
                {selectedReport || 'Välj rapport'}
              </Text>
              <TouchableOpacity
                onPress={handleReportPress}
                style={AccordionStyle.dDL}
              >
                <List.Icon
                  icon={expandedReport ? 'chevron-up' : 'chevron-down'}
                  style={{
                    marginRight: deviceWidth * 0.05,
                    borderBottomRightRadius: expandedReport ? 0 : 10,
                  }}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          {expandedReport && (
            <View style={AccordionStyle.listExpanded}>
              {sortedReports.map((report) => (
                <Pressable
                  key={report.id}
                  onPress={() => selectReport(report.type)}
                  style={{ borderBottomWidth: 0.4 }}
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
      {selectedReport && (
        <ScrollView>
          <ReportGrid
            selectedReport={selectedReport}
            searchResults={searchResults}
          />
        </ScrollView>
      )}
    </View>
  );
};

export default Accordion;
