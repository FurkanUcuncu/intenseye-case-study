import axios from 'axios';
import {IApiResponse, ISort} from '@helpers/types';

/**
 * Fetches repositories from GitHub API based on query, language, and sorting options.
 * @param query - The search term to find repositories.
 * @param sort - Sorting options (e.g., stars, forks).
 * @param currentPage - The page number for pagination.
 * @param language - The programming language to filter repositories by.
 * @returns The response data containing the list of repositories.
 */
export const fetchRepositories = async (query: string, sort: ISort, currentPage: number, language: string): Promise<IApiResponse>  => {
    const { data } = await axios.get<IApiResponse>('https://api.github.com/search/repositories', {
        params: { q: `${query} language:${language}`, ...sort, page: currentPage, per_page: 10 },
    });
    return data;
};