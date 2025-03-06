import { Meter } from '../Types/Type';

export default function SnackBarErrorHandling(
  resolution: string,
  fromDate: Date,
  toDate: Date,
  filters: string[],
  setLoading: (loading: boolean) => void,
  showSnackbar: (message: string) => void,
  year?: string,
  yearTwo?: string,
  meter?: Meter[],
) {
  if (resolution === 'Yearly') {
    const yearDiff =
      fromDate && toDate ? toDate.getFullYear() - fromDate.getFullYear() : 0;
    if (yearDiff > 5) {
      showSnackbar('För stor tidsperiod, max 5 år');
      return setLoading(false);
    }
  }
  if (resolution === 'Monthly' && !filters.includes('compareYears')) {
    const monthDiff =
      fromDate && toDate
        ? toDate.getMonth() -
          fromDate.getMonth() +
          12 * (toDate.getFullYear() - fromDate.getFullYear())
        : 0;
    if (monthDiff > 12) {
      showSnackbar('För stor tidsperiod, max 12 månader');
      return setLoading(false);
    }
  }
  if (resolution === 'Daily') {
    const dayDiff =
      fromDate && toDate
        ? Math.floor((toDate.getTime() - fromDate.getTime()) / 86400000)
        : 0;
    if (dayDiff > 90) {
      showSnackbar('För stor tidsperiod, max 90 dagar');
      return setLoading(false);
    }
  }

  if (resolution === 'Hourly') {
    const dayDiff =
      fromDate && toDate
        ? Math.floor((toDate.getTime() - fromDate.getTime()) / 86400000)
        : 0;
    if (dayDiff > 31) {
      showSnackbar('För stor tidsperiod, max 31 dagar');
      return setLoading(false);
    }
  }

  if (
    (filters.includes('resolution') && !resolution) ||
    (filters.includes('year') && !year) ||
    (filters.includes('fromToYear') && !year && !yearTwo) ||
    (filters.includes('dateRange') && !fromDate && !toDate) ||
    (filters.includes('meter') && !meter) ||
    (filters.includes('meter') && !meter) ||
    (filters.includes('compareYears') && !year && !yearTwo)
  ) {
    showSnackbar('Fyll i fälten');
    return setLoading(false);
  }
}
