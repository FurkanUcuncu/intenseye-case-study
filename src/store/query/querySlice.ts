import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISort } from '../../helpers/types';
import localStorageHelper from '../../helpers/LocalStorageHelper.ts';

interface QueryState {
    query: string;
    sort: ISort;
    currentPage: number;
    language: string;
}

const [storedValue, setStoredValue] = localStorageHelper('userChoices', {query: '', sort: {sort: '', direction: 'asc'}, page: 1, language: 'JavaScript'})

const initialState: QueryState = {
    query: storedValue.query,
    sort: storedValue.sort as ISort,
    currentPage: storedValue.page,
    language: storedValue.language,
};


const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
            setStoredValue({...storedValue, query: action.payload})
        },
        setSort: (state, action: PayloadAction<ISort>) => {
            state.sort = action.payload;
            setStoredValue({...storedValue, sort: action.payload})
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
            setStoredValue({...storedValue, page: action.payload})
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
            setStoredValue({...storedValue, language: action.payload});
        },
    },
});

export const { setQuery, setSort, setCurrentPage, setLanguage } = querySlice.actions;
export default querySlice.reducer;