// import axios from 'axios';

// export async function fetchProduct(apiKey: string) {
//   const https = require('https');
//   const instance = axios.create({
//     httpsAgent: new https.Agent({ rejectUnauthorized: false }),
//   });
//   try {
//     const response = await axios.get(
//       'https://test.keepaneye.net/api/v1/Product',
//       {
//         headers: {
//           Accept: 'application/json',
//           'content-type': 'multipart/form-data',
//           'X-API-Key': apiKey,
//         },
//       },
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching products:', error);
//     throw error;
//   }
// }

// // fetchProduct('fc41e3f1-f155-4465-b908-a79991643b0a');
