import newOrderReducer, {
  addIngredient,
  deleteIngredient,
  getNewOrderData,
  moveIngredient,
  orderBurger
} from './newOrderSlice';

describe('newOrderSlice test', () => {
  const initState = {
    isLoading: false,
    isError: false,
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null
  };

  const ingredients = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa093e',
      id: '643d69a5c3f7b9001cfa093e',
      name: 'Филе Люминесцентного тетраодонтимформа',
      type: 'main',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/meat-03.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      __v: 0
    }
  ];

  const initialState = {
    ...initState,
    constructorItems: { bun: null, ingredients: ingredients }
  };

  test('orderBurger asyncThunk', () => {
    // pending
    expect(
      newOrderReducer(undefined, { type: orderBurger.pending.type })
    ).toEqual({ ...initState, isLoading: true, orderRequest: true });

    // fulfilled
    const payload = {
      order: {
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
    };
    expect(
      newOrderReducer(undefined, {
        type: orderBurger.fulfilled.type,
        payload: payload
      })
    ).toEqual({ ...initState, orderModalData: payload.order });

    // rejected
    expect(
      newOrderReducer(undefined, {
        type: orderBurger.rejected.type
      })
    ).toEqual({ ...initState, isError: true });
  });

  test('addIngredient', () => {
    // булка
    const bun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0
    };
    expect(newOrderReducer(undefined, addIngredient(bun))).toEqual({
      ...initState,
      constructorItems: {
        bun: { ...bun, id: expect.any(String) },
        ingredients: []
      }
    });

    // не булка
    const ingredient = {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      __v: 0
    };
    expect(newOrderReducer(undefined, addIngredient(ingredient))).toEqual({
      ...initState,
      constructorItems: {
        bun: null,
        ingredients: [{ ...ingredient, id: expect.any(String) }]
      }
    });
  });

  test('moveIngredient', () => {
    // Перемещение ингредиента вперед
    const stateAfterMoveForward = newOrderReducer(initialState, moveIngredient({ index: 1, offset: 1 }));
    expect(stateAfterMoveForward.constructorItems.ingredients).toEqual([
      ingredients[0],
      ingredients[2],
      ingredients[1]
    ]);

    // Перемещение ингредиента назад
    const stateAfterMoveBackward = newOrderReducer(initialState, moveIngredient({ index: 1, offset: -1 }));
    expect(stateAfterMoveBackward.constructorItems.ingredients).toEqual([
      ingredients[1],
      ingredients[0],
      ingredients[2]
    ]);

    // Перемещение ингредиента за пределы массива (не должно изменять состояние)
    const stateAfterInvalidMove = newOrderReducer(initialState, moveIngredient({ index: 2, offset: 1 }));
    expect(stateAfterInvalidMove.constructorItems.ingredients).toEqual(ingredients);
  });


  test('deleteIngredient', () => {
    // delete ingredient at index 1
    expect(
      newOrderReducer(initialState, deleteIngredient(1))
    ).toEqual({
      ...initState,
      constructorItems: {
        bun: null,
        ingredients: [
          {
            _id: '643d69a5c3f7b9001cfa0941',
            id: '643d69a5c3f7b9001cfa0941',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0
          },
          {
            _id: '643d69a5c3f7b9001cfa0942',
            id: '643d69a5c3f7b9001cfa0942',
            name: 'Соус Spicy-X',
            type: 'sauce',
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
            __v: 0
          }
        ]
      }
    });
  });

  test('getNewOrderData', () => {
    const fakeConstructorItems = {
      bun: {
        _id: '643d69a5c3f7b9001cfa093c',
        id: 'fakeId',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      },
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa0941',
          id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        }
      ]
    };

    // результат с булкой
    expect(
      getNewOrderData({
        newOrder: { ...initState, constructorItems: fakeConstructorItems }
      })
    ).toEqual([
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093c'
    ]);

    // результат без булки
    expect(
      getNewOrderData({
        newOrder: {
          ...initState,
          constructorItems: {
            bun: null,
            ingredients: fakeConstructorItems.ingredients
          }
        }
      })
    ).toEqual([]);
  });
});
