import React, {useState, useCallback, useEffect} from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useDebounce } from '../../hooks/UseDebounce';
import { fetchRepositories } from '../../services/RepositoryService';
import { ISort, ISortingKind } from '../../helpers/types';
import dashboardStyles from '../../assets/styles/pages/Dashboard/Dashboard.module.css';
import tableStyles from '../../assets/styles/components/Table/Table.module.css';
import SearchInput from '../../components/SearchInput/SearchInput.tsx';
import LanguageFilter from '../../components/Table/LanguageFilter.tsx';
import TableHeader from '../../components/Table/TableHeader.tsx';
import TableBody from '../../components/Table/TableBody.tsx';
import Pagination from '../../components/Table/Pagination.tsx';
import useLocalStorage from '../../hooks/UseLocalStorage.tsx';

/**
 * Dashboard component that displays repositories with sorting, filtering, and pagination options.
 * It fetches repository data from an API based on user input for query, language, and sorting.
 * @returns JSX element rendering the dashboard UI.
 */
const Dashboard: React.FC = () => {
    /**
     * Local storage hook for storing user choices like search query, sorting, page, and language.
     * Default value is an object with keys: query, sort, page, and language.
     */
    const [storedValue, setStoredValue] = useLocalStorage('userChoices', {query: '', sort: {sort: '', direction: 'asc'}, page: 1, language: 'JavaScript'})

    // State hooks for handling user input
    const [query, setQuery] = useState<string>(storedValue.query);
    const [sort, setSort] = useState<ISort>(storedValue.sort as ISort);
    const [currentPage, setCurrentPage] = useState<number>(storedValue.page);
    const [language, setLanguage] = useState<string>(storedValue.language);

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
    const handleSorting = useCallback((sort: ISortingKind) => {
        setSort(prevState => {
            if (prevState.direction === 'desc') return { direction: 'asc', sort };
            if (prevState.direction === 'asc') return { direction: 'desc', sort };
            return { ...prevState };
        });
    }, []);

    /**
     * React Query hook to fetch repository data from the API based on the current query, language, sorting, and page.
     */
    const { data, isLoading, isFetching, error } = useQuery({
        queryKey: ['repos', debouncedQuery, language, sort.sort, sort.direction, currentPage],
        queryFn: () => fetchRepositories(query.trim(), sort, currentPage, language),
        placeholderData: keepPreviousData
    });

    /**
     * Calculates the total number of pages based on the total count of repositories.
     * @returns The number of pages needed for pagination.
     */
    const totalPages = data?.total_count ? Math.ceil(data.total_count / 10) : 0;

    /**
     * Updates the localStorage with the latest user choices whenever the state changes.
     */
    useEffect(() => {
        setStoredValue({ query, sort, page: currentPage, language });
    }, [query, sort, currentPage, language]);
    
    return (
        <div data-testid='dashboard-container' className={dashboardStyles.container}>
            <div className={dashboardStyles.searchContainer}>
                <SearchInput isFetching={isFetching} query={query} onQueryChange={setQuery} />
                <LanguageFilter
                    selectedLanguage={language}
                    isFetching={isFetching}
                    onLanguageChange={setLanguage}
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
                currentPage={currentPage}
                totalPages={totalPages}
                isFetching={isFetching}
                onPageChange={setCurrentPage}
                range={2}
                jumpSize={10}
            />
        </div>
    );
};

export default Dashboard;