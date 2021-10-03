import { useFormDataContext } from 'state/formDataState/context';
import useAxiosRequest from '../_useAxiosRequest';

type TReturn = {
  sessionPhotoId: number;
  sessionNo: number;
  photo: string;
};

const useStoreSessionPhotos = (files: File[]) => {
  const [formDataState] = useFormDataContext();
  const { sessionNo } = formDataState;

  const { REACT_APP_DBAPI_HOST } = process.env;

  const { hasError, isLoading, sendRequest, response } = useAxiosRequest<TReturn>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/StoreSessionPhotos?sessionNo=${sessionNo}`,
    method: 'POST',
    data: files,
  });

  const photoInfo = response?.data;

  return {
    hasError,
    isLoading,
    sendRequest,
    photoInfo,
  };
};

export default useStoreSessionPhotos;
