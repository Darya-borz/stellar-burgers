import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './reducers/ingredientsSlice';
import { newOrderSlice } from './reducers/newOrderSlice';
import { feedSlice } from './reducers/feedSlice';
import { userSlice } from './reducers/userSlice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

export const useAppDispatch: () => AppDispatch = () => dispatchHook();
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

//const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера
const rootReducer = combineSlices(
  ingredientsSlice,
  newOrderSlice,
  feedSlice,
  userSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
