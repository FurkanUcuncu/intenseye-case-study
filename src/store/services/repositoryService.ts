import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const repositoryApi = createApi({
    reducerPath: 'repositoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com' }),
    endpoints: (build) => ({
        getRepositories: build.query({
            query: ({ query, sort, currentPage, language }) => ({
                url: '/search/repositories',
                params: {
                    q: `${query.trim()} language:${language}`,
                    ...sort,
                    page: currentPage,
                    per_page: 10,
                },
            }),
            keepUnusedDataFor: 360
        }),
    }),
});

export const { useGetRepositoriesQuery } = repositoryApi;
