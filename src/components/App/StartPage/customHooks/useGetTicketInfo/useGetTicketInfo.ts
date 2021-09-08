import { useEffect } from 'react';
import useAxiosRequest from 'customHooks/useAxiosRequest';
import { TApiTicket, TTicket } from 'types/ticket';
import { useGlobalContext } from 'state/globalState/context';

const useGetTicketInfo = (ticketId: number) => {
  const [globalState] = useGlobalContext();
  const { ticket } = globalState;
  const { REACT_APP_API_HOST, REACT_APP_API_KEY, REACT_APP_DBAPI_HOST } = process.env;

  // REQUESTS
  const ticketInfoRequest = useAxiosRequest<TApiTicket>({
    url: `${REACT_APP_API_HOST}/ticketing/v2/tickets/${ticketId}`,
    headers: {
      'Ocp-Apim-Subscription-Key': REACT_APP_API_KEY,
    },
  });

  const availableDatesRequest = useAxiosRequest<string[]>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/AvailableDates?ticketId=${ticketId}`,
  });

  // RESPONSES
  const ticketInfoData = ticketInfoRequest.response?.data;
  const unformattedDates = availableDatesRequest.response?.data || [
    '2021-09-02T09:42:53.006Z',
    '2021-09-03T09:42:53.006Z',
    '2021-09-04T09:42:53.006Z',
    '2021-09-05T09:42:53.006Z',
    '2021-09-06T09:42:53.006Z',
    '2021-09-07T09:42:53.006Z',
    '2021-09-08T09:42:53.006Z',
    '2021-09-09T09:42:53.006Z',
  ];

  let ticketInfo: TTicket | null = null;

  if (ticketInfoData && unformattedDates) {
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

    const formatAvalalbleDates = (unformatedDates: string[]): Date[] => {
      return unformatedDates.map((date: string) => new Date(date));
    };

    ticketInfo = {
      id: ticketInfoData.id,
      name: ticketInfoData.name,
      modes: getTicketModes(ticketInfoData),
      priceString: getTicketPriceString(ticketInfoData),
      availableDates: formatAvalalbleDates(unformattedDates),
    };
  }

  useEffect(() => {
    if (!ticket.name) {
      ticketInfoRequest.sendRequest();
      availableDatesRequest.sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only fetch ticket data if it's not already in globalState
  if (ticket.name) {
    return { isLoading: false, hasError: false, ticketInfo: ticket };
  }

  const isLoading = ticketInfoRequest.isLoading || availableDatesRequest.isLoading;
  // const hasError = ticketInfoRequest.hasError || availableDatesRequest.hasError;
  const hasError = false;

  return { isLoading, hasError, ticketInfo };
};

export default useGetTicketInfo;
