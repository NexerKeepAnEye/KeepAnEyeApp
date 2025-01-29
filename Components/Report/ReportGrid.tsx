import React from 'react';
import { ScrollView } from 'react-native';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import { MonthlyReport } from './Monthlyreport';
import { YearlyReport } from './Yearlyreport';
import Analysisreport from './Analysisreport';

interface ReportGridProps {
  selectedReport: string;
  searchResults: string[];
}

export const ReportGrid = ({ selectedReport }: ReportGridProps) => {
  return (
    <ScrollView style={ReportGridStyle.root}>
      {selectedReport === 'Månadsrapport' && <MonthlyReport />}
      {selectedReport === 'Årsrapport' && <YearlyReport />}
      {selectedReport === 'Analysrapport' && <Analysisreport />}
    </ScrollView>
  );
};
