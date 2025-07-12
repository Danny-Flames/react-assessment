import { configureStore } from '@reduxjs/toolkit';
import formBuilderReducer from './formBuilderSlice';

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;