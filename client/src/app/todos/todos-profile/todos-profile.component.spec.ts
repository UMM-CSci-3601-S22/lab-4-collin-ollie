import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRouteStub } from '../../../testing/activated-route-stub';
import { MockTodosService } from 'src/testing/todos.service.mock';
import { Todos } from '../todos';
import { TodosCardComponent } from '../todos-card/todos-card.component';
import { TodosProfileComponent } from '../todos-profile/todos-profile.component';
import { TodosService } from '../todos.service';

describe('TodosProfileComponent', () => {
  let component: TodosProfileComponent;
  let fixture: ComponentFixture<TodosProfileComponent>;
  const activatedRoute: ActivatedRouteStub = new ActivatedRouteStub();

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatCardModule
      ],
      declarations: [TodosProfileComponent, TodosCardComponent],
      providers: [
        { provide: TodosService, useValue: new MockTodosService() },
        { provide: ActivatedRoute, useValue: activatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a specific todo profile', () => {
    const expectedTodo: Todos = MockTodosService.testTodos[0];
    activatedRoute.setParamMap({ id: expectedTodo._id});

    expect(component.id).toEqual(expectedTodo._id);
    expect(component.todos).toEqual(expectedTodo);
  });

  it('should navigate to correct todo when id Parameter changes', () => {
    let expectedTodo: Todos = MockTodosService.testTodos[0];
    activatedRoute.setParamMap({ id: expectedTodo._id});
    expect(component.id).toEqual(expectedTodo._id);
    expectedTodo = MockTodosService.testTodos[1];
    activatedRoute.setParamMap({ id: expectedTodo._id});
    expect(component.id).toEqual(expectedTodo._id);
  });

  it('should have `null` for the todo for a bad ID', () => {
    activatedRoute.setParamMap({ id: 'badID'});
    expect(component.id).toEqual('badID');
    expect(component.todos).toBeNull();
  });
});
