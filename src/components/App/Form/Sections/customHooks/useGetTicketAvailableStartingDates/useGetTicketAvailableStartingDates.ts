import { useEffect } from 'react';
import useAxiosRequest from 'customHooks/useAxiosRequest';
import { useGlobalContext } from 'state/globalState/context';

const useGetTicketAvailableStartingDates = () => {
  const [globalState] = useGlobalContext();
  const { ticket } = globalState;

  const { REACT_APP_DBAPI_HOST } = process.env;
  const config = {
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/AvailableDates?ticketId=${ticket.id}`,
  };

  // https://wmca-ianrose-dd-api.azurewebsites.net/api/DirectDebit/AvailableDates?ticketId=38

  const { isLoading, hasError, response, sendRequest } = useAxiosRequest(config);

  const unformatedDates = response?.data;
  const availableDates: Date[] | null =
    unformatedDates && Array.isArray(unformatedDates)
      ? unformatedDates.map((date: string) => new Date(date))
      : null;

  useEffect(() => {
    if (!availableDates) sendRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!availableDates) {
    return { isLoading: false, hasError: false, availableDates };
  }

  return { isLoading, hasError, availableDates };
};

export default useGetTicketAvailableStartingDates;
