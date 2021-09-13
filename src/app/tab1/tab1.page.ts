import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup} from "@ionic/angular";
import {Observable} from "rxjs";
import {TodoService} from "../services/todo.service";
import {Todo} from "../types/types";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {


  todos$!: Observable<Todo[]>
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(private ts: TodoService) { }

  ngOnInit (){
    this.todos$ = this.ts.getTodos();
  }


  doReorder(ev: CustomEvent) {
    ev.detail.complete();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }

}
