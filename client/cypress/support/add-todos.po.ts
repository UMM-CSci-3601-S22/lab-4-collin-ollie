import { Todos } from 'src/app/todos/todos';

export class AddTodosPage {
  navigateTo() {
    return cy.visit('/todos/new');
  }

  getTitle() {
    return cy.get('.add-todos-title');
  }

  addTodosButton() {
    return cy.get('[data-test=confirmAddTodosButton]');
  }

  selectMatSelectValue(select: Cypress.Chainable, value: string) {
    return select.click()
      .get(`mat-option[value="${value}"]`).click();
  }

  getFormField(fieldName: string) {
    return cy.get(`mat-form-field [formcontrolname=${fieldName}]`);
  }

  addTodos(newTodo: Todos) {
    this.getFormField('owner').type(newTodo.owner);
    this.getFormField('body').type(newTodo.body);
    this.getFormField('category').type(newTodo.category);
    if(newTodo.status) {
      this.selectMatSelectValue(this.getFormField('status'), 'true');
    }
    if(!newTodo.status) {
      this.selectMatSelectValue(this.getFormField('status'), 'false');
    }
    return this.addTodosButton().click();
  }

}
