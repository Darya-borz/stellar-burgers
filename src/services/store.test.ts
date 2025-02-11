import { rootReducer } from './store';
import ingredientsReducer from './reducers/ingredientsSlice';
import newOrderReducer from './reducers/newOrderSlice';
import feedReducer from './reducers/feedSlice';
import userReducer from './reducers/userSlice';

describe('store test', () => {
  test('rootReducer initialValue', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual({
      ingredients: ingredientsReducer(undefined, { type: 'unknown' }),
      newOrder: newOrderReducer(undefined, { type: 'unknown' }),
      feed: feedReducer(undefined, { type: 'unknown' }),
      user: userReducer(undefined, { type: 'unknown' })
    });
  });
});
