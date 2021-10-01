import { TSession } from 'types/session';
import { AxiosResponse } from 'axios';
import { useFormDataContext } from 'state/formDataState/context';
import useAxiosRequest from '../_useAxiosRequest';
import { TuseStartSession } from './useStartSession.types';

const useStartSession: TuseStartSession = () => {
  const { REACT_APP_DBAPI_HOST } = process.env;

  const [formDataState] = useFormDataContext();
  const { createdDateTime, id, sessionNo } = formDataState;

  const session: TSession = {
    createdDateTime,
    id,
    sessionNo,
  };

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
