import * as React from 'react';
import { useState } from 'react';
import { Pressable, ScrollView, TouchableOpacity, View } from 'react-native';
import { List, Text } from 'react-native-paper';
import { AccordionStyle } from '../Style/AccordionStyle';
import { filterTypes } from '../Types/FilterTypes';
import ReportGrid from './ReportGrid';
import { YearSearch } from './YearSearch';

const Accordion = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handlePress = () => setExpanded(!expanded);

  const doSomething = (reportType: string) => {
    setSelectedReport(reportType);
    setExpanded(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchResults = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <ScrollView>
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
              {filterTypes.rapporter.map((report) => (
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
      <ReportGrid
        selectedReport={selectedReport}
        searchResults={searchResults}
      />
    </ScrollView>
  );
};

export default Accordion;
