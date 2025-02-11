import { render, screen } from '@testing-library/react';
import TableBody from '../../../components/Table/TableBody';
import { IRepository } from '../../../helpers/types';
import {AxiosError, InternalAxiosRequestConfig} from 'axios';

describe('TableBody Component', () => {
    it('displays loader when isLoading is true', () => {
        render(<TableBody isLoading={true} error={null} repos={[]} />);
        expect(screen.getByTestId('loader')).toBeInTheDocument();
    });

    it('displays an error message when error is present', () => {
        render(<TableBody isLoading={false} error={'Something went wrong'} repos={[]} />);
        expect(screen.getByTestId('table-fetch-error')).toHaveTextContent('An unknown error occurred');
    });

    it('displays AxiosError message when error is an AxiosError', () => {
        const mockAxiosError = new AxiosError(
            'Request failed',
            '500',
            {} as InternalAxiosRequestConfig, // Provide a mock request config
            undefined,
            {
                data: { message: 'API limit exceeded' },
                status: 500,
                statusText: 'Internal Server Error',
                headers: {}, // Required property
                config: {} as InternalAxiosRequestConfig, // Required property
            }
        );

        render(<TableBody isLoading={false} error={mockAxiosError} repos={[]} />);
        expect(screen.getByTestId('table-fetch-error')).toHaveTextContent('API limit exceeded');
    });

    it('displays "No repositories found" message when repos list is empty', () => {
        render(<TableBody isLoading={false} error={null} repos={[]} />);
        expect(screen.getByTestId('table-not-found')).toHaveTextContent('No repositories found');
    });

    it('renders a list of repositories correctly', () => {
        const mockRepos: IRepository[] = [
            {
                id: 1,
                name: 'Test Repo 1',
                owner: { login: 'user1' },
                description: 'Repository 1',
                stargazers_count: 44,
                forks: 50,
                updated_at: '2024-02-09T12:00:00Z'
            },
            {
                id: 2,
                name: 'test',
                owner: { login: 'user2' },
                description: 'Repository 2',
                stargazers_count: 200,
                forks: 33,
                updated_at: '2024-03-09T12:00:00Z'
            },
        ];

        render(<TableBody isLoading={false} error={null} repos={mockRepos} />);

        mockRepos.forEach((repo) => {
            expect(screen.getByTestId(repo.id)).toBeInTheDocument();
            expect(screen.getByText(repo.owner.login)).toBeInTheDocument();
            expect(screen.getByText(repo.description)).toBeInTheDocument();
            expect(screen.getByText(repo.stargazers_count)).toBeInTheDocument();
            expect(screen.getByText(repo.forks)).toBeInTheDocument();
            expect(screen.getByText(new Date(repo.updated_at).toLocaleDateString())).toBeInTheDocument();
        });
    });
});
