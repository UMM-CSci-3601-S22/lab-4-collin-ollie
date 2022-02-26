export class TodosListPage {
  navigateTo() {
    return cy.visit('/todos');
  }

  getUrl() {
    return cy.url();
  }

  getTodosTitle() {
    return cy.get('.todos-list-title');
  }

  getTodosCards() {
    return cy.get('.todos-cards-container app-todos-card');
  }

  getTodosListItems() {
    return cy.get('.todos-nav-list .todos-list-item');
  }

  clickViewTodo(card: Cypress.Chainable<JQuery<HTMLElement>>) {
    return card.find<HTMLButtonElement>('[data-test=viewTodoButton]').click();
  }

  changeView(viewType: 'card' | 'list') {
    return cy.get(`[data-test=viewTypeRadio] .mat-radio-button[value="${viewType}"]`).click();
  }

  selectStatus(value: string) {
    return cy.get('[data-test=todosStatusSelect]').click().get(`mat-option[value="${value}"]`).click();
  }
}
