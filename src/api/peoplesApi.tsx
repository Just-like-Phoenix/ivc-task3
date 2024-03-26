import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Peoples } from "../types/Peoples";

// Define a service using a base URL and expected endpoints
export const peoplesApi = createApi({
  reducerPath: "peoplesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://softwium.com/api/" }),
  endpoints: (builder) => ({
    getPeoples: builder.query<Peoples, void>({
      query: () => `peoples`,
    }),
  }),
});

export const { useGetPeoplesQuery } = peoplesApi;
