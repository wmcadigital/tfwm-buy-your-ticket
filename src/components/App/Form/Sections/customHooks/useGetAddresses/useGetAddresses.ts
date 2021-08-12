import { useEffect } from 'react';
import useAxiosRequest from 'customHooks/useAxiosRequest';
import { Nullable } from 'types/helpers';

const useGetAddresses = (postcode: Nullable<string>) => {
  // REQUESTS
  const addressesRequest = useAxiosRequest<string[]>({
    url: `https://api.wmnetwork.co.uk/address/v1/AddressByPostcode/${postcode}`,
  });

  // RESPONSES
  const addresses = JSON.stringify(addressesRequest.response?.data);

  /* : {
    guid: string;
    postcode: string;
    postcode_inward: string;
    postcode_outward: string;
    post_town: string;
    dependant_locality: string;
    double_dependant_locality: string;
    thoroughfare: string;
    dependant_thoroughfare: string;
    building_number: string;
    building_name: string;
    po_box: string;
    department_name: string;
    organisation_name: string;
    udprn: string;
    umprn: string;
    line_1: string;
    line_2: string;
    line_3: string;
    premise: string;
    ward: string;
    district: string;
    county: string;
    country: string;
    longitude: string;
    latitude: string;
    northings: string;
    eastings: string;
    summary_line: string;
   }[]  */

  useEffect(() => {
    if (postcode) {
      addressesRequest.sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoading, hasError } = addressesRequest;

  return { isLoading, hasError, addresses };
};

export default useGetAddresses;
