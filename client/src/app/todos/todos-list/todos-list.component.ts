import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo, TodoStatus, TodosSort } from '../todo';
import { TodosService } from '../todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: []
})
export class TodosListComponent implements OnInit {

  public serverFilteredTodos: Todos[];
  public filteredTodos: Todos[];

  public todosId: string;
  public todosOwner: string;
  public todosStatus: boolean;
  public todosBody: string;
  public todosCategory: string;
  public viewType: 'card' | 'list' = 'card';
  public todosLimit: number;
  public todosSort: 'Owner'| 'Body' | 'Category' | 'Status' = 'Status';
  constructor(private todosService: TodosService, private snackBar: MatSnackBar) { }

  getTodosFromServer() {
    this.todosService.getTodos({
      status: this.todosStatus, sort: this.todosSort
    }).subscribe(returnedTodos => {
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      console.error('We couldn\'t get the list of todos; the server might be down');
      this.snackBar.open(
        'Problem contacting the server – try again',
        'Ok',
        { duration: 3000});
    });
  }

  public updateFilter() {
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos, { owner: this.todosOwner, body: this.todosBody, category: this.todosCategory, limit: this.todosLimit }
    );
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

}
