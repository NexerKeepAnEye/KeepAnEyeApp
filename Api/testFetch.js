import https from 'https';
import fetch from 'node-fetch';

const agent = new https.Agent({
  rejectUnauthorized: false,
});

export async function fetchProduct(apiKey) {
  try {
    const response = await fetch('https://test.keepaneye.net/api/v1/Premise', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': apiKey,
      },
      agent,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const jsonString = JSON.stringify(data);
    console.log(jsonString);
    // console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

fetchProduct('fc41e3f1-f155-4465-b908-a79991643b0a');