import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_PATH } from '../endpoints';

export const baseService = createApi({
  reducerPath: 'baseApiService',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_PATH }),
  endpoints: () => ({}),
  refetchOnFocus: true,
  refetchOnReconnect: true,
});
