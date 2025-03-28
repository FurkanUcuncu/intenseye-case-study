import React, {useCallback} from 'react';
import {keepPreviousData, useQuery, useQueryClient} from '@tanstack/react-query';
import { useDebounce } from '../../hooks/UseDebounce';
import { fetchRepositories } from '../../services/RepositoryService';
import { ISort } from '../../helpers/types';
import dashboardStyles from '../../assets/styles/pages/Dashboard/Dashboard.module.css';
import tableStyles from '../../assets/styles/components/Table/Table.module.css';
import SearchInput from '../../components/SearchInput/SearchInput';
import LanguageFilter from '../../components/Table/LanguageFilter';
import TableHeader from '../../components/Table/TableHeader';
import TableBody from '../../components/Table/TableBody';
import Pagination from '../../components/Table/Pagination';
import {RootState} from '../../store/store';
import {useAppDispatch, useAppSelector} from '../../hooks/ReduxCall';
import {setSort} from '../../store/query/querySlice';

/**
 * Dashboard component that displays repositories with sorting, filtering, and pagination options.
 * It fetches repository data from an API based on user input for query, language, and sorting.
 * @returns JSX element rendering the dashboard UI.
 */
const Dashboard: React.FC = () => {
    const queryClient = useQueryClient();
    const dispatch = useAppDispatch();

    // Selectors from Redux store
    const {query, sort, currentPage, language} = useAppSelector((state: RootState) => state?.query);
    /**
     * Local storage hook for storing user choices like search query, sorting, page, and language.
     * Default value is an object with keys: query, sort, page, and language.
     */

    /**
     * Debounced version of the query state to avoid multiple API calls during typing.
     * @param query - The search term inputted by the user.
     */
    const debouncedQuery = useDebounce(query, 500);

    /**
     * Handle sorting when user clicks on sort buttons.
     * This updates the sort state
     * @param sort - The value for the sorting parameter (e.g., 'stars').
     */
    const handleSorting = useCallback((sortType: string) => {
        dispatch(setSort({
            sort: sortType,
            direction: sort.direction === 'asc' ? 'desc' : 'asc',
        } as ISort));
        queryClient.invalidateQueries({ queryKey: ['repos'] });
    }, [dispatch, sort, queryClient]);

    /**
     * React Query hook to fetch repository data from the API based on the current query, language, sorting, and page.
     */
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['repos', debouncedQuery, language, sort.sort, sort.direction, currentPage],
        queryFn: () => fetchRepositories(query.trim(), sort, currentPage, language),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    });
    
    /**
     * Calculates the total number of pages based on the total count of repositories.
     * @returns The number of pages needed for pagination.
     */
    const totalPages = data?.total_count ? Math.ceil(data.total_count / 10) : 0;
    
    return (
        <div data-testid='dashboard-container' className={dashboardStyles.container}>
            <div className={dashboardStyles.searchContainer}>
                <SearchInput isFetching={isFetching} />
                <LanguageFilter
                    isFetching={isFetching}
                />
            </div>
            <div className={dashboardStyles.tableWrapper}>
                <table className={tableStyles.table}>
                    <TableHeader sort={sort} onSortChange={handleSorting} />
                    <tbody data-testid='table-body'>
                        <TableBody isLoading={isLoading || isFetching} error={error} repos={data?.items || []} />
                    </tbody>
                </table>
            </div>
            <Pagination
                totalPages={totalPages}
                isFetching={isFetching}
                range={2}
                jumpSize={10}
            />
        </div>
    );
};

export default Dashboard;