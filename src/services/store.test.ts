
import { rootReducer } from './store';
import ingredientsReducer from './reducers/ingredientsSlice';
import newOrderReducer from './reducers/newOrderSlice';
import feedReducer from './reducers/feedSlice';
import userReducer from './reducers/userSlice';
describe('store test', () => {
  test('rootReducer initialValue', () => {
    expect(rootReducer(undefined, { type: 'unknown' })).toEqual({
      ingredientsReducer: ingredientsReducer(undefined, { type: 'unknown' }),
      newOrderReducer: newOrderReducer(undefined, { type: 'unknown' }),
      feedReducer: feedReducer(undefined, { type: 'unknown' }),
      userReducer: userReducer(undefined, { type: 'unknown' })
    });
  });
});