import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Todo, User} from "../types/types";
import {map, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import * as TodoActions from "../store/actions/todo.actions";
import {AppState, getAllTodos, getTodoById} from "../store";
import {Store} from "@ngrx/store";


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos: Observable<Todo[]>;

  constructor(private store: Store<AppState>, private fireStorage: AngularFirestore) {
    this.todos = this.store.select(getAllTodos);
  }

  getStoreTodoById(id: string): Observable<Todo> {
   return this.store.select(getTodoById(id));
  }

  setTodos(todos: Observable<Todo[]>){
   // todos.subscribe(data=>this.todoList = data)
    //this.store.dispatch(new SetTodos({todos: this.todoList}))
    todos.pipe(map((todos)=>{
      const alltodos = todos.map((todo)=>this.store.dispatch(new TodoActions.CreateTodo({ todo: todo })))
      console.log(alltodos)
      return alltodos
    }))


  }

  createStoreTodo(title): void {
    let id = Math.random()
      .toString(36)
      .substring(7);
    let todo: Todo = {
      id: id.toString(),
      title: title,
      desc: "",
      date: "",
      public: false,
      userId: ""
    };
    this.store.dispatch(new TodoActions.CreateTodo({ todo: todo }));
  }

  deleteStoreTodo(todo): void {
    this.store.dispatch(new TodoActions.DeleteTodo({ todo: todo }));
  }

  createTodo(userId: string, todo: Todo, todos: Todo[]) {
    const newTodos = this.unshiftTodos(todos, todo)
    this.fireStorage.doc('users/' + userId).update({
      todos: newTodos
    })
  }

  getTodos(): Observable<any> {
    return this.fireStorage.collection('todos').valueChanges()
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

  createNewTodo(todo: Todo){
    this.fireStorage.collection('todos').add(todo).then((data)=>{
      this.fireStorage.collection('todos').doc(data.id).update({
        id: data.id
      })
    });
  }

  getAllTodos(){
    return this.fireStorage.collection('todos').valueChanges()
  }

  getTodoDetail(id: string){
    console.log(id)
    return this.fireStorage.collection('todos').doc(id)
  }

  getAllTodosOfUser(userId: string): Observable<Todo[]> {
    return this.fireStorage.collection('todos').valueChanges().pipe(
      map((data:Todo[])=>{
        return data.filter((todo: Todo)=>{
          if(todo.userId === userId) {
            return todo
          }
      })
    }))
  }

  createFullTodo(user: User, todo: Todo){
    const newTodos = this.unshiftTodos(user.todos, todo)
    this.fireStorage.collection('user').doc(user.userId).update({
      todos: newTodos
    })
  }
}
