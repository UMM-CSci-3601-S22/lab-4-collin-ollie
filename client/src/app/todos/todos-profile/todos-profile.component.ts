import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todos } from '../todos';
import { TodosService } from '../todos.service';

@Component({
  selector: 'app-todos-profile',
  templateUrl: './todos-profile.component.html',
  styleUrls: ['./todos-profile.component.scss']
})
export class TodosProfileComponent implements OnInit {

  todos: Todos;
  id: string;

  constructor(private route: ActivatedRoute, private todosService: TodosService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get('id');
      this.todosService.getTodosById(this.id).subscribe(todos => this.todos = todos);
    });
  }

}
