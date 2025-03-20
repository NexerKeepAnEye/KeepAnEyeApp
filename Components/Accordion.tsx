import * as React from 'react';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { List, Text } from 'react-native-paper';
import { AccordionStyle } from '../Style/AccordionStyle';
import { deviceHeight } from '../Style/Dimensions';
import { filterTypes } from '../Types/FilterTypes';
import { ReportGrid } from './Report/ReportGrid';
import ReportIcon from './ReportIcon';

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

  const closeModal = () => setExpandedReport(false);

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
                {selectedReport || '-- Välj rapport --'}
              </Text>
              <TouchableOpacity onPress={handleReportPress}></TouchableOpacity>
            </View>
          </TouchableOpacity>

          {expandedReport && (
            <Modal
              transparent={true}
              animationType="fade"
              onRequestClose={closeModal}
            >
              <TouchableOpacity
                onPress={closeModal}
                style={AccordionStyle.modalBackground}
                activeOpacity={1}
              >
                <View style={AccordionStyle.modalContent}>
                  {sortedReports.map((report) => (
                    <Pressable
                      key={report.id}
                      onPress={() => selectReport(report.type)}
                      style={AccordionStyle.listPressed}
                    >
                      <View style={{ flex: 1 }}>
                        <ReportIcon reportType={report.type} />
                      </View>

                      <View style={{ flex: 3 }}>
                        <Text style={AccordionStyle.listItem}>
                          {report.type}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                  <TouchableOpacity
                    onPress={closeModal}
                    style={AccordionStyle.closeButton}
                  >
                    <Text style={AccordionStyle.closeButtonText}>stäng</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Modal>
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
