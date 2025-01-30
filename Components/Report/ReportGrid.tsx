import React from 'react';
import { ScrollView } from 'react-native';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import { MonthlyReport } from './Monthlyreport';
import { YearlyReport } from './Yearlyreport';
import { YearComparison } from './YearComparison';

interface ReportGridProps {
  selectedReport: string;
  searchResults: string[];
}

export const ReportGrid = ({ selectedReport }: ReportGridProps) => {
  return (
    <ScrollView style={ReportGridStyle.root}>
      {selectedReport === 'Månadsrapport' && <MonthlyReport />}
      {selectedReport === 'Årsrapport' && <YearlyReport />}
      {selectedReport === 'Jämför år' && <YearComparison />}
    </ScrollView>
  );
};
