import React from 'react';
import { ScrollView } from 'react-native';
import { ReportGridStyle } from '../../Style/ReportGridStyleStyle';
import Analysisreport from './Analysisreport';
import { MonthlyReport } from './Monthlyreport';
import { YearComparison } from './YearComparison';
import { YearlyReport } from './Yearlyreport';

interface ReportGridProps {
  selectedReport: string;
  searchResults: string[];
}

export const ReportGrid = ({ selectedReport }: ReportGridProps) => {
  return (
    <>
      <ScrollView style={ReportGridStyle.root}>
        {selectedReport === 'Månadsrapport' && <MonthlyReport />}
        {selectedReport === 'Årsrapport' && <YearlyReport />}
        {selectedReport === 'Jämför år' && <YearComparison />}
        {selectedReport === 'Analysrapport' && <Analysisreport />}
      </ScrollView>
    </>
  );
};
