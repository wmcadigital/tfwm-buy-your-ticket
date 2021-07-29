import { useEffect } from 'react';
import useAxiosRequest from 'customHooks/useAxiosRequest/useAxiosRequest';
import { TApiTicket, TTicket } from 'types/ticket';

const useGetTicketInfo = (ticketId: number) => {
  const { REACT_APP_API_HOST, REACT_APP_API_KEY } = process.env;
  const config = {
    url: `${REACT_APP_API_HOST}/ticketing/v2/tickets/${ticketId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
    },
  };

  const { isLoading, hasError, response, sendRequest } = useAxiosRequest<TApiTicket>(config);

  const ticketData = response?.data;
  let ticketInfo: TTicket | null = null;

  if (ticketData) {
    const getTicketModes = (apiTicketData: TApiTicket) => {
      const ticketModes = [] as TTicket['modes'];
      if (apiTicketData?.allowBus) ticketModes.push('bus');
      if (apiTicketData?.allowTrain) ticketModes.push('rail');
      if (apiTicketData?.allowMetro) ticketModes.push('metro');
      return ticketModes;
    };

    const getTicketPriceString = (apiTicketData: TApiTicket) => {
      const priceString = `£${apiTicketData.ticketCurrentAmount?.toFixed(2)}`;
      if (apiTicketData.validity === 'Other') return priceString;

      const [, duration] = apiTicketData.validity.split(' ');
      return `${priceString} per ${duration.toLowerCase()}`;
    };

    ticketInfo = {
      id: ticketData.id,
      name: ticketData.name,
      modes: getTicketModes(ticketData),
      priceString: getTicketPriceString(ticketData),
    };
  }

  useEffect(() => {
    sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading, hasError, ticketInfo };
};

export default useGetTicketInfo;
