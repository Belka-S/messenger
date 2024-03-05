import { useSelector } from 'react-redux';

import * as selectors from '@/store/auth/authSelectors';

export const useAuth = () => {
  const user = useSelector(selectors.selectUser);

  const isLoggedIn = Boolean(user.accessToken);
  const isRefreshing = useSelector(selectors.selectIsRefreshing);
  const isLoading = useSelector(selectors.selectAuthIsLoading);
  const error = useSelector(selectors.selectAuthError);

  return { user, isLoggedIn, isRefreshing, isLoading, error };
};
