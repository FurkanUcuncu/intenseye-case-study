import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './query/querySlice';
import repositoryReducer from './repos/repositorySlice';

export const store = configureStore({
    reducer: {
        repository: repositoryReducer,
        query: queryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;