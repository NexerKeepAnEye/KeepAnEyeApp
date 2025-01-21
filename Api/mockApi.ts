// import meterdata from '../MockedData/API/meterdata.json'; // Importera din JSON-fil
import premise from '../MockedData/API/premise.json'; // Importera din JSON-fil
// import product from '../MockedData/API/product.json'; // Importera din JSON-fil


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockApiFetch = async (url : string, options: any) => {
  console.log("Fetching from mock API:", url);
  console.log("Options:", options);


  // Simulera headers
const headers = options?.headers || {};

    if (url === '/premise' && headers.apikey === 'abc') {
    // Simulera delay (som om du anropar ett riktigt API)
    await new Promise(resolve => setTimeout(resolve, 500));

    // Simulera olika endpoints baserat på URL
    if (url === '/premise' && options?.method === 'GET') {
        return {
            status: 200,
            json: async () => premise.Premise,
        };
    }
  
    // if (url === '/meterdata' && options?.method === 'GET') {
    //   return {
    //     status: 200,
    //     json: async () => meterdata.MeterData,
    //   };
    // }
    // if (url === '/product' && options?.method === 'GET') {
    //     return {
    //         status: 200,
    //         json: async () => product.Product,
    //     };
    // }

    // Simulera 404
    return {
        status: 404,
        json: async () => ({ error: "Not found" }),
    };
};
}
