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

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onSubmit(){
    const todo: Todo = {
      id: "",
      userId: "",
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
