import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common'
import {TodoService} from "../../services/todo.service";
import {Observable} from "rxjs";
import {Todo} from "../../types/types";
import {ActivatedRoute} from "@angular/router";


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
