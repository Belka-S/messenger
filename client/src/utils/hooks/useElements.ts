import { useSelector } from 'react-redux';

import * as selectors from '@/store/elements/elementSelectors';

export const useElements = () => {
  const elements = useSelector(selectors.selectElements);
  const elementFilter = useSelector(selectors.selectElementFilter);

  const error = useSelector(selectors.selectError);
  const isLoading = useSelector(selectors.selectIsLoading);

  return {
    elements,
    elementFilter,

    error,
    isLoading,
  };
};
