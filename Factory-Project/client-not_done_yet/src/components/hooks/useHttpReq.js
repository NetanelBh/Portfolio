import { useState } from "react";

export const useHttpReq = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);

  const sendHttp = async (url, reqConfig) => {
    setIsLoading(true);
    setFetchedData([]);

    try {
      const resp = await fetch(url, {
        method: reqConfig.method ? reqConfig.method : "GET",
        body: reqConfig.body ? JSON.stringify(reqConfig.body) : null,
        mode: reqConfig.mode ? reqConfig.mode : "cors",
        headers: reqConfig.headers ? reqConfig.headers : {},
      });

      if (!resp.ok) {
        throw new Error("Request failed");
      }

      const data = await resp.json();
      setFetchedData(data);
    } catch (error) {
      throw new Error(error);
    }

    setIsLoading(false);
  };

  return { isLoading, fetchedData, sendHttp };
};
