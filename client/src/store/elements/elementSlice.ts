import {
  combineReducers,
  createSlice,
  isAnyOf,
  PayloadAction,
} from '@reduxjs/toolkit';

import { IMsg } from '@/screens/HomePage';
import * as TNK from '@/store/elements/elementThunks';

// import { IUserInitialState, userInitialState } from './initialState';

const thunkArr = [
  TNK.fetchElementsThunk,
  TNK.getElementThunk,
  TNK.addElementThunk,
  TNK.updateElementThunk,
  TNK.deleteElementThunk,
];

const fn = (type: 'pending' | 'fulfilled' | 'rejected') =>
  thunkArr.map(el => {
    switch (type) {
      case 'pending':
        return el.pending;
      case 'rejected':
        return el.rejected;
      default:
        return el.fulfilled;
    }
  });

const handleFetchElements = (state: IMsg[], action: PayloadAction<any>) => {
  return action.payload.result.elements;
};

const handleGetElement = (state: IMsg[], action: PayloadAction<any>) => {
  state.unshift(action.payload.result.element);
};

const handleAddElement = (state: IMsg[], action: PayloadAction<any>) => {
  state.push(action.payload);
};

const handleUpdateElement = (state: IMsg[], action: PayloadAction<any>) => {
  const index = state.findIndex(el => el.id === action.payload.id);
  state.splice(index, 1, action.payload);
};

const handleDeleteElement = (state: IMsg[], action: PayloadAction<any>) => {
  const { id } = action.payload.result;
  state.filter(el => !id.includes(el.id));
};

// fulfilled slice

// elements
const elementItemsSlice = createSlice({
  name: 'items',
  initialState: [],
  reducers: {
    addElement: handleAddElement,
    updateElement: handleUpdateElement,
  },
  extraReducers: builder => {
    builder
      .addCase(TNK.fetchElementsThunk.fulfilled, handleFetchElements)
      .addCase(TNK.deleteElementThunk.fulfilled, handleDeleteElement);
    // .addCase(TNK.getElementThunk.fulfilled, handleGetElement)
    // .addCase(TNK.addElementThunk.fulfilled, handleAddElement)
    // .addCase(TNK.updateElementThunk.fulfilled, handleUpdateElement)
  },
});

// fulfilled filter slice
const elementFilterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setElementFilter: (_, action) => action.payload,
  },
});

// loading slice
const elementIsLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => true)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), () => false);
  },
});

// error slice
const elementErrorSlice = createSlice({
  name: 'error',
  initialState: false,
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(isAnyOf(...fn('pending')), () => false)
      .addMatcher(isAnyOf(...fn('fulfilled')), () => false)
      .addMatcher(isAnyOf(...fn('rejected')), (_, action) => action.payload);
  },
});

export const elementsReducer = combineReducers({
  items: elementItemsSlice.reducer,
  filter: elementFilterSlice.reducer,

  isLoading: elementIsLoadingSlice.reducer,
  error: elementErrorSlice.reducer,
});

export const { addElement, updateElement } = elementItemsSlice.actions;
export const { setElementFilter } = elementFilterSlice.actions;
