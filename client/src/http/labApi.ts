// api/userLabProgressApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILab } from '../API/api';

export const labApi = createApi({
  reducerPath: 'labApi', 
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),  
  endpoints: (builder) => ({
    getLabById: builder.query<ILab, number>({ 
      query: (labId) => `api/lab/${labId}`,  
    }),
  }),
});

export const { useGetLabByIdQuery } = labApi;
