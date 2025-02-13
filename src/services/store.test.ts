import { rootReducer } from './store';
import ingredientsReducer, { initialState as ingredientsInitialState } from './reducers/ingredientsSlice';
import newOrderReducer, { initialState as newOrderInitialState } from './reducers/newOrderSlice';
import feedReducer, { initialState as feedInitialState } from './reducers/feedSlice';
import userReducer, { initialState as userInitialState } from './reducers/userSlice';

describe('store test', () => {
  test('rootReducer initialValue', () => {
    const initialState = {
      ingredients: ingredientsInitialState,
      newOrder: newOrderInitialState,
      feed: feedInitialState,
      user: userInitialState
    };

    expect(rootReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });
});
