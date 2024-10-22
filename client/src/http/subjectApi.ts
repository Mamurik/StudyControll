import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISubject } from '../API/api';
  
export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL}),  
  endpoints: (builder) => ({
    getSubjects: builder.query<ISubject[] , void>({
      query: () => 'api/subject',  
    }),
  }),
});

export const { useGetSubjectsQuery } = subjectApi;
