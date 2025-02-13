import {
  TLoginData,
  TRegisterData,
  getOrdersApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  getUserApi
} from '@api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createAction
} from '@reduxjs/toolkit';
import { TOrder, TUser } from '@utils-types';
import { deleteCookie, setCookie, getCookie } from '../../utils/cookie';
type TUserState = {
  isLoading: boolean;
  isError: boolean;
  user: TUser | null;
  orders: TOrder[];
  orderRequest: boolean;
  name: string;
  email: string;
  isAuthChecked: boolean;
};
export const initialState: TUserState = {
  isLoading: false,
  isError: false,
  name: '',
  email: '',
  user: null,
  orders: [],
  orderRequest: false,
  isAuthChecked: false
};
export const userApi = createAsyncThunk('user/userApi', getUserApi);
/*export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(userApi()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);*/

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .finally(() => dispatch(authChecked(true)));
    } else {
      dispatch(authChecked(true));
    }
  }
);
export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);
export const login = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  }
);
export const updateUserData = createAsyncThunk(
  'user/updateUserData',
  async (user: Partial<TRegisterData>) => await updateUserApi(user)
);
export const getUserOrders = createAsyncThunk(
  'user/getOrders',
  async () => await getOrdersApi()
);
export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();

  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUser: (state) => state.user,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUserState: (state) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(getUserOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.orderRequest = false;
        state.orders = [];
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.orders = [];
      });
  }
});
export const { getUser, getIsAuthChecked, getUserState } = userSlice.selectors;
export default userSlice.reducer;
export const { authChecked, setUser } = userSlice.actions;
