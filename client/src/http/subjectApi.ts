import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISubject } from '../API/api';
  
export const subjectApi = createApi({
  reducerPath: 'subjectApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL}),  
  endpoints: (builder) => ({
    getSubjects: builder.query<ISubject[] , void>({
      query: () => 'api/subject',  
    }),
    addSubject: builder.mutation<ISubject,ISubject>({
      query:(body)=>({
        method:'POST',
        url:'api/subject',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body
      })
    }),
    removeSubject:builder.mutation<ISubject,number>({
      query:(subjectId)=>({
        method:"DELETE",
        url:`api/subject/${subjectId}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
    }),
  }),
});

export const { useGetSubjectsQuery,useAddSubjectMutation, useRemoveSubjectMutation} = subjectApi;
