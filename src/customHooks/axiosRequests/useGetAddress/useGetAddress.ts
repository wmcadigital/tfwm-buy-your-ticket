// import useAxiosRequest from '../_useAxiosRequest';
import { useState } from 'react';

const useGetAddress = () => {
  // const addressRequest = useAxiosRequest<{ text: string; value: string }[]>({
  //   url: `https://api.getAddress.io/find/${postcode}`,
  // });

  const response = [
    {
      formatted_address: ['10 Watkin Terrace', '', '', 'Northampton', 'Northamptonshire'],
      thoroughfare: 'Watkin Terrace',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '10',
      line_1: '10 Watkin Terrace',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Northampton',
      county: 'Northamptonshire',
      district: 'Northampton',
      country: 'England',
    },
    {
      formatted_address: ['12 Watkin Terrace', '', '', 'Northampton', 'Northamptonshire'],
      thoroughfare: 'Watkin Terrace',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '12',
      line_1: '12 Watkin Terrace',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Northampton',
      county: 'Northamptonshire',
      district: 'Northampton',
      country: 'England',
    },
    {
      formatted_address: ['14 Watkin Terrace', '', '', 'Northampton', 'Northamptonshire'],
      thoroughfare: 'Watkin Terrace',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '14',
      line_1: '14 Watkin Terrace',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Northampton',
      county: 'Northamptonshire',
      district: 'Northampton',
      country: 'England',
    },
    {
      formatted_address: ['16 Watkin Terrace', '', '', 'Northampton', 'Northamptonshire'],
      thoroughfare: 'Watkin Terrace',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '16',
      line_1: '16 Watkin Terrace',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Northampton',
      county: 'Northamptonshire',
      district: 'Northampton',
      country: 'England',
    },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const sendRequest: () => Promise<typeof response> = () => {
    setIsLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(response);
      }, 1000);
    });
  };

  return {
    isLoading,
    hasError: false,
    response,
    sendRequest,
  };
};

export default useGetAddress;
