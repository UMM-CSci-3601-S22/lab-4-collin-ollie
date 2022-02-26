import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodosCardComponent } from './todos-card.component';
import { MatCardModule } from '@angular/material/card';

describe('TodosCardComponent', () => {
  let component: TodosCardComponent;
  let fixture: ComponentFixture<TodosCardComponent>;

  beforeEach(waitForAsync (() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatCardModule
      ],
      declarations: [ TodosCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosCardComponent);
    component = fixture.componentInstance;
    component.todos = {
      _id: 'sally_id',
      owner: 'Sally',
      status: false,
      category: 'groceries',
      body: 'Sallys body of her todo'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
