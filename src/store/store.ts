import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './query/querySlice.ts';
import repositoryReducer from './repos/repositorySlice.ts';

export const store = configureStore({
    reducer: {
        repository: repositoryReducer,
        query: queryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;