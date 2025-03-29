import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './query/querySlice';
import {repositoryApi} from '@store/services/repositoryService.ts';

export const store = configureStore({
    reducer: {
        query: queryReducer,
        [repositoryApi.reducerPath]: repositoryApi.reducer
    },
    middleware: (gDM) => gDM().concat(repositoryApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;