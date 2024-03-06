import { useSelector } from 'react-redux';

import * as selectors from '@/store/auth/authSelectors';

export const useAuth = () => {
  const user = useSelector(selectors.selectUser);
  const allUsers = useSelector(selectors.selectAllUsers);

  const isAuth = Boolean(user.accessToken);
  const isRefreshing = useSelector(selectors.selectIsRefreshing);
  const isLoading = useSelector(selectors.selectAuthIsLoading);
  const error = useSelector(selectors.selectAuthError);

  return { user, allUsers, isAuth, isRefreshing, isLoading, error };
};
