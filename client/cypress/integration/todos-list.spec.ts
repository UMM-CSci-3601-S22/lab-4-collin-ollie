import { TodosListPage } from '../support/todos-list.po';

const page = new TodosListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('should have the correct title', () => {
    page.getTodosTitle().should('have.text','Todos');
  });

  it('should type something in the owner filter and check it returned correct elements', () => {
    //filter by owner Blanche
    cy.get('#todos-owner-input').type('Blanche');

    //all the returned cards should contain owner Blanche
    page.getTodosCards().each($card => {
      cy.wrap($card).find('.todos-card-owner').should('have.text', 'Blanche');
    });

    page.getTodosCards().find('.todos-card-owner').each($owner =>
      expect($owner.text()).to.equal('Blanche')
      );
  });

  it('should type something in the category filter and check that it returned the right elements', () => {
    //filter category by 'homework'
    cy.get('#todos-category-input').type('homework');

    //all the todos cards should have category homework
    page.getTodosCards().find('.todos-card-category').each($card => {
      cy.wrap($card).should('have.text', 'homework');
    });
  });

  it('should type something partial in the category filter and check that it returned the right elements', () => {
    //filter category by 'home'
    cy.get('#todos-category-input').type('me');

    //go through each todo cards to check category homework, and video games
    page.getTodosCards().find('.todos-card-category')
      //categories below should be found
      .should('contain.text', 'video games')
      .should('contain.text', 'video games')
      //categories below should not be found
      .should('not.contain.text', 'software design')
      .should('not.contain.text', 'groceries');
  });

  it('Should change the view', () => {
    // Choose the view type "List"
    page.changeView('list');

    // We should not see any cards
    // There should be list items
    page.getTodosCards().should('not.exist');
    page.getTodosListItems().should('exist');

    // Choose the view type "Card"
    page.changeView('card');

    // There should be cards
    // We should not see any list items
    page.getTodosCards().should('exist');
    page.getTodosListItems().should('not.exist');
  });

  it('should click the view todo button on a todo and go to the right URL', () => {
    page.getTodosCards().first().then((card) => {
      const firstTodosOwner = card.find('.todos-card-owner').text();
      const firstTodosCategory = card.find('.todos-card-category').text();

      //when the view todo button on the first todo card is clicked, the url should have a valid mongo ID
      page.clickViewTodo(page.getTodosCards().first());

      //The URL should contain './todos/' and should be followed by a mongo ID
      cy.url()
        .should('contain', '/todos/')
        .should('match', /.*\/todos\/[0-9a-fA-F]{24}$/);

        //on this todo page there owner and category should be correct
        cy.get('.todos-card-owner').first().should('have.text', firstTodosOwner);
        cy.get('.todos-card-category').first().should('have.text', firstTodosCategory);
    });
  });

});
