import {configureStore} from '@reduxjs/toolkit'
import navReducer from './screens/slices/navSlice';

export const store = configureStore({
    reducer: {
        nav: navReducer,
    },
});
    