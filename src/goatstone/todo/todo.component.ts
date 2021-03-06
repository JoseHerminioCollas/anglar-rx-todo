import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'goatstone/todo/models/todo'
import * as todoReduce from 'goatstone/todo/reducers/todo'
import * as todoAction from 'goatstone/todo/actions/todo'
import { DialogService } from 'goatstone/todo/dialog/service'
import { InformationDialog } from 'goatstone/todo/dialog/information'
import { AddTodoDialog } from 'goatstone/todo/dialog/add-todo'

@Component({
  selector: 'goatstone-todo',
  template: `
  <todo-header
    [config]=headerConfig
    (emitOpenDialog)="openDialog($event)"
  ></todo-header>
  <todo-list
    [todos$]=todos$
    (removeTodo)="removeTodo($event)"
  ></todo-list>
`
})

export class TodoComponent {
  public todos$: Observable<Todo[]>
  public headerConfig: any = {title: 'TODO'}
  private readonly initTodo = {
    name: 'Click on the plus symbol and make some todo items.',
    description: 'Try to do this soon.',
    importanceLevel: 2
  }
  constructor (
      private store: Store<todoReduce.State>, 
      private ds: DialogService, 
    ) {
    this.todos$ = store.select(todoReduce.getTodos)
    this.openDialog('add') // TODO remove this in production
    this.makeTodo(this.initTodo)
  }
  public openDialog (which: string) {
    if(which === 'add'){
      this.ds.openDialog(AddTodoDialog)
      .subscribe((todo: Todo) => {
        if(todo) {
          this.store.dispatch({type: todoAction.ADD_TODO, payload: todo})
        }
      })
    } else if(which === 'info') {
      this.ds.openDialog(InformationDialog)
    }
  }
  public removeTodo (index: number) {
    this.store.dispatch({type: todoAction.REMOVE_TODO, payload: index})
  }
  private makeTodo (todo: Todo) {
    this.store.dispatch({type: todoAction.ADD_TODO, payload: todo})
  }
}
