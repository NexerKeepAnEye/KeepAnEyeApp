import * as React from 'react';
import { useState } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { AccordionStyle } from '../Style/AccordionStyle';
import { filterTypes } from '../Types/FilterTypes';
import Filter from './Filters/Filter';
import { ReportGrid } from './Report/ReportGrid';

export const Accordion2 = () => {
  const [expandedReport, setExpandedReport] = useState(false);
  const [expandedFilter, setExpandedFilter] = useState(false);
  const [selectedReport, setSelectedReport] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleReportPress = () => setExpandedReport(!expandedReport);
  const handleFilterPress = () => setExpandedFilter(!expandedFilter);

  const doSomething = (reportType: string) => {
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
    <List.Section title="Accordions">
      <List.Accordion
        title={selectedReport || '-- Välj rapport --'}
        expanded={expandedReport}
        onPress={handleReportPress}
      >
        {filterTypes.rapporter.map((report) => (
          <List.Item
            key={report.id}
            title={report.type}
            onPress={() => doSomething(report.type)}
            style={AccordionStyle.listItem}
            titleStyle={AccordionStyle.listText}
          />
        ))}
      </List.Accordion>

      {selectedReport && (
        <List.Accordion
          title="Filter"
          expanded={expandedFilter}
          onPress={handleFilterPress}
        >
          <View>
            <Filter
              filters={getFiltersForReport(selectedReport)}
              setFilteredResults={setSearchResults}
              meterData={[]}
              showButton={false}
            />
          </View>
        </List.Accordion>
      )}

      <ReportGrid
        selectedReport={selectedReport}
        searchResults={searchResults}
      />
    </List.Section>
  );
};

export default Accordion2;
