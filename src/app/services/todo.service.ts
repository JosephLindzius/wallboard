import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Todo} from "../types/types";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private fireStorage: AngularFirestore) { }

  createTodo(userId: string, todo: Todo, todos: Todo[]) {
    const newTodos = this.unshiftTodos(todos, todo)
    this.fireStorage.doc('users/' + userId).update({
      todos: newTodos
    })
  }

  getTodos(userId){
    return this.fireStorage.doc('users/' + userId).get()
  }

  updateTodo(todo: Todo) {
    return this.fireStorage.doc('todos/' + todo.id).update(todo)
  }

  deleteTodo(userId: string, todoIndex: number, todos: Todo[]){
    this.fireStorage.doc('users/'+userId).update({
      todos: todos.filter((todo, index)=>index !== todoIndex)
    });
  }

  unshiftTodos(todos: Todo[], todo: Todo){
    todos.unshift(todo)
    return todos;
  }
}
