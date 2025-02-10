import { Meter, MeterData, Premise, Product } from '../Types/Type';
// import https from 'https';
// import fetch from 'node-fetch';

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

const baseUrl = process.env.EXPO_PUBLIC_API_URL;

export async function fetchPremise(apiKey: string): Promise<Premise[]> {
  try {
    const response = await fetch(`${baseUrl}/Premise`, {
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
    const premises: Premise[] = data.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any): Premise => ({
        Id: item.Id,
        Designation: item.Designation ?? null,
        Name: item.Name,
        Meters: (item.Meters || []).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (meter: any): Meter => ({
            Id: meter.Id,
            Name: meter.Name,
            ProductId: meter.ProductId,
            ProductCode: meter.ProductCode,
          }),
        ),
      }),
    );
    return premises;
  } catch (error) {
    console.error('Error fetching premises:', error);
    throw error;
  }
}

export async function fetchProduct(apiKey: string): Promise<Product[]> {
  try {
    const response = await fetch(`${baseUrl}/product`, {
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
    const products: Product[] = data.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any): Product => ({
        Id: item.Id,
        Code: item.Code,
        Unit: item.Unit,
      }),
    );
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

export async function fetchMeterData(
  apiKey: string,
  productId: number,
  resolution: string,
  from: Date,
  to: Date,
  correctedValues?: boolean,
  premiseIds: number[] = [],
  meterIds: number[] = [],
): Promise<MeterData[]> {
  try {
    const response = await fetch(`${baseUrl}/meterdata`, {
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
        meterIds,
      }),
    });
    // console.log('fetchMeterData: ', JSON.stringify(response.json()));

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Unexpected response format');
    }

    const meterData: MeterData[] = data.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any): MeterData => ({
        DateTime: new Date(item.DateTime),
        Value: item.Value,
        Cost: item.Cost,
        Code: item.Code,
        PremiseId: item.PremiseId,
        MeterId: item.MeterId,
      }),
    );
    // console.log('meterData:', meterData);
    return meterData;
  } catch (error) {
    console.error('Error fetching meter data:', error);
    throw error;
  }
}
