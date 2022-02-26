import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormGroup, AbstractControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockTodosService } from 'src/testing/todos.service.mock';
import { AddTodosComponent } from './add-todos.component';
import { TodosService } from '../todos.service';

describe('AddTodoComponent', () => {
  let addTodosComponent: AddTodosComponent;
  let addTodosForm: FormGroup;
  let fixture: ComponentFixture<AddTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [AddTodosComponent],
      providers: [{ provide: TodosService, useValue: new MockTodosService() }]
    })
      .compileComponents().catch(error => {
        expect(error).toBeNull();
      });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTodosComponent);
    addTodosComponent = fixture.componentInstance;
    addTodosComponent.ngOnInit();
    fixture.detectChanges();
    addTodosForm = addTodosComponent.addTodosForm;
    expect(addTodosForm).toBeDefined();
    expect(addTodosForm.controls).toBeDefined();
  });

  it('should create component and form', () => {
    expect(addTodosComponent).toBeTruthy();
    expect(addTodosForm).toBeTruthy();
  });
  it('form should be invalid when empty', () => {
    expect(addTodosForm.valid).toBeFalsy();
  });
  describe('The category field', () => {
    let categoryControl: AbstractControl;
    beforeEach(() => {
      categoryControl = addTodosComponent.addTodosForm.controls.category;
    });
    it('should not allow empty categories', () => {
      categoryControl.setValue('');
      expect(categoryControl.valid).toBeFalsy();
    });

    it('should be fine with "homework"', () => {
      categoryControl.setValue('homework');
      expect(categoryControl.valid).toBeTruthy();
    });

    it('should fail on single character categories', () => {
      categoryControl.setValue('x');
      expect(categoryControl.valid).toBeFalsy();
      // Annoyingly, Angular uses lowercase 'l' here
      // when it's an upper case 'L' in `Validators.minLength(2)`.
      expect(categoryControl.hasError('minlength')).toBeTruthy();
    });
    it('should fail on really long categories', () => {
      categoryControl.setValue('x'.repeat(100));
      expect(categoryControl.valid).toBeFalsy();
      expect(categoryControl.hasError('maxlength')).toBeTruthy();
    });
  });
  describe('The owner field', () => {
    let ownerControl: AbstractControl;
    beforeEach(() => {
      ownerControl = addTodosComponent.addTodosForm.controls.owner;
    });
    it('should not allow empty owners', () => {
      ownerControl.setValue('');
      expect(ownerControl.valid).toBeFalsy();
    });

    it('should be fine with "Blanche"', () => {
      ownerControl.setValue('Blanche');
      expect(ownerControl.valid).toBeTruthy();
    });

    it('should fail on single character owners', () => {
      ownerControl.setValue('x');
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('minlength')).toBeTruthy();
    });
    it('should fail on really long owners', () => {
      ownerControl.setValue('x'.repeat(100));
      expect(ownerControl.valid).toBeFalsy();
      expect(ownerControl.hasError('maxlength')).toBeTruthy();
    });
  });
  describe('The body field', () => {
    let bodyControl: AbstractControl;
    beforeEach(() => {
      bodyControl = addTodosComponent.addTodosForm.controls.body;
    });
    it('should not allow empty bodies', () => {
      bodyControl.setValue('');
      expect(bodyControl.valid).toBeFalsy();
    });

    it('should be fine with "This is a very normal body of a todo"', () => {
      bodyControl.setValue('This is a very normal body of a todo');
      expect(bodyControl.valid).toBeTruthy();
    });

    it('should fail on single character bodys', () => {
      bodyControl.setValue('x');
      expect(bodyControl.valid).toBeFalsy();
      expect(bodyControl.hasError('minlength')).toBeTruthy();
    });
    it('should fail on really long bodys', () => {
      bodyControl.setValue('x'.repeat(1000));
      expect(bodyControl.valid).toBeFalsy();
      expect(bodyControl.hasError('maxlength')).toBeTruthy();
    });
  });
  describe('The status field', () => {
    let statusControl: AbstractControl;

    beforeEach(() => {
      statusControl = addTodosForm.controls.status;
    });

    it('should not allow empty values', () => {
      statusControl.setValue('');
      expect(statusControl.valid).toBeFalsy();
      expect(statusControl.hasError('required')).toBeTruthy();
    });

    it('should allow "true"', () => {
      statusControl.setValue('true');
      expect(statusControl.valid).toBeTruthy();
    });

    it('should allow "false"', () => {
      statusControl.setValue('false');
      expect(statusControl.valid).toBeTruthy();
    });

    it('should not allow "Supreme Overlord"', () => {
      statusControl.setValue('Supreme Overlord');
      expect(statusControl.valid).toBeFalsy();
    });
  });
});
