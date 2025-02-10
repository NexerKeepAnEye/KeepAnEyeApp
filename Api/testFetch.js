// import https from 'https';
// import fetch from 'node-fetch';

// const agent = new https.Agent({
//   rejectUnauthorized: false,
// });

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// export async function fetchProduct(apiKey) {
//   try {
//     const response = await fetch(
//       'https://www.keepaneye.net/api/v1/Product',
//       {
//         method: 'GET',
//         headers: {
//           Accept: 'application/json; charset=utf-8',
//           'X-API-Key': apiKey,
//         },
//         // agent,
//       },
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     const jsonString = JSON.stringify(data);
//     console.log(jsonString);
//     // console.log(data);
//     return data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//   }
// }

// fetchProduct('193c3553-494a-4d0f-a019-eb8cffe3c45d');

// export async function fetchMeterData(
//   apiKey,
//   productId,
//   resolution,
//   from,
//   to,
//   correctedValues = false,
//   premiseIds = [],
//   designations = [],
//   meterIds = [],
// ) {
//   try {
//     const response = await fetch(
//       'https://www.keepaneye.net/api/v1/MeterData',
//       {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//           'X-API-Key': apiKey,
//         },
//         // agent,
//         body: JSON.stringify({
//           productId,
//           resolution,
//           from,
//           to,
//           correctedValues,
//           premiseIds,
//           designations,
//           meterIds,
//         }),
//       },
//     );

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     const jsonString = JSON.stringify(data);
//     console.log(jsonString);
//     return data;
//   } catch (error) {
//     console.error('Error fetching meter data:', error);
//     throw error;
//   }
// }

// fetchMeterData(
//   '193c3553-494a-4d0f-a019-eb8cffe3c45d', // apiKey
//   25, // productId
//   'Monthly', // resolution
//   '2023-01-01', // from
//   '2024-01-01', // to
//   false, // correctedValues
//   [], // premiseIds
//   [], // designations
//   [2303], // meterIds
// );
