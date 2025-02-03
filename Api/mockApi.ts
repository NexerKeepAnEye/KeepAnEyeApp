import meterdata from '../MockedData/API/meterdata.json';
import premise from '../MockedData/API/premise.json';
import product from '../MockedData/API/product.json';
import { MeterData } from '../Types/Type';

export async function mockApiFetch(
  url: string,
  options: {
    headers: { [key: string]: string };
    method?: string;
    body?: string;
  },
) {
  console.log('Mock API Called:', url, options);
  console.log('Mock API Called:', url, options);

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

    console.log('REQUESTBODY:', requestBody);

    const meterData = meterdata.MeterData.filter((md) => {
      const mdDateTime = new Date(md.DateTime);
      const isProductIdMatch = md.ProductId === requestBody.productId;
      const isResolutionNotNull = md.Resolution === requestBody.resolution;
      const isDateInRange = mdDateTime >= fromDate && mdDateTime <= toDate;
      const isPremiseIdMatch =
        requestBody.premiseIds.length === 0 ||
        requestBody.premiseIds.includes(md.PremiseId);
      const isMeterIdMatch =
        requestBody.meterIds.length === 0 ||
        requestBody.meterIds.includes(md.MeterId);

      // console.log('Filter Check:', {
      //   isProductIdMatch,
      //   isResolutionNotNull,
      //   isDateInRange,
      //   isPremiseIdMatch,
      //   isMeterIdMatch,
      // });

      // console.log('Values:', {
      //   mdDateTime,
      //   fromDate,
      //   toDate,
      // });

      return (
        isProductIdMatch &&
        isResolutionNotNull &&
        isDateInRange &&
        isPremiseIdMatch &&
        isMeterIdMatch
      );
    });

    if (meterData.length > 0) {
      const responseData: MeterData[] = meterData.map((md) => ({
        DateTime: new Date(md.DateTime),
        Value: md.Value,
        Cost: md.Cost,
        Code: md.Code || '',
        PremiseId: md.PremiseId,
        MeterId: md.MeterId,
        ProductId: md.ProductId,
        Resolution: md.Resolution,
      }));

      console.log('responseData:', responseData);

      return {
        ok: true,
        status: 200,
        json: async () => responseData,
      };
    } else {
      return {
        ok: false,
        status: 404,
        json: async () => ({ error: 'Meter data not found' }),
      };
    }
  }

  return {
    ok: false,
    status: 404,
    json: async () => ({ error: 'Not Found' }),
  };
}
