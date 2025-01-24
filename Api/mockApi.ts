import meterdata from '../MockedData/API/meterdata.json';
import premise from '../MockedData/API/premise.json';
import product from '../MockedData/API/product.json';

export async function mockApiFetch(
  url: string,
  options: {
    headers: { [key: string]: string };
    method?: string;
    body?: string;
  },
) {
  console.log('Mock API Called:', url, options);

  // Simulera en liten fördröjning (som ett riktigt API)
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!options.headers['X-API-Key'] || options.headers['X-API-Key'] !== 'abc') {
    return {
      ok: false,
      status: 406,
      json: async () => ({ error: 'Unauthorized: Invalid API Key' }),
    };
  }

  if (url === '/premise' && options.method === 'GET') {
    return {
      ok: true,
      status: 200,
      json: async () => premise.Premise,
    };
  }

  if (url === '/product' && options.method === 'GET') {
    return {
      ok: true,
      status: 200,
      json: async () => product.Product,
    };
  }

  if (url === '/meterdata' && options.method === 'POST') {
    const requestBody = options.body ? JSON.parse(options.body) : {};
    const fromDate = new Date(requestBody.from);
    const toDate = new Date(requestBody.to);

    const meterData = meterdata.MeterData.filter(
      (md) =>
        md.ProductId === requestBody.productId &&
        md.Resolution !== null &&
        new Date(md.DateTime) >= fromDate &&
        new Date(md.DateTime) <= toDate &&
        (requestBody.premiseIds.length === 0 ||
          requestBody.premiseIds.includes(md.PremiseId)) &&
        (requestBody.designations.length === 0 ||
          requestBody.designations.includes(md.Designation)) &&
        (requestBody.meterIds.length === 0 ||
          requestBody.meterIds.includes(md.MeterId)),
    );

    if (meterData) {
      console.log('data from api:', meterdata);
      return {
        ok: true,
        status: 200,
        json: async () => meterdata.MeterData,
      };
    } else {
      return {
        ok: false,
        status: 404,
        json: async () => ({ error: 'Meter data not found' }),
      };
    }
  }
  // Hantera okända endpoints
  return {
    ok: false,
    status: 404,
    json: async () => ({ error: 'Not Found' }),
  };
}
