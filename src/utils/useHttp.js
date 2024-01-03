import { useState } from "react";
import { useCallback } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (url, applyData, options) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        url,
        options && {
          method: options.method,
          headers: options.headers,
        }
      );

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      applyData(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    sendRequest,
  };
};

export default useHttp;
