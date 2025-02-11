import { orderBurgerApi } from '@api';
import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  nanoid
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
type TNewOrderState = {
  isLoading: boolean;
  isError: boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};
const initialState: TNewOrderState = {
  isLoading: false,
  isError: false,
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};
export const orderBurger = createAsyncThunk(
  'newOrder/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  selectors: {
    getNewOrderData: createSelector(
      (state: TNewOrderState) => state.constructorItems,
      ({ bun, ingredients }) =>
        bun?._id
          ? [bun._id, ...ingredients.map((item) => item._id), bun._id]
          : []
    ),

    getNewOrderState: (state) => state
  },
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type !== 'bun') {
          const newIngredients = [...state.constructorItems.ingredients];
          newIngredients.push(action.payload);
          state.constructorItems.ingredients = newIngredients;
        } else {
          state.constructorItems.bun = action.payload;
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ index: number; offset: number }>
    ) => {
      const { index, offset } = action.payload;
      const arr = state.constructorItems.ingredients.slice();
      if (index + offset >= arr.length || index + offset < 0) {
        return state;
      }
      arr.splice(index + offset, 0, arr.splice(index, 1)[0]);
      state.constructorItems.ingredients = arr;
    },
    deleteIngredient: (state, action: PayloadAction<number>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (_, idx) => idx !== action.payload
        );
    },
    clearOrderConstructor: (state) => (state = initialState)
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = state.isLoading = true;
        state.isError = false;
        state.orderModalData = null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = state.isLoading = false;
        state.orderModalData = action.payload.order;
        // Очистка конструктора после получения подтверждения от сервера
        newOrderSlice.caseReducers.clearOrderConstructor(state);
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = state.isLoading = false;
        state.isError = true;
        state.orderModalData = null;
      });
  }
});
export const { getNewOrderData, getNewOrderState } = newOrderSlice.selectors;
export const {
  addIngredient,
  moveIngredient,
  deleteIngredient,
  clearOrderConstructor
} = newOrderSlice.actions;
export default newOrderSlice.reducer;
