import { configureStore } from '@reduxjs/toolkit';
import queryReducer from './query/querySlice';
import productReducer from './product/productSlice';
import {repositoryApi} from '@store/services/repositoryService';
import {productApi} from '@store/services/productService';

export const store = configureStore({
    reducer: {
        query: queryReducer,
        product: productReducer,
        [repositoryApi.reducerPath]: repositoryApi.reducer,
        [productApi.reducerPath]: productApi.reducer
    },
    middleware: (gDM) => gDM().concat(repositoryApi.middleware, productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;