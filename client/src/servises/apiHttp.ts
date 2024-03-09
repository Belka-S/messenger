import axios from 'axios';
import { toast } from 'react-toastify';

import { authenticate } from '@/store/auth/authSlice';
import { store } from '@/store/store';

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.NEXT_PUBLIC_DEV_BACK_URL}/api`
    : `${process.env.NEXT_PUBLIC_PROD_BACK_URL}/api`;

// axios instance
const apiClient = axios.create({ baseURL });

// set token
const token = {
  set(token: string) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    apiClient.defaults.headers.common.Authorization = '';
  },
};

// response interseptor
apiClient.interceptors.response.use(
  response => {
    const { message, result } = response.data;

    !message?.includes('Found') && message && toast.success(message);

    !message &&
      result?.user?.verificationCode === 'google' &&
      toast.success(`Logged in: ${result.user.email}`);

    return response;
  },
  async error => {
    if (error.response.status === 401) {
      try {
        const { refreshToken } = store.getState().auth.user;
        if (!refreshToken) {
          return Promise.reject(error);
        }
        apiClient.defaults.headers.common['refreshtoken'] = refreshToken;
        error.config.headers.refreshtoken = `${refreshToken}`;

        const { data } = await apiClient.post('/auth/refresh');
        const { accessToken } = data.result.user;

        token.set(accessToken);
        await store.dispatch(authenticate(data));
        error.config.headers.Authorization = `Bearer ${accessToken}`;

        return apiClient(error.config);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    toast.error(error.response.data.message);
    return Promise.reject(error);
  },
);

export { apiClient, token };
