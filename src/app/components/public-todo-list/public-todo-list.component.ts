import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Observable} from "rxjs";
import {Todo, TodoUser} from "../../types/types";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ModalController} from "@ionic/angular";
import {UserService} from "../../services/user.service";
import {map, switchMap} from "rxjs/operators";


@Component({
  selector: 'wb-public-todo-list',
  templateUrl: './public-todo-list.component.html',
  styleUrls: ['./public-todo-list.component.scss'],
})
export class PublicTodoListComponent implements OnInit {

  public todos$: Observable<Todo[]>
  private userId: string


  constructor(private us: UserService, private ts: TodoService,
              private readonly fireAuth: AngularFireAuth,
              private modalController: ModalController) { }

  ngOnInit() {
    this.fireAuth.currentUser.then((currentUser)=>{
      this.todos$ = this.ts.getPublicTodos(currentUser.uid);
      this.userId = currentUser.uid
    })
  }

  giveStar(todo: Todo){
    this.ts.addStar(todo, this.userId)
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  goToTodo(todo: Todo){
    this.modalController.dismiss(todo, this.userId);
  }
}
