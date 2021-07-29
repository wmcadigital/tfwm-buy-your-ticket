import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { useState, useRef, useCallback, useEffect } from 'react';
import { TUseAxiosRequest } from './useAxiosRequest.types';

const useAxiosRequest: TUseAxiosRequest = <T>(axiosConfig: AxiosRequestConfig) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [response, setResponse] = useState<AxiosResponse<T> | null>(null);

  const mounted = useRef<boolean | null>(null);
  const source = useRef<CancelTokenSource | null>(null);
  const apiTimeout = useRef<any>();

  // Helper functions
  const cancelRequest = useCallback(() => {
    if (source.current) source.current.cancel('Api request timeout');
  }, []);

  const startApiTimeout = useCallback(() => {
    apiTimeout.current = setTimeout(() => {
      cancelRequest();
    }, 15000); // 15 seconds
  }, [cancelRequest]);

  const clearApiTimeout = () => clearTimeout(apiTimeout.current);

  // Main request
  const sendRequest = useCallback(async () => {
    source.current = axios.CancelToken.source();
    mounted.current = true;
    startApiTimeout();

    if (isLoading) return;
    setIsLoading(true);
    let axiosResponse: AxiosResponse<T>;

    try {
      axiosResponse = await axios(axiosConfig);
      clearApiTimeout();
      if (!mounted.current) return;

      setIsLoading(false);
      setHasError(false);
      setResponse(axiosResponse);
    } catch (error) {
      setIsLoading(false);
      // eslint-disable-next-line no-console
      if (!axios.isCancel(error)) console.log({ error });
      setResponse(null);
      setHasError(true);
    }
  }, [axiosConfig, isLoading, startApiTimeout]);

  useEffect(() => {
    return () => {
      mounted.current = false;
      cancelRequest();
      clearApiTimeout();
    };
  }, [cancelRequest]);

  return { isLoading, response, hasError, sendRequest };
};

export default useAxiosRequest;
