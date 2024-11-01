
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ILab } from '../API/api';

export const labApi = createApi({
  reducerPath: 'labApi', 
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),  
  endpoints: (builder) => ({
    getLabById: builder.query<ILab, number>({ 
      query: (labId) => `api/lab/${labId}`,  
    }),
    getLab: builder.query<ILab[] , void>({
      query: () => 'api/lab',  
    }),
    addLab:builder.mutation<ILab,ILab>({
      query:(body)=>({
        url:"api/lab",
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body,
      })
    }),
    removelab:builder.mutation<ILab,number>({
      query:(labId)=>({
        url:`api/lab/${labId}`,
        method:"DELETE",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      })
    })
  }),
});

export const { useGetLabByIdQuery,useAddLabMutation,useRemovelabMutation,useGetLabQuery } = labApi;
