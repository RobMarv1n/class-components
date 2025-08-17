import { configureStore } from '@reduxjs/toolkit';
import selectionReducer from './slices/selectionSlice';
import { baseService } from '../shared/api/service/base.service';

export const store = configureStore({
  reducer: {
    selection: selectionReducer,
    [baseService.reducerPath]: baseService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
