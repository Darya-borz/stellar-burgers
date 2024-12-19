import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchFeed, getFeedState } from '../../services/reducers/feedSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const { isLoading, orders } = useSelector(getFeedState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  /*if (!orders.length) {
    return <Preloader />;
  }*/
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <FeedUI orders={orders} handleGetFeeds={() => {}} />
      )}
    </>
  );
};
