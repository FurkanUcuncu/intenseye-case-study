import React from 'react';
import searchInputStyles from '../../assets/styles/components/SearchInput/SearchInput.module.css';
import {SearchInputProps} from '../../helpers/types.ts';

/**
 * SearchInput component renders an input field for searching repositories.
 * It allows users to type in a query and triggers a change event to update the query state.
 *
 * @param {Object} props - Component props.
 * @param {string} props.query - The current search query.
 * @param {Function} props.onQueryChange - Callback function to handle changes to the search query. It accepts the updated query as a string.
 * @param {boolean} props.isFetching - Flag to indicate whether data is being fetched. If true, the input is disabled.
 *
 * @returns {JSX.Element} The search input field with a placeholder and dynamic state handling.
 */
const SearchInput = ({ isFetching, query, onQueryChange }: SearchInputProps): React.JSX.Element => {
    return (
        <input
            data-testid="search-input"
            className={searchInputStyles.searchInput}
            disabled={isFetching}
            type="text"
            placeholder="Search repositories..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
        />
    );
};

export default SearchInput;