import { TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockTodosService } from 'src/testing/todos.service.mock';
import { Todos } from '../todos';
import { TodosCardComponent } from '../todos-card/todos-card.component';
import { TodosService } from '../todos.service';
import { TodosListComponent } from './todos-list.component';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  MatIconModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

let todosList: TodosListComponent;

async function constructTodosList() {
  await TestBed.compileComponents();
  const fixture = TestBed.createComponent(TodosListComponent);
  todosList = fixture.componentInstance;
  fixture.detectChanges();
}

describe('TodosListComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [ TodosListComponent, TodosCardComponent ],
      providers: [{ provide: TodosService, useValue: new MockTodosService() }]
    });
  });

  beforeEach(waitForAsync(constructTodosList));

  it('contains all the todos', () => {
    expect(todosList.serverFilteredTodos.length).toBe(5);
  });

  it('contains a todo with owner "Barry"', () => {
    expect(todosList.serverFilteredTodos.some((todo: Todos) => todo.owner === 'Barry')).toBe(true);
  });

  it('doesn\'t contains a todo with owner "Workman"', () =>{
    expect(todosList.serverFilteredTodos.some((todo: Todos) => todo.owner === 'Workman')).toBe(false);
  });

  it('contains a complete todo items', () => {
    expect(todosList.serverFilteredTodos.some((todo: Todos) => todo.status)).toBe(true);
  });
});

describe('Misbehaving Todo List', () => {
  let todosServiceStub: {
    getTodos: () => Observable<Todos[]>;
    getTodosFiltered: () => Observable<Todos[]>;
  };

  beforeEach(() => {
    todosServiceStub = {
      getTodos: () => new Observable(observer => {
        observer.error('getTodos() observer generates an error');
      }),
      getTodosFiltered: () => new Observable(observer => {
        observer.error('getTodosFiltered() observer generates and error');
      })
    };

    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      providers: [{ provide: TodosService, useValue: todosServiceStub }]
    });
  });

  beforeEach(waitForAsync(constructTodosList));

  it('fails to load todos if we do not set up a TodosListService', () => {
    expect(todosList.serverFilteredTodos).toBeUndefined();
  });
});
