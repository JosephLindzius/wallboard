import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Todo} from "../types/types";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private fireStorage: AngularFirestore) { }

  createTodo(todo: Todo) {
    return this.fireStorage.collection('todos').add(todo);
  }

  getTodos() {
    return this.fireStorage.collection('users').snapshotChanges().pipe(
      map((todos) => {
        let todo: Todo;
        const mappedTodos = todos.map((a:any) => {
          todo = a.payload.doc.data();
          todo.id = a.payload.doc.id;
          return todo;
        })
        console.log(mappedTodos)
        return mappedTodos
      })
    );
  }

  updateTodo(todo: Todo) {
    return this.fireStorage.doc('todos/' + todo.id).update(todo)
  }

  deleteTodo(todoId: string){
    this.fireStorage.doc('todos/' + todoId).delete()
  }
}
