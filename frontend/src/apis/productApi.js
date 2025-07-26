import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Product from "../../../backend/models/Product";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (Product) => ({
        url: "/api/product/create",
        method: "POST",
        body: Product,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
