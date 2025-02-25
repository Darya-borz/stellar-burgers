import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  getIngredientsState
} from '../../services/reducers/ingredientsSlice';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const { ingredients, isLoading } = useSelector(getIngredientsState);
  const { id } = useParams();

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
  }, []);
  const ingredientData = ingredients.find((item) => item._id === id);
  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : ingredientData ? (
        <IngredientDetailsUI ingredientData={ingredientData} />
      ) : (
        <h3 className='text text_type_main-medium mt-2 mb-4'>
          Такого ингредиента нет
        </h3>
      )}
    </>
  );
};
