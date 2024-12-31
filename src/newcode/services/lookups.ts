import { createApi } from '@reduxjs/toolkit/query/react'
import {
  axiosBaseQuery,
  transformApiResponse,
} from './authService'
import { getStatesData } from '../utilities'

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
      transformResponse: (response, meta, arg) => {
        const res = transformApiResponse(response)
        const finalData = getStatesData(res, 91)
        return finalData
      },
    })
  }),
  refetchOnMountOrArgChange: true,
})

export const { useGetCountriesQuery } = lookups