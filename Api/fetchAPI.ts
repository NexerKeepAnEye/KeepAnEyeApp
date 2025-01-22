import { Meter, Premise } from "../Types/Type";
import { mockApiFetch } from "./mockApi";

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
