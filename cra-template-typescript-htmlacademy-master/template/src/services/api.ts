import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayResponseError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ error: string }>) => {
      if (error.response && shouldDisplayResponseError(error.response)) {
        toast.error(error.response.data.error);
      }
      throw error;
    }
  );

  return api;
};

