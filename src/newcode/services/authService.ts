import axios, { AxiosError } from "axios";
import { getEnvironmentConfig } from "../../constants/env-constants";

interface AxiosBaseQueryArgs {
  url: string;
  method: string;
  data?: any;
  params?: any;
  baseUrlKey?: "hub" | "node";
}

const getToken = () => "d39665f6-6a4c-4101-a9b7-1a58a423fa09";

export const axiosBaseQuery = async ({
  url,
  method,
  data,
  params,
  baseUrlKey = "node",
}: AxiosBaseQueryArgs) => {
  const token = getToken();
  const API_BASE_URL = getEnvironmentConfig()[baseUrlKey];

  if (!token) {
    throw new Error("Authorization token is missing");
  }

  const config = {
    url: `${API_BASE_URL}${url}`,
    method,
    data,
    params,
    headers: {
      accept: "application/json",
      correlationID: "some-correlation-id",
      traceTag: "some-trace-tag",
      Authorization: `Bearer ${token}`,
      espsid: 22,
    },
  };

  try {
    const result = await axios(config);
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    return {
      error: {
        status: err.response?.status || 500,
        data: err.response?.data || err.message,
      },
    };
  }
};

export const transformApiResponse = (response: {  
  StatusCode: number;
  Data: any;
  LogEntries: any;
}) => {
  if (!response?.LogEntries || !Array.isArray(response.LogEntries)) {
    throw new Error(
      "Invalid response format: LogEntries is missing or not an array"
    );
  }

  const hasError =
    response.StatusCode !== 200 ||
    response?.LogEntries.some(
      (entry: { Type: string }) => entry.Type.toLowerCase() === "error"
    );

  if (response.StatusCode === 500) {
    throw new Error("Server error, please try again shortly!");
  }

  const errorMessage = response?.LogEntries[0]?.Message || "";

  if (hasError) {
    const formattedMessage =
      errorMessage.length > 150 || errorMessage.length < 5
        ? "Something went wrong, please try again shortly!"
        : errorMessage;
    throw new Error(formattedMessage);
  }

  return response.Data;
};
