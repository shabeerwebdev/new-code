import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { getEnvironmentConfig } from '../../../../constants/env-constants'

const token = localStorage.getItem('token')

export const axiosBaseQuery = async ({ url, method, data, params, baseUrlKey }) => {
  const API_BASE_URL = getEnvironmentConfig()[baseUrlKey || 'node']
  const token = localStorage.getItem('token')
  const config: AxiosRequestConfig = {
    url: `${API_BASE_URL}${url}`,
    method,
    data,
    params,
    headers: {
      accept: 'application/json',
      correlationID: 's',
      traceTag: 's',
      Authorization: `Bearer  ${token}`,
      espsid: 22,
    },
  }

  try {
    const result = await axios(config)
    return { data: result.data }
  } catch (axiosError) {
    const err = axiosError
    return {
      error: {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
      },
    }
  }
}

export const transformApiResponse = (response) => {
  const hasError =
    response.StatusCode !== 200 ||
    response?.LogEntries.some((entry) => entry.Type.toLowerCase() === 'error')
    if (!hasError && response?.StatusCode === 500) {
      throw new Error('Server error, Please try again shortly!')
    }

  const errorMessage = response?.LogEntries[0]?.Message || ''

  console.log(errorMessage, 'errorMessage')

  if (hasError) {
    throw new Error(
      errorMessage.length > 150 || errorMessage.length < 5
        ? 'Something went wrong, please try again shortly!'
        : errorMessage
    )
  }

  return response.Data
}
