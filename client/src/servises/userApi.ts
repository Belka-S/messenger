import { apiClient, token } from './apiClient';

export type Credentials = {
  name?: string;
  email: string;
  password?: string;
  verificationCode?: string;
};

export const register = async (credentials: Credentials) => {
  const { data } = await apiClient.post('/auth/register', credentials);
  token.set(data.result.user.accessToken);
  return data;
};

export const login = async (credentials: Credentials) => {
  const { data } = await apiClient.post('/auth/login', credentials);
  token.set(data.result.user.accessToken);
  return data;
};

export const logout = async () => {
  const { data } = await apiClient.post('/auth/logout');
  token.unset();
  return data;
};

export const verifyEmail = async (credentials: Credentials) => {
  const { data } = await apiClient.post('/auth/verify', credentials);
  console.log('data: ', data);
  return data;
};

export const forgotPass = async (credentials: Credentials) => {
  const { data } = await apiClient.post('/auth/forgot', credentials);
  return data;
};

export const resetPass = async (credentials: Credentials) => {
  const { data } = await apiClient.post('/auth/reset', credentials);
  return data;
};

export const refreshUser = async (persistedToken: string) => {
  token.set(persistedToken);
  const { data } = await apiClient.get('/auth/refresh'); // users/refresh ????
  return data;
};

export const updateUser = async (credentials: Credentials) => {
  const { data } = await apiClient.patch('/users/update', credentials);
  return data;
};

export const deleteUser = async () => {
  const { data } = await apiClient.delete('/users/delete');
  return data;
};
