describe('Конструктор бургеров', () => {
    beforeEach(() => {
      cy.intercept('api/ingredients', { fixture: 'ingredients.json' });
      cy.visit('http://localhost:4000');
    });
    it('Добавление ингредиентов', () => {
      // проверка на отсутствие ингредиентов в конструкторе изначально
      cy.get('[data-cy=burger-constructor__top_bun]')
        .should('have.length', 1)
        .contains(/Выберите булки/i);
      cy.get('[data-cy=burger-constructor__list]').contains(/Выберите начинку/i);
      cy.get('[data-cy=burger-constructor__bottom_bun]')
        .should('have.length', 1)
        .contains(/Выберите булки/i);
      // булка
      cy.get('[data-cy=burger-constructor__ingredient]')
        .filter(':contains("Краторная булка N-200i")')
        .contains(/Добавить/i)
        .click();
      cy.get('[data-cy=burger-constructor__top_bun]')
        .should('have.length', 1)
        .contains(/Краторная булка N-200i/i);
      cy.get('[data-cy=burger-constructor__bottom_bun]')
        .should('have.length', 1)
        .contains(/Краторная булка N-200i/i);
      // начинка
      cy.get('[data-cy=burger-constructor__ingredient]')
        .filter(':contains("Биокотлета из марсианской Магнолии")')
        .contains(/Добавить/i)
        .click();
      cy.get('[data-cy=burger-constructor__list]')
        .children()
        .should('have.length', 1)
        .contains(/Биокотлета из марсианской Магнолии/i);
      cy.get('[data-cy=burger-constructor__ingredient]')
        .filter(':contains("Мясо бессмертных моллюсков Protostomia")')
        .contains(/Добавить/i)
        .click();
      cy.get('[data-cy=burger-constructor__list]')
        .children()
        .should('have.length', 2)
        .contains(/Мясо бессмертных моллюсков Protostomia/i);
    }); // добавление ингредиентов
    it('Создание заказа', () => {
      // моковые данные
      cy.intercept('api/auth/login', { fixture: 'userLogin.json' });
      cy.intercept('api/orders', { fixture: 'newOrderResponse.json' });
      // добавление игредиентов
      cy.get('[data-cy=burger-constructor__ingredient]')
        .filter(':contains("Краторная булка N-200i")')
        .contains(/Добавить/i)
        .click();
      cy.get('[data-cy=burger-constructor__ingredient]')
        .filter(':contains("Биокотлета из марсианской Магнолии")')
        .contains(/Добавить/i)
        .click();
      // клик по кнопке создания
      cy.get('[data-cy=burger-constructor__section]')
        .contains(/Оформить заказ/i)
        .click();
      // клик для входа в аккаунт
      cy.get('button').contains(/Войти/i).click();
      // проверка модального окна
      cy.get('[data-cy=modal]')
        .get('[data-cy=newOrder-number]')
        .contains(/12345/i);
      // закрытие
      cy.get('body').type('{esc}');
      // проверка
      cy.get('[data-cy=modal]').should('not.exist');
      // проверка очистки конструктора
      cy.get('[data-cy=burger-constructor__top_bun]')
        .should('have.length', 1)
        .contains(/Выберите булки/i);
      cy.get('[data-cy=burger-constructor__list]').contains(/Выберите начинку/i);
      cy.get('[data-cy=burger-constructor__bottom_bun]')
        .should('have.length', 1)
        .contains(/Выберите булки/i);
    }); // Создание заказа
    it('Открытие модального окна', () => {
      // проверяем что нет модалок
      cy.get('[data-cy=modal]').should('not.exist');
      // открываем
      cy.get('[data-cy=burger-constructor__ingredient]').eq(0).click();
      // проверяем наличие
      cy.get('[data-cy=modal]');
    }); // Открытие модального окна
    it('Закрытие модального окна на крестик', () => {
      // открываем
      cy.get('[data-cy=burger-constructor__ingredient]').eq(0).click();
      // проверяем наличие
      cy.get('[data-cy=modal]');
      // Закрытие
      cy.get('[data-cy=modal__close-button]').eq(0).click();
      // проверяем что закрылось
      cy.get('[data-cy=modal]').should('not.exist');
    }); // Закрытие модального окна на крестик
    it('Закрытие модального окна на Esc', () => {
      // открываем
      cy.get('[data-cy=burger-constructor__ingredient]').eq(0).click();
      // проверяем наличие
      cy.get('[data-cy=modal]');
      // нажатие на крестик
      cy.get('body').type('{esc}');
      // проверка
      cy.get('[data-cy=modal]').should('not.exist');
    }); // Закрытие модального окна на Esc
    it('Закрытие модального окна по клику на оверлей', () => {
      // открываем
      cy.get('[data-cy=burger-constructor__ingredient]').eq(0).click();
      // проверяем наличие
      cy.get('[data-cy=modal]');
      /// нажатие на крестик
      cy.get('[data-cy=modal-overlay]').eq(0).click({ force: true });
      // проверка
      cy.get('[data-cy=modal]').should('not.exist');
    }); // Закрытие модального окна по клику на оверлей
  });