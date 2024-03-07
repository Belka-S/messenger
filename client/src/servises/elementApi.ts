import { IMsg } from '@/screens/HomePage';

import { apiClient } from './apiClient';

export const fetchElements = async () => {
  const { data } = await apiClient.get('/elements');
  return data;
};

export const getElement = async (element: IMsg) => {
  const { id } = element;
  const { data } = await apiClient.get(`/elements/${id}`);
  return data;
};

export const addElement = async (element: IMsg) => {
  const { data } = await apiClient.post('/elements', element);
  return data;
};

export const updateElement = async (element: IMsg) => {
  const { id } = element;
  const { data } = await apiClient.patch(`/elements/${id}`, element);
  return data;
};

export const deleteElement = async (element: IMsg) => {
  const { id } = element;
  const { data } = await apiClient.delete(`/elements/${id}`);
  return data;
};
