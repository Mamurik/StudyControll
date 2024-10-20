// api/userLabProgressApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUserLabProgress } from '../API/api';

export const userLabProgressApi = createApi({
  reducerPath: 'userLabProgressApi', 
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),  
  endpoints: (builder) => ({
    getUserLabProgress: builder.query<IUserLabProgress[], number>({ 
      query: (userId) => `api/userLabProgress/${userId}`,  
    }),
  }),
});

export const { useGetUserLabProgressQuery } = userLabProgressApi;
