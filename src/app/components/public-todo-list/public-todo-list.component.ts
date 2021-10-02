import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Observable} from "rxjs";
import {Todo} from "../../types/types";
import {AngularFireAuth} from "@angular/fire/compat/auth";

@Component({
  selector: 'wb-public-todo-list',
  templateUrl: './public-todo-list.component.html',
  styleUrls: ['./public-todo-list.component.scss'],
})
export class PublicTodoListComponent implements OnInit {

  public todos$: Observable<any>
  private userId: string

  constructor(private ts: TodoService,  private readonly fireAuth: AngularFireAuth,) { }

  ngOnInit() {
    this.fireAuth.currentUser.then((currentUser)=>{
      this.todos$ = this.ts.getPublicTodos(currentUser.uid);
      this.userId = currentUser.uid
    })

  }

  giveStar(todo: Todo){
    this.ts.addStar(todo, this.userId)
  }

}
