import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
    endpoints: (build) => ({
        getProducts: build.query({
            query: ({ query, sort, currentPage }) => ({
                url: `/products/search?q=${query}&limit=10&skip=${(currentPage - 1) * 10}&sortBy=${sort.sort}&order=${sort.direction}`,
            }),
            keepUnusedDataFor: 360
        }),
    }),
});

export const { useGetProductsQuery } = productApi;
