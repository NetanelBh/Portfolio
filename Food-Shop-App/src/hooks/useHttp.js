import { useCallback, useEffect, useState } from "react";

const sendHttpRequest = async (url, config) => {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || "Something went wrong when try to send request"
    );
  }

  return resData;
};

const useHttp = (url, config, initialData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(initialData);

  const clearData = () => {
    setData(initialData);
  };

  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      const resData = await sendHttpRequest(url, config);
      setData(resData);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [url, config]);

  // Send request is dependency because it defined outside the effect function
  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method )) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {isLoading, error, data, sendRequest, clearData};
};

export default useHttp;
