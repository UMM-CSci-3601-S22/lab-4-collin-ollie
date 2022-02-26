import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todos, TodosStatus } from '../app/todos/todos';
import { TodosService } from '../app/todos/todos.service';

/**
 * A "mock" version of the `UserService` that can be used to test components
 * without having to create an actual service.
 */
// It needs to be `Injectable` since that's how services are typically
// provided to components.
@Injectable()
export class MockTodosService extends TodosService {
  static testTodos: Todos[] = [
    {
      _id: '58895985a22c04e761776d54',
      owner: 'Blanche',
      status: false,
      body: 'In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.',
      category: 'software design'
    },
    {
      _id: '58895985c1849992336c219b',
      owner: 'Fry',
      status: false,
      body: 'Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.',
      category: 'video games'
    },
    {
      _id: '58895985ae3b752b124e7663',
      owner: 'Fry',
      status: true,
      body: 'Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.',
      category: 'homework'
    },
    {
      _id: '5889598555fbbad472586a56',
      owner: 'Blanche',
      status: true,
      body: 'Aliqua esse aliqua veniam id nisi ea. Ullamco Lorem ex aliqua aliquip cupidatat incididunt reprehenderit' +
      ' voluptate ad nisi elit dolore laboris.',
      category: 'groceries'
    },
    {
      _id: '588959856f0b82ee93cd93eb',
      owner: 'Barry',
      status: true,
      body: 'Nisi sit non non sunt veniam pariatur. Elit reprehenderit aliqua consectetur est dolor officia et adipisicing ' +
       'elit officia nisi elit enim nisi.',
      category: 'video games'
    }
  ];

  constructor() {
    super(null);
  }

  getTodos(filters: { status?: TodosStatus; owner?: string; body?: string; category?: string }): Observable<Todos[]> {
    // Our goal here isn't to test (and thus rewrite) the service, so we'll
    // keep it simple and just return the test users regardless of what
    // filters are passed in.
    //
    // The `of()` function converts a regular object or value into an
    // `Observable` of that object or value.
    return of(MockTodosService.testTodos);
  }

  getTodosById(id: string): Observable<Todos> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockTodosService.testTodos[0]._id) {
      return of(MockTodosService.testTodos[0]);
    } else {
      return of(null);
    }
  }

}
