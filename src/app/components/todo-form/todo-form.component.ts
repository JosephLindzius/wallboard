import { Component, OnInit } from '@angular/core';
import {RegisterInfo, Todo} from "../../types/types";
import {ModalController} from "@ionic/angular";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'wb-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {

  todo = new FormControl('');
  title = new FormControl('');
  desc = new FormControl('');
  date = new FormControl()
  public = new FormControl(false)

  editTodo!: Todo

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    if(this.editTodo){
      this.title = new FormControl(this.editTodo.title);
      this.desc = new FormControl(this.editTodo.desc);
      this.date = new FormControl(this.editTodo.date)
      this.public  = new FormControl(this.editTodo.public)
    }
  }

  onSubmit(){
    const todo: Todo = {
      id: "" || this.editTodo.id,
      userId: "" || this.editTodo.userId,
      title: this.title.value,
      desc: this.desc.value,
      date: this.date.value,
      public: this.public.value
    }
    this.modalController.dismiss(todo);
  }

  dismissModal(){
    this.modalController.dismiss();
  }
}
