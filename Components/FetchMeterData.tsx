import { useEffect } from 'react';
import { usePremiseContext } from '../Context/PremiseContext';
import { meterData } from '../MockedData/MockedMeterDataMonth';

export const FetchMeterData = () => {
  const { dispatch } = usePremiseContext();

  useEffect(() => {
    dispatch({ type: 'SET_METER_DATA', payload: meterData });
  }, [dispatch]);

  return null;
};
