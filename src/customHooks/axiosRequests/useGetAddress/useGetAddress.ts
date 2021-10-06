import useAxiosRequest from '../_useAxiosRequest';
import { TApiAddress } from 'types/address';

const useGetAddress = (searchString: string) => {
  const { REACT_APP_API_HOST } = process.env;

  const { isLoading, hasError, response, sendRequest } = useAxiosRequest<TApiAddress[]>({
    url: `${REACT_APP_API_HOST}/Addresses/AddressByPostcode/${encodeURI(searchString)}`,
  });

  return {
    isLoading,
    hasError,
    response,
    sendRequest,
  };
};

export default useGetAddress;
