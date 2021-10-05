import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Todo, TodoUser} from "../../types/types";
import {UserService} from "../../services/user.service";
import {TodoService} from "../../services/todo.service";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {ModalController} from "@ionic/angular";
import {Router} from "@angular/router";

@Component({
  selector: 'wb-completed-todo-list',
  templateUrl: './completed-todo-list.component.html',
  styleUrls: ['./completed-todo-list.component.scss'],
})
export class CompletedTodoListComponent implements OnInit {

  todos$: Observable<Todo[]>
  private user!: TodoUser


  constructor(private ts: TodoService, private modalController: ModalController, private router: Router) { }

  ngOnInit() {
      this.todos$ = this.ts.getCompletedTodos(this.user.userId)
  }

  dismissModal(){
    this.modalController.dismiss();
  }

  goToTodo(todo: Todo){
    this.modalController.dismiss(todo);
  }

}
