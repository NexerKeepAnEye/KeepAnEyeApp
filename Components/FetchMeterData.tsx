import { useEffect } from 'react';
// import { meterData } from '../MockedData/MockedMeterDataMonth';
import { usePremiseContext } from '../PremiseState/PremiseContext';
import { meterData } from '../MockedData/testdb.json';

export const FetchMeterData = () => {
  const { dispatch } = usePremiseContext();

  useEffect(() => {
    dispatch({ type: 'SET_METER_DATA', payload: meterData });
  }, [dispatch]);

  return null;
};
