import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {IProductSort} from '@helpers/types';

interface QueryState {
    query: string;
    sort: IProductSort;
    currentPage: number;
}

const initialState: QueryState = {
    query: '',
    sort: {
        sort: '',
        direction: 'asc'
    },
    currentPage: 1
};


const productSlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
        setQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSort: (state, action: PayloadAction<IProductSort>) => {
            state.sort = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        }
    },
});

export const { setQuery, setSort, setCurrentPage } = productSlice.actions;
export default productSlice.reducer;