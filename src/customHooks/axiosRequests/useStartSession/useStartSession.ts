import { TSession } from 'types/session';
import { useGlobalContext } from 'state/globalState/context';
import { AxiosResponse } from 'axios';
import useAxiosRequest from '../_useAxiosRequest';
import { TuseStartSession } from './useStartSession.types';

const useStartSession: TuseStartSession = () => {
  const { REACT_APP_DBAPI_HOST } = process.env;

  const [globalState] = useGlobalContext();
  const { session } = globalState;

  const startSessionRequest = useAxiosRequest<TSession>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/StartSession`,
    method: 'POST',
  });

  if (session.sessionNo && session.id) {
    return {
      startSession: () => {
        return (Promise.resolve({ data: { session } }) as unknown) as Promise<
          AxiosResponse<TSession>
        >;
      },
      isLoading: false,
      hasError: false,
    };
  }

  const { isLoading, sendRequest, hasError } = startSessionRequest;

  return {
    startSession: sendRequest,
    isLoading,
    hasError,
  };
};

export default useStartSession;
