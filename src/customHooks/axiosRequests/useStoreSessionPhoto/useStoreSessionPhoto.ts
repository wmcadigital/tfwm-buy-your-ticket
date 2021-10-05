import { AxiosResponse } from 'axios';
import { useFormDataContext } from 'state/formDataState/context';
import { Nullable } from 'types/helpers';
import useAxiosRequest from '../_useAxiosRequest';

type TReturn = {
  sessionPhotoId: number;
  sessionNo: number;
  photo: string;
}[];

const useStoreSessionPhoto = (file: Nullable<File>) => {
  const [formDataState] = useFormDataContext();
  const { sessionNo } = formDataState;

  const { REACT_APP_DBAPI_HOST } = process.env;

  let formData;
  if (file) {
    formData = new FormData();
    formData.append(`postedPhotos`, file);
  }

  const { hasError, isLoading, sendRequest, response } = useAxiosRequest<TReturn>({
    url: `${REACT_APP_DBAPI_HOST}/DirectDebit/StoreSessionPhotos?sessionNo=${sessionNo}`,
    method: 'POST',
    data: formData,
  });

  if (!file) {
    const emptyReturn: TReturn = [
      {
        sessionPhotoId: 0,
        sessionNo,
        photo: '',
      },
    ];

    return {
      hasError: false,
      isLoading: false,
      sendRequest: () => Promise.resolve({ data: emptyReturn } as AxiosResponse<TReturn> | null),
      photoInfo: emptyReturn,
    };
  }

  const photoInfo = response?.data;

  return {
    hasError,
    isLoading,
    sendRequest,
    photoInfo,
  };
};

export default useStoreSessionPhoto;
