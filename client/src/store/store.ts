import { applyMiddleware, compose, configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/authSlice';
import { elementsReducer } from './elements/elementSlice';

const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      elements: elementsReducer,
    },
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
