import { useEffect } from 'react';
import { meterData } from '../MockedData/MockedMeterData';
import { usePremiseContext } from '../PremiseState/PremiseContext';

export const FetchMeterData = () => {
  const { dispatch } = usePremiseContext();

  useEffect(() => {
    dispatch({ type: 'SET_METER_DATA', payload: meterData });
  }, [dispatch]);

  return null;
};
