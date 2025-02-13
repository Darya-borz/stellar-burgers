import { getCookie, deleteCookie } from '../../utils/cookie';
import userReducer, {
  getUserOrders,
  login,
  logout,
  register,
  updateUserData
} from './userSlice';

jest.mock('../../utils/cookie');

describe('userSlice test', () => {
  const initState = {
    email: "",
    isAuthChecked: false,
    isError: false,
    isLoading: false,
    name: "",
    orderRequest: false,
    orders: [],
    user: null,
  };

  beforeEach(() => {
    // Создание мока для localStorage с хранением значений
    interface StorageMock {
      [key: string]: string | null;
    }

    const storageMock = (() => {
      let store: StorageMock = {};
      return {
        clear: jest.fn(() => { store = {}; }),
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => { store[key] = value; }),
        removeItem: jest.fn((key: string) => { delete store[key]; }),
        key: jest.fn(),
        length: 0,
      };
    })();

    global.localStorage = storageMock;

    // Очистка всех моков перед каждым тестом
    jest.clearAllMocks();
  });

  test('register asyncThunk', () => {
    // pending
    expect(userReducer(undefined, { type: register.pending.type })).toEqual({
      ...initState,
      isLoading: true,
    });

    // fulfilled
    const payload = {
      email: 'email@example.com',
      name: 'user',
    };
    expect(
      userReducer(undefined, {
        type: register.fulfilled.type,
        payload: payload,
      })
    ).toEqual({
      ...initState,
      isAuthChecked: true,
      isLoading: false,
      user: payload,
    });

    // rejected
    expect(
      userReducer(undefined, {
        type: register.rejected.type,
      })
    ).toEqual({
      ...initState,
      isError: true,
      isLoading: false,
    });
  });

  test('login asyncThunk', () => {
    // pending
    expect(userReducer(undefined, { type: login.pending.type })).toEqual({
      ...initState,
      isLoading: true,
    });

    // fulfilled
    const payload = {
      email: 'email@example.com',
      name: 'user',
    };
    expect(
      userReducer(undefined, {
        type: login.fulfilled.type,
        payload: payload,
      })
    ).toEqual({
      ...initState,
      isAuthChecked: true,
      isLoading: false,
      user: payload,
    });

    // rejected
    expect(
      userReducer(undefined, {
        type: login.rejected.type,
      })
    ).toEqual({
      ...initState,
      isError: true,
      isLoading: false,
    });
  });

  test('updateUserData asyncThunk', () => {
    // fulfilled
    const payload = {
      user: {
        email: 'email@example.com',
        name: 'user'
      }
    };
    expect(
      userReducer(undefined, {
        type: updateUserData.fulfilled.type,
        payload: payload
      })
    ).toEqual({ ...initState, user: payload.user });
  });

  test('getUserOrders asyncThunk', () => {
    // pending
    expect(
      userReducer(undefined, { type: getUserOrders.pending.type })
    ).toEqual({ ...initState, orderRequest: true });

    // fulfilled
    const orders = [
      {
        _id: 123,
        status: 'Выполнен',
        name: 'Краторный био-марсианский бургер',
        createdAt: '',
        updatedAt: '',
        number: 12345,
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093c'
        ]
      }
    ];
    expect(
      userReducer(undefined, {
        type: getUserOrders.fulfilled.type,
        payload: orders
      })
    ).toEqual({ ...initState, orders: orders });

    // rejected
    expect(
      userReducer(undefined, {
        type: getUserOrders.rejected.type
      })
    ).toEqual({ ...initState });
  });

  test('logout asyncThunk', () => {
    // Mock localStorage and getCookie
    global.localStorage.setItem('refreshToken', 'fakeRefreshToken');
    (getCookie as jest.Mock).mockReturnValue('fakeAccessToken');

    // Simulate logout action
    userReducer(undefined, { type: logout.fulfilled.type });

    // Удаляем refreshToken из localStorage
    global.localStorage.removeItem('refreshToken');

    // Удаляем accessToken из куки
    (deleteCookie as jest.Mock)('accessToken');

    // Проверяем, что метод deleteCookie был вызван
    expect(deleteCookie).toHaveBeenCalledWith('accessToken');

    // Проверяем, что getCookie возвращает undefined после удаления
    (getCookie as jest.Mock).mockReturnValue(undefined);

    expect(global.localStorage.getItem('refreshToken')).toBeNull();
    expect(getCookie('accessToken')).toBeUndefined();
  });
});
