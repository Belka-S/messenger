import { createAsyncThunk } from '@reduxjs/toolkit';

import { IMsg } from '@/screens/HomePage';
import * as API from '@/servises/elementApi';

import { AppDispatch, RootState } from '../store';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();

export const fetchElementsThunk = createAsyncThunk(
  'elements/fetchElements',
  async (_, thunkAPI) => {
    try {
      return await API.fetchElements();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getElementThunk = createAsyncThunk(
  'elements/fetchElements',
  async (element: IMsg, thunkAPI) => {
    try {
      return await API.getElement(element);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addElementThunk = createAsyncThunk(
  'elements/addElement',
  async (element: IMsg, thunkAPI) => {
    try {
      return await API.addElement(element);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateElementThunk = createAsyncThunk(
  'elements/updateElement',
  async (element: IMsg, thunkAPI) => {
    try {
      return await API.updateElement(element);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteElementThunk = createAsyncThunk(
  'elements/deleteElement',
  async (element: IMsg, thunkAPI) => {
    try {
      return await API.deleteElement(element);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
