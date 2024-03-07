import { useSelector } from 'react-redux';

import * as selectors from '@/store/elements/elementSelectors';

export const useElements = () => {
  const msgHistory = useSelector(selectors.selectElements);
  const elementFilter = useSelector(selectors.selectElementFilter);

  const error = useSelector(selectors.selectError);
  const isLoading = useSelector(selectors.selectIsLoading);

  return {
    msgHistory,
    elementFilter,

    error,
    isLoading,
  };
};
