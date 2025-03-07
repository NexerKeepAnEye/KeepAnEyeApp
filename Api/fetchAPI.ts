import { EXPO_PUBLIC_API_URL } from '@env';
import { Meter, MeterData, Premise, Product } from '../Types/Type';

const baseUrl = EXPO_PUBLIC_API_URL;

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
  designations: string[] = [],
  meterIds: number[] = [],
): Promise<MeterData[]> {
  try {
    // console.log(
    //   'apikey: ',
    //   apiKey,
    //   'productId: ',
    //   productId,
    //   'resolution: ',
    //   resolution,
    //   'from: ',
    //   new Date(from).toISOString(),
    //   'to: ',
    //   new Date(to).toISOString(),
    //   'correctedValues: ',
    //   correctedValues,
    //   'premiseIds: ',
    //   premiseIds,
    //   'designations: ',
    //   designations,
    //   'meterIds: ',
    //   meterIds,
    // );
    correctedValues = correctedValues ?? false;

    const response = await fetch(`${baseUrl}/meterdata`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      // agent,
      body: JSON.stringify({
        ProductId: productId,
        Resolution: resolution,
        CorrectedValues: correctedValues,
        From: new Date(from).toISOString(),
        To: new Date(to).toISOString(),
        PremiseIds: premiseIds,
        Designation: designations,
        MeterIds: meterIds,
      }),
    });

    // console.log('fetchMeterData: ', response);

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
        DateTime: new Date(new Date(item.DateTime).toISOString()),
        Value: item.Value,
        Cost: item.Cost,
        Code: item.Code,
        PremiseId: item.PremiseId,
        Designation: item.Designation,
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
