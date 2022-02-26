import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Todos } from '../todos';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-add-todos',
  templateUrl: './add-todos.component.html',
  styleUrls: ['./add-todos.component.scss']
})
export class AddTodosComponent implements OnInit {

  addTodosForm: FormGroup;

  todos: Todos;

  addTodosValidationMessages = {
    category:[
      {type: 'required', message: 'Category is required'},
      {type: 'minlength', message: 'Category cannot be less than 2 characters long'},
      {type: 'maxlength', message: 'Category cannot be more than 50 characters long'},
    ],
    owner: [
      {type: 'required', message: 'Owner is required'},
      {type: 'minlength', message: 'Owner cannot be less than 2 characters long'},
      {type: 'maxlength', message: 'Owner cannot be more than 50 characters long'},
    ],
    status: [
      {type: 'required', message: 'Status is required'},
      {type: 'pattern', message: 'Status must be true or false'},
    ],
    body:[
      {type: 'required', message: 'Body is required is required'},
      {type: 'minlength', message: 'Body cannot be less than 2 characters long'},
      {type: 'maxlength', message: 'Body cannot be more than 500 characters long'},
    ]
  };

  constructor(private fb: FormBuilder, private todosService: TodosService, private snackBar: MatSnackBar, private router: Router) {
  }

  createForms() {

    // add todos form validations
    this.addTodosForm = this.fb.group({
      category: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(2),
        Validators.max(50),
      ])),
      owner: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(2),
        Validators.max(50),
      ])),
      status: new FormControl('true', Validators.compose([
        Validators.required,
        Validators.pattern('^(true|false)$'),
      ])),
      body: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(2),
        Validators.max(500),
      ])),

    });

  }

  ngOnInit() {
    this.createForms();
  }


  submitForm() {
    this.todosService.addTodos(this.addTodosForm.value).subscribe(newID => {
      this.snackBar.open('Added todo for ' + this.addTodosForm.value.owner , null, {
        duration: 2000,
      });
      this.router.navigate(['/todos/', newID]);
    }, err => {
      this.snackBar.open('Failed to add the todos', 'OK', {
        duration: 5000,
      });
    });
  }

}
