import { Component, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Todos } from '../todos';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-profile',
  templateUrl: './todos-profile.component.html',
  styleUrls: ['./todos-profile.component.scss']
})
export class TodosProfileComponent implements OnInit, OnDestroy{

  todos: Todos;
  id: string;
  getTodosSub: Subscription;

  constructor(private route: ActivatedRoute, private todosService: TodosService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      if (this.getTodosSub) {
        this.getTodosSub.unsubscribe();
      }
      this.getTodosSub = this.todosService.getTodosById(this.id).subscribe(todos => this.todos = todos);
    });
  }

  ngOnDestroy(): void {
    if (this.getTodosSub){
      this.getTodosSub.unsubscribe();
    }
  }
}
