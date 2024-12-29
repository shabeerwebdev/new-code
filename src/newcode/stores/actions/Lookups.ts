import { createApi } from '@reduxjs/toolkit/query/react'
import {
  axiosBaseQuery,
  transformApiResponse,
} from './services/user-auth-service'

export const lookups = createApi({
  reducerPath: 'cacheApi',
  baseQuery: axiosBaseQuery,
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: ({ shape = 'TREE', WithFilter = false, Filter = 50 }) => ({
        url: `/Lookups/Countries?shape=${shape}&WithFilter=${WithFilter}&Filter=${Filter}`,
        method: 'GET',
        baseUrlKey: 'hub',
      }),
      transformResponse: (response: {
        StatusCode: number
        Data: any[]
        LogEntries: any[]
      }) => transformApiResponse(response),
      refetchOnMountOrArgChange: true,
    })
  }),
})

export const { useGetCountriesQuery } = lookups