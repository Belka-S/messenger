import { PayloadAction } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import type { AppDispatch, AppStore, RootState } from './store';

type TypedDispatch<T> = ThunkDispatch<T, any, PayloadAction>;
export const useAppDispatch = () => useDispatch<TypedDispatch<RootState>>();
// export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

// ------------------------------------------------------------------ //

// export const useAppStore = useStore.withTypes<AppStore>();
// export const useAppSelector = useSelector.withTypes<RootState>();
// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
