import { createAsyncThunk } from '@reduxjs/toolkit';

import * as API from '@/servises/userApi';

import { AppDispatch, RootState } from '../store';

const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: string;
  extra: { s: string; n: number };
}>();

export const registerThunk = createAppAsyncThunk(
  'auth/register',
  async (credentials: API.Credentials, thunkAPI) => {
    try {
      return await API.register(credentials);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAppAsyncThunk(
  'auth/login',
  async (credentials: API.Credentials, thunkAPI) => {
    try {
      return await API.login(credentials);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAppAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      return await API.logout();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const verifyEmailThunk = createAppAsyncThunk(
  'auth/verify',
  async (credentials: API.Credentials, thunkAPI) => {
    try {
      return await API.verifyEmail(credentials);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const forgotPassThunk = createAppAsyncThunk(
  'auth/forgot',
  async (credentials: API.Credentials, thunkAPI) => {
    try {
      return await API.forgotPass(credentials);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const resetPassThunk = createAppAsyncThunk(
  'auth/reset',
  async (credentials: API.Credentials, thunkAPI) => {
    try {
      return await API.resetPass(credentials);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const refreshUserThunk = createAppAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.user.accessToken;
    try {
      return await API.refreshUser(persistedToken ?? '');
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUserThunk = createAppAsyncThunk(
  'users/update',
  async (credentials: API.Credentials, thunkAPI) => {
    try {
      return await API.updateUser(credentials);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteUserThunk = createAppAsyncThunk(
  'users/delete',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.accessToken;
    try {
      return await API.deleteUser();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getAllUsersThunk = createAppAsyncThunk(
  'users/all',
  async (_, thunkAPI) => {
    try {
      return await API.getAllUsers();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
