// import useAxiosRequest from '../_useAxiosRequest';
import { useState } from 'react';

const useGetAddress = () => {
  // const addressRequest = useAxiosRequest<{ text: string; value: string }[]>({
  //   url: `https://api.getAddress.io/find/${postcode}`,
  // });

  const response = [
    {
      formatted_address: ['16 Summer Lane', '', '', 'Birmingham', 'West Midlands'],
      thoroughfare: 'Summer Lane',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '16',
      line_1: '16 Summer Lane',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Birmingham',
      county: 'West Midlands',
      district: 'Birmingham',
      country: 'England',
    },
    {
      formatted_address: ['18 Summer Lane', '', '', 'Birmingham', 'West Midlands'],
      thoroughfare: 'Summer Lane',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '16',
      line_1: '18 Summer Lane',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Birmingham',
      county: 'West Midlands',
      district: 'Birmingham',
      country: 'England',
    },
    {
      formatted_address: ['20 Summer Lane', '', '', 'Birmingham', 'West Midlands'],
      thoroughfare: 'Summer Lane',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '16',
      line_1: '20 Summer Lane',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Birmingham',
      county: 'West Midlands',
      district: 'Birmingham',
      country: 'England',
    },
    {
      formatted_address: ['22 Summer Lane', '', '', 'Birmingham', 'West Midlands'],
      thoroughfare: 'Summer Lane',
      building_name: '',
      sub_building_name: '',
      sub_building_number: '',
      building_number: '16',
      line_1: '22 Summer Lane',
      line_2: '',
      line_3: '',
      line_4: '',
      locality: '',
      town_or_city: 'Birmingham',
      county: 'West Midlands',
      district: 'Birmingham',
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
