import { useState } from "react";
import { premise } from '../Types/Types2';
import { mockApiFetch } from "./mockApi";

  const [premises, setPremise] = useState<premise[]>([]);
  const [error, setError] = useState<string>('');

    export const fetchAPI = async (apikey: string) => {
      try {
        const response = await mockApiFetch('/premise', {
          method: 'GET',
          headers: {
            // 'Content-Type': 'application/json',
            apikey: apikey, 
          },
        });

        if (response?.status === 200) {
          const result = await response.json();
          if ('error' in result) {
            setError(result.error);
          } else {
            const data: premise[] = result;
            setPremise(data);
            return 200;
          }
        } else {
          setError("error");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      }
    };
