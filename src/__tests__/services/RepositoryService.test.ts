import axios from 'axios';
import { vi } from 'vitest';
import { fetchRepositories } from '../../services/RepositoryService.ts';
import { ISort } from '../../helpers/types.ts';

// Mocking axios
vi.mock('axios');

describe('fetchRepositories', () => {
    it('fetches repositories successfully', async () => {
        const mockData = {
            total_count: 100,
            items: [{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }],
        };

        vi.mocked(axios.get).mockResolvedValue({ data: mockData });

        const query = 'react';
        const language = 'JavaScript';
        const sort: ISort = { sort: 'stars', direction: 'desc' };
        const currentPage = 1;

        const data = await fetchRepositories(query, sort, currentPage, language);

        expect(data).toEqual(mockData);
        expect(axios.get).toHaveBeenCalledWith('https://api.github.com/search/repositories', {
            params: { q: `${query} language:${language}`, ...sort, page: currentPage, per_page: 10 },
        });
    });

    it('handles errors correctly', async () => {
        const mockError = new Error('Network Error');

        vi.mocked(axios.get).mockRejectedValue(mockError);

        const query = 'react';
        const language = 'JavaScript';
        const sort: ISort = { sort: 'stars', direction: 'desc' };
        const currentPage = 1;

        await expect(fetchRepositories(query, sort, currentPage, language)).rejects.toThrow('Network Error');
    });
});
