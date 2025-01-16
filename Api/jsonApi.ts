// import axios from 'axios';
// import https from 'https';
import MockedMeterData from '../MockedData/MockedMeterData.json';

export async function fetchMeterData(apiKey: string) {
  try {
    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate fetching data with headers
    const response = {
      data: MockedMeterData,
      headers: {
        Accept: 'application/json',
        'content-type': 'multipart/form-data',
        'X-API-Key': apiKey,
      },
    };

    return response.data;
  } catch (error) {
    console.error('Error fetching meter data:', error);
    throw error;
  }
}