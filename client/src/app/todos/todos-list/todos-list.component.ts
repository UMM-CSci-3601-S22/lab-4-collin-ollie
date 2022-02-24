import { Component,OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Todos, TodosStatus, TodosSort } from '../todos';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss'],
  providers: []
})
export class TodosListComponent implements OnInit, OnDestroy {

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
  getTodosSub: Subscription;


  constructor(private todosService: TodosService, private snackBar: MatSnackBar) { }

  getTodosFromServer() {
    this.unsub();
    this.getTodosSub = this.todosService.getTodos({
      status: this.todosStatus
    })
    .subscribe(returnedTodos => {
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

  public updateFilter(): void {
    this.filteredTodos = this.todosService.filterTodos(
      this.serverFilteredTodos, { owner: this.todosOwner, body: this.todosBody, category: this.todosCategory, limit: this.todosLimit }
    );
  }

  ngOnInit(): void {
    this.getTodosFromServer();
  }

  ngOnDestroy(): void {
      this.unsub();
  }

  unsub(): void {
    if (this.getTodosSub) {
      this.getTodosSub.unsubscribe();
    }
  }

}
