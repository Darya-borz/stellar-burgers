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
    test('orderBurger asyncThunk', () => {
      // pending
      expect(
        newOrderReducer(undefined, { type: orderBurger.pending.type })
      ).toEqual({ ...initState, isLoading: true, orderRequest: true });
      // fullfilled
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
    }); // orderBurger asyncThunk
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
          ingredients: [{ ...ingredient, id: ingredient._id }]
        }
      });
    }); // addIngredient
    test('moveIngredient', () => {
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        }
      ];
      const movedIngredientsLeftBound = [
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        },
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        }
      ];
      const movedIngredientsRightBound = [
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        }
      ];
      // корректный ввод смещения
      expect(
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          moveIngredient({ index: 0, offset: 1 })
        )
      ).toEqual({
        ...initState,
        constructorItems: { bun: null, ingredients: movedIngredientsLeftBound }
      });
      expect(
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          moveIngredient({ index: 2, offset: -1 })
        )
      ).toEqual({
        ...initState,
        constructorItems: { bun: null, ingredients: movedIngredientsRightBound }
      });
      // некорректный ввод
      // индекс элемента меньше 0
      expect(() => {
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          moveIngredient({ index: -1, offset: 1 })
        );
      }).toThrow(Error);
      // индекс элемента больше количества элементов
      expect(() => {
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          moveIngredient({ index: 3, offset: -1 })
        );
      }).toThrow(Error);
      // смещение меньше первого элемента (возвращает исходное состояние)
      expect(() => {
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          moveIngredient({ index: 0, offset: -1 })
        );
      }).toThrow(Error);
      // смещение больше последнего элемента (возвращает исходное состояние)
      expect(() => {
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          moveIngredient({ index: 2, offset: 1 })
        );
      }).toThrow(Error);
    }); // moveIngredient
    test('deleteIngredient', () => {
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        }
      ];
      const ingredientsLeftBoundDelete = [
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        }
      ];
      const ingredientsRightBoundDelete = [
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        }
      ];
      // корректный ввод
      expect(
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          deleteIngredient(0)
        )
      ).toEqual({
        ...initState,
        constructorItems: { bun: null, ingredients: ingredientsLeftBoundDelete }
      });
      expect(
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          deleteIngredient(2)
        )
      ).toEqual({
        ...initState,
        constructorItems: { bun: null, ingredients: ingredientsRightBoundDelete }
      });
      // некорректный ввод
      // выхрд за границы массива
      expect(() => {
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          deleteIngredient(-1)
        );
      }).toThrow(Error);
      expect(() => {
        newOrderReducer(
          {
            ...initState,
            constructorItems: { bun: null, ingredients: ingredients }
          },
          deleteIngredient(3)
        );
      }).toThrow(Error);
    }); // deleteIngredient
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
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-01-large.png',
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
            image_mobile:
              'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/meat-03-large.png',
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
    }); // getNewOrderData
  });