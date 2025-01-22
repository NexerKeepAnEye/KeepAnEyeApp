// import meterdata from '../MockedData/API/meterdata.json'; // Importera din JSON-fil
import premise from '../MockedData/API/premise.json'; // Importera din JSON-fil
import product from '../MockedData/API/product.json'; // Importera din JSON-fil

export async function mockApiFetch(url: string, options: { headers: { [key: string]: string }, method?: string, body?: string }) {
  console.log("Mock API Called:", url, options);

  // Simulera en liten fördröjning (som ett riktigt API)
  await new Promise(resolve => setTimeout(resolve, 500));

  // Kontrollera API-nyckeln
  if (!options.headers['X-API-Key'] || options.headers['X-API-Key'] !== 'abc') {
    return {
      ok: false,
      status: 406,
      json: async () => ({ error: "Unauthorized: Invalid API Key" }),
    };
  }

if (url === '/premise' && options.method === 'GET') {
    return {
      ok: true,
      status: 200,
      json: async () => premise.Premise, // Returnerar fastigheter
    };
  }

  // Hantera olika endpoints
  if (url === '/product' && options.method === 'GET') {
    return {
      ok: true,
      status: 200,
      json: async () => product.Product, // Returnerar produkterna
    };
  }

//   if (url === 'https://test.keepaneye.net/api/v1/MeterData' && options.method === 'POST') {
//     const requestBody = JSON.parse(options.body);

//     const meterData = mockData.meterData.find(
//       md =>
//         md.productId === requestBody.productId &&
//         md.resolution === requestBody.resolution &&
//         md.from === requestBody.from &&
//         md.to === requestBody.to &&
//         md.correctedValues === requestBody.correctedValues
//     );

    // if (meterData) {
    //   return {
    //     ok: true,
    //     status: 200,
    //     json: async () => meterData.data, // Returnerar mätdata
    //   };
    // } else {
    //   return {
    //     ok: false,
    //     status: 404,
    //     json: async () => ({ error: "Meter data not found" }),
    //   };
    // }
    // Hantera okända endpoints
    return {
      ok: false,
      status: 404,
      json: async () => ({ error: "Not Found" }),
    };
  }
