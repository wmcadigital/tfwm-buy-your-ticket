import { TSession } from 'types/session';

import useAxiosRequest from '../_useAxiosRequest';
import { TuseStartSession } from './useStartSession.types';

const useStartSession: TuseStartSession = () => {
  const { REACT_APP_DBAPI_HOST } = process.env;

  const startSessionRequest = useAxiosRequest<TSession>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/StartSession`,
    method: 'POST',
  });

  const { isLoading, sendRequest, hasError } = startSessionRequest;

  return {
    startSession: sendRequest,
    isLoading,
    hasError,
  };
};

export default useStartSession;
