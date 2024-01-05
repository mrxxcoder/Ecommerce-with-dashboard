import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: ["Products"],
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: true,
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
  }),
  endpoints: (build) => ({
    getDashboardProducts: build.query({
      query: (arg) => {
        const { page } = arg;
        return {
          url: `/api/products?populate=thumbnail,category&pagination[page]=${page}&pagination[pageSize]=7`,
        };
      },
    }),
  }),
});

export const { useGetDashboardProductsQuery } = apiSlice;
