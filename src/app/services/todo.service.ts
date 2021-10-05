import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Todo, TodoUser} from "../types/types";
import {filter, map, tap} from "rxjs/operators";
import {ObjectUnsubscribedError, Observable, of} from "rxjs";
import * as TodoActions from "../store/actions/todo.actions";
import {AppState, getAllTodos, getTodoById} from "../store";
import {Store} from "@ngrx/store";
import firebase from "firebase/compat/app";
import FieldValue = firebase.firestore.FieldValue;


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

  createStoreTodo(todo: Todo, id: string): void {
    const newTodo: Todo = {
      id: id,
      title: todo.title,
      desc: todo.desc,
      date: todo.date,
      public: todo.public,
      userId: todo.userId
    };
    console.log(newTodo, 'create New Todo')
    this.store.dispatch(new TodoActions.CreateTodo({ todo: newTodo }));
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

  deleteTodo(todoId: string){
    this.fireStorage.collection('todos/').doc(todoId).delete();
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
      this.createStoreTodo(todo, data.id)
      this.fireStorage.collection('users').doc(todo.userId).update({
        todo: FieldValue.arrayUnion(todo.id)
      })
    });
  }

  editNewFunctionTodo(todo: Todo){

    this.fireStorage.collection('todos').doc(todo.id).update({
      title: todo.title,
      desc: todo.desc,
      date: todo.date,
      public: todo.public
      })
     // this.createStoreTodo(todo, data.id)
  }

  getAllTodos(){
    return this.fireStorage.collection('todos').valueChanges()
  }

  getPublicTodos(userId: string){
    return this.fireStorage.collection('todos').valueChanges().pipe(map((todos:Todo[])=>{
      return todos.filter(todo=>todo.public === true && todo.userId !== userId && !todo.completed)
    }))
  }

  getCompletedTodos(userId: string){
    return this.fireStorage.collection('todos').valueChanges().pipe(map((todos:Todo[])=>{
      return todos.filter(todo=>todo.completed === true && todo.userId === userId)
    }))
  }

  getTodoDetail(id: string){
    return this.fireStorage.collection('todos').doc(id)
  }

  getAllTodosOfUser(userId: string): Observable<Todo[]> {
    return this.fireStorage.collection('todos').valueChanges().pipe(
      map((data:Todo[])=>{
        data.sort(function(a,b) {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        return data.filter((todo: Todo)=>{
          if(todo.userId === userId) {
            return todo
          }
      })
    }))
  }

  createFullTodo(user: TodoUser, todo: Todo){
    const newTodos = this.unshiftTodos(user.todos, todo)
    this.fireStorage.collection('user').doc(user.userId).update({
      todos: newTodos
    })
  }

  updateFullTodo(user: TodoUser){
    this.fireStorage.collection('users').doc(user.userId).update({
      todos: user.todos
    })
  }

  addStar(todo: Todo, userId: string){
   this.fireStorage.collection('todos').doc(todo.id).update({
      likes: [...todo.likes, userId]
    });
  }

}
