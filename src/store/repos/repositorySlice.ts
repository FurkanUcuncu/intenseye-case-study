import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchRepositories } from '@services/RepositoryService';
import { RootState } from '../store';
import {IRepository, ISort} from '@helpers/types';

interface RepositoryState {
    items: IRepository[];
    totalCount: number;
    isLoading: boolean;
    error: string | null;
}

// Initial state
const initialState: RepositoryState = {
    items: [],
    totalCount: 0,
    isLoading: false,
    error: null,
};

// Async thunk to fetch repositories
export const fetchRepositoriesAsync = createAsyncThunk(
    'repositories/fetchRepositories',
    async ({ query, sort, currentPage, language }: { query: string; sort: ISort; currentPage: number; language: string }, thunkAPI) => {
        try {
            console.log('are you coming here')
            return await fetchRepositories(query, sort, currentPage, language);
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const repositorySlice = createSlice({
    name: 'repositories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRepositoriesAsync.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchRepositoriesAsync.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.items;
                state.totalCount = action.payload.total_count;
            })
            .addCase(fetchRepositoriesAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

// Selectors
export const selectRepositories = (state: RootState) => state.repository.items;
export const selectTotalCount = (state: RootState) => state.repository.totalCount;
export const selectIsLoading = (state: RootState) => state.repository.isLoading;
export const selectError = (state: RootState) => state.repository.error;

export default repositorySlice.reducer;