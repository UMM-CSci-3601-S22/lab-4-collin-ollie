import { Todos } from 'src/app/todos/todos';
import { AddTodosPage} from '../support/add-todos.po';


describe('Add Todo',() =>{
  const page = new AddTodosPage();
  beforeEach(()=> {
    page.navigateTo();
  });
  it('should have the correct title', () => {
    page.getTitle().should('have.text', 'New Todos');
  });
  it('Should enable and disable the add todo button', () => {
    page.addTodosButton().should('be.disabled');
    page.getFormField('owner').type('test');
    page.addTodosButton().should('be.disabled');
    page.getFormField('body').type('yadda yadda yadda');
    page.addTodosButton().should('be.disabled');
    page.getFormField('category').type('yadda yadda category yadda');
    // all the required fields have valid input, then it should be enabled
    page.addTodosButton().should('be.enabled');
  });
  it('Should show error messages for invalid inputs', () => {
    cy.get('[data-test=ownerError]').should('not.exist');
    page.getFormField('owner').click().blur();
    cy.get('[data-test=ownerError]').should('exist').and('be.visible');
    page.getFormField('owner').clear().type('o').blur();
    cy.get('[data-test=ownerError]').should('exist').and('be.visible');
    page.getFormField('owner').clear().type('This is a very long owner name that goes way beyond the 50 character limit ').blur();
    cy.get('[data-test=ownerError]').should('exist').and('be.visible');
    page.getFormField('owner').clear().type('Johhny').blur();
    cy.get('[data-test=ownerError]').should('not.exist');


    cy.get('[data-test=bodyError]').should('not.exist');
    page.getFormField('body').click().blur();
    cy.get('[data-test=bodyError]').should('exist').and('be.visible');
    page.getFormField('body').clear().type('o').blur();
    cy.get('[data-test=bodyError]').should('exist').and('be.visible');
    page.getFormField('body').clear().type('This is a very long body that goes way beyond the 500 character limit and even further+\
    yabba dabbammmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm+\
    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm+\
    mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm+\
    mmmmmafyilgwaeil        wgbuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuufiliw').blur();
    cy.get('[data-test=bodyError]').should('exist').and('be.visible');
    page.getFormField('body').clear().type('Normal, healthy body').blur();
    cy.get('[data-test=bodyError]').should('not.exist');

    cy.get('[data-test=categoryError]').should('not.exist');
    page.getFormField('category').click().blur();
    cy.get('[data-test=categoryError]').should('exist').and('be.visible');
    page.getFormField('category').clear().type('o').blur();
    cy.get('[data-test=categoryError]').should('exist').and('be.visible');
    page.getFormField('category').clear().type('This is a very long category that goes way beyond the 50 character limit').blur();
    cy.get('[data-test=categoryError]').should('exist').and('be.visible');
    page.getFormField('category').clear().type('homework').blur();
    cy.get('[data-test=categoryError]').should('not.exist');
  });
  describe('Adding a new todo', () => {

    beforeEach(() => {
      cy.task('seed:database');
    });

    it('Should go to the right page, and have the right info', () => {
      const todo: Todos = {
        _id: null,
        owner: 'test owner',
        body: 'test body',
        category: 'test category',
        status: true
      };
      page.addTodos(todo);
      cy.url()
        .should('match', /\/todos\/[0-9a-fA-F]{24}$/)
        .should('not.match', /\/todos\/new$/);

      cy.get('.todos-card-owner').should('have.text',todo.owner );
      cy.get('.todos-card-body').should('have.text', todo.body);
      cy.get('.todos-card-category').should('have.text', todo.category );
      cy.get('.todos-card-status').should('have.text', 'Complete');

      cy.get('.mat-simple-snackbar').should('contain', 'Added todo for ' + todo.owner);

      cy.url()
      .should('match', /\/todos\/[0-9a-fA-F]{24}$/)
      .should('not.match', /\/todos\/new$/);

    cy.get('.todos-card-owner').should('have.text',todo.owner );
    cy.get('.todos-card-body').should('have.text', todo.body);
    cy.get('.todos-card-category').should('have.text', todo.category );
    cy.get('.todos-card-status').should('have.text', 'Complete');
    });
  });
});
