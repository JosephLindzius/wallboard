import { Component } from '@angular/core';
import { Location } from '@angular/common'
import {Todo} from "../../types/types";

@Component({
  selector: 'wb-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent {

  todo: Todo = history.state.data.todo;

  constructor(private location: Location) { }

  goBack(){
    this.location.back();
  }
}
