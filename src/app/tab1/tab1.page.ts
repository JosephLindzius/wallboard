import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from "@ionic/angular";
import {Observable} from "rxjs";
import {TodoService} from "../services/todo.service";
import {Todo, User} from "../types/types";
import {UserService} from "../services/user.service";
import {FormControl} from "@angular/forms";
import {filter, map, switchMap, tap} from "rxjs/operators";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFirestoreDocument} from "@angular/fire/compat/firestore";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  todo = new FormControl('');
  newTodoForm: boolean = false;
  user$: Observable<User[]>

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(
    private us: UserService,
    private ts: TodoService,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit (){
    this.fireAuth.currentUser.then((currentUser)=>{
      this.user$ = this.us.getUser(currentUser.uid)
    })



  }

  doReorder(ev: CustomEvent) {
    ev.detail.complete();
    //this.ts.updateTodos(this.todos)
  }

  ngOnChanges(){
  //  this.user$ = this.us.getsUser();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

  viewTodo(todo: Todo){

  }

  editTodo(todo: Todo){

  }

  createNewTodo(user: User){
    this.ts.createTodo(user.userId, this.todo.value, user.todos);
    this.newTodoForm = !this.newTodoForm;
  }

  newTodo(){
    this.newTodoForm = !this.newTodoForm;
  }

  deleteTodo(userId: string, index: number, todos: Todo[]){
    this.ts.deleteTodo(userId, index, todos)
  }

}
