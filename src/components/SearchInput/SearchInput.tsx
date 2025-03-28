import React from 'react';
import searchInputStyles from '../../assets/styles/components/SearchInput/SearchInput.module.css';
import {SearchInputProps} from '../../helpers/types.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/ReduxCall.ts';
import {setQuery} from '../../store/query/querySlice.ts';

/**
 * SearchInput component renders an input field for searching repositories.
 * It allows users to type in a query and triggers a change event to update the query state.
 *
 * @param {Object} props - Component props.
 * @param {boolean} props.isFetching - Flag to indicate whether data is being fetched. If true, the input is disabled.
 *
 * @returns {JSX.Element} The search input field with a placeholder and dynamic state handling.
 */
const SearchInput = ({ isFetching }: SearchInputProps): React.JSX.Element => {
    console.log('rendering search input');
    const dispatch = useAppDispatch();
    const {query} = useAppSelector(state => state?.query);
    const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setQuery(event.target.value));
    }
    return (
        <input
            data-testid="search-input"
            className={searchInputStyles.searchInput}
            disabled={isFetching}
            type="text"
            placeholder="Search repositories..."
            value={query}
            onChange={onQueryChange}
        />
    );
};

export default SearchInput;