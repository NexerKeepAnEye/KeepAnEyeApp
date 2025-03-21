import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
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

// eslint-disable-next-line react/prop-types
const AnimatedReportIcon = ({ reportType }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [reportType]);

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <ReportIcon reportType={reportType} />
    </Animated.View>
  );
};

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
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 0.95,
                  marginLeft: 10,
                }}
              >
                {selectedReport && (
                  <AnimatedReportIcon reportType={selectedReport} />
                )}
                {selectedReport ? (
                  <Text style={AccordionStyle.header}>{selectedReport}</Text>
                ) : (
                  <Text style={AccordionStyle.headerBlank}>
                    {' '}
                    -- Välj rapport --
                  </Text>
                )}
              </View>
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
                        <AnimatedReportIcon reportType={report.type} />
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
                    <Text style={AccordionStyle.closeButtonText}>Stäng</Text>
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
