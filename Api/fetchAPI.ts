import { Meter, MeterData, Premise } from "../Types/Type";
import { mockApiFetch } from "./mockApi";
// import https from 'https';
// import fetch from 'node-fetch';

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

export async function fetchPremise(apiKey: string):Promise<Premise[]> {
  try {
    const response = await mockApiFetch('/premise', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format');
    }
    console.log(JSON.stringify(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const premises: Premise[] = data.map((item: any): Premise => ({
      Id: item.Id,
      Designation: item.Designation ?? null,
      Name: item.Name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Meters: (item.Meters || []).map((meter: any): Meter => ({
        Id: meter.Id,
        Name: meter.Name,
        ProductId: meter.ProductId,
        ProductCode: meter.ProductCode,
      })),
    }));
    return premises;
  } catch (error) {
    console.error('Error fetching premises:', error);
    return [];
  }
}

export async function fetchProduct(apiKey: string) {
  try {
    const response = await mockApiFetch('/product', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(JSON.stringify(data));
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function fetchMeterData(
  apiKey: string,
  productId: number,
  resolution: string,
  from: Date,
  to: Date,
  premiseIds: number[] = [],
  designations: string[] = [],
  meterIds: number[] = [],
) :Promise<MeterData[]>{
  try {
    const response = await mockApiFetch(
      '/meterdata',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-API-Key': apiKey,
        },
        // agent,
        body: JSON.stringify({
          productId,
          resolution,
          from,
          to,
          premiseIds,
          designations,
          meterIds,
        }),
      },
    );
    console.log('fetchMeterData: ', response)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format');
    }

    console.log(JSON.stringify(data));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meterData: MeterData[] = data.map((item: any): MeterData => ({
      DateTime: new Date(item.DateTime),
      Value: item.Value,
      Cost: item.Cost,
      Code: item.Code,
      PremiseId: item.PremiseId,
      Designation: item.Designation ?? null,
      MeterId: item.MeterId,
    }));
    return meterData;
    // const jsonString = JSON.stringify(data);
    // console.log('data:',jsonString);
    // return data;
  } catch (error) {
    console.error('Error fetching meter data:', error);
    throw error;
  }
}

// fetchMeterData(
//   'fc41e3f1-f155-4465-b908-a79991643b0a', // apiKey
//   25, // productId
//   'monthly', // resolution
//   '2023-01-01T00:00:00Z', // from
//   '2024-01-01T00:00:00Z', // to
//   false, // correctedValues
//   [], // premiseIds
//   [], // designations
//   [], // meterIds
// );
