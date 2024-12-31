import { createApi } from '@reduxjs/toolkit/query/react'
import { IOwnerDto } from '../types'
import { axiosBaseQuery, transformApiResponse } from './authService'

const transformResponseData = (response: { StatusCode: number; Data: any; LogEntries: any[] }) => {
  return transformApiResponse(response)
}

const buildQuery = (url: string, method: 'GET' | 'POST', data?: any) => ({
  url,
  method,
  data,
})

export const ownersApi = createApi({
  reducerPath: 'ownersApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    fetchOwners: builder.query<IOwnerDto[], boolean>({
      query: (activeOnly = true) => {
        const url = activeOnly ? '/Owners/List?ActiveOnly=true' : '/Owners/List'
        return buildQuery(url, 'GET')
      },
      transformResponse: transformResponseData,
    }),

    addNewOwner: builder.mutation<IOwnerDto, Partial<IOwnerDto>>({
      query: (newOwner) => buildQuery('/Owners/Create', 'POST', newOwner),
      transformResponse: transformResponseData,
    }),

    getOwnerById: builder.query<IOwnerDto, number>({
      query: (ownerId) => buildQuery(`/Owners/FindByID?OwnerId=${ownerId}`, 'POST'),
      transformResponse: transformResponseData,
    }),

    updateOwner: builder.mutation<IOwnerDto, Partial<IOwnerDto>>({
      query: (updatedOwner) => buildQuery('/Owners/Modify', 'POST', updatedOwner),
      transformResponse: transformResponseData,
    }),

    deleteOwner: builder.mutation<void, number>({
      query: (ownerId) => buildQuery(`/Owners/Delete?OwnerId=${ownerId}`, 'POST'),
      transformResponse: transformResponseData,
    }),

    searchOwners: builder.query<IOwnerDto[], string>({
      query: (searchWord) => buildQuery(`/Owners/Find?SearchWord=${searchWord}`, 'POST'),
      transformResponse: transformResponseData,
    }),

    linkOwner: builder.mutation<void, Partial<{ ownerId: number; propertyId: number }>>({
      query: (ownerProperty) => buildQuery('/Owners/LinkOwner', 'POST', ownerProperty),
      transformResponse: transformResponseData,
    }),

    delinkOwner: builder.mutation<void, Partial<{ ownerId: number; propertyId: number }>>({
      query: (ownerProperty) => buildQuery('/Owners/DelinkOwner', 'POST', ownerProperty),
      transformResponse: transformResponseData,
    }),
  }),
})

export const {
  useFetchOwnersQuery,
  useAddNewOwnerMutation,
  useGetOwnerByIdQuery,
  useUpdateOwnerMutation,
  useDeleteOwnerMutation,
  useSearchOwnersQuery,
  useLinkOwnerMutation,
  useDelinkOwnerMutation,
} = ownersApi
