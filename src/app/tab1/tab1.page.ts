import {Component, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup, ModalController} from "@ionic/angular";
import {Observable} from "rxjs";
import {TodoService} from "../services/todo.service";
import {Todo, TodoUser} from "../types/types";
import {UserService} from "../services/user.service";
import {FormControl} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TodoFormComponent} from "../components/todo-form/todo-form.component";
import {map} from "rxjs/operators";
import {PublicTodoListComponent} from "../components/public-todo-list/public-todo-list.component";



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  todo = new FormControl('');
  title = new FormControl('');
  desc = new FormControl('');
  date = new FormControl()
  newTodoInfo: Todo;
  newTodoForm: boolean = false;
  user$: Observable<TodoUser>
  todos$: Observable<Todo[]>
  currentDate!: number

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(
    private readonly us: UserService,
    private ts: TodoService,
    private readonly fireAuth: AngularFireAuth,
    private modalController: ModalController
  ) { }

  ngOnInit (){
    this.currentDate = Date.now();
    console.log(this.currentDate)
    this.fireAuth.currentUser
      .then((currentUser)=>{
        this.user$ = this.us.getUser(currentUser.uid)
        this.todos$ = this.ts.getAllTodosOfUser(currentUser.uid);

      })

  }

  doReorder(ev: Event) {
    (ev as CustomEvent).detail.complete();
  }

  ngOnChanges(){
  }

  toggleReorderGroup(user) {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
    if(this.reorderGroup.disabled){
      this.ts.updateFullTodo(user)
    }
  }

  viewTodo(todo: Todo){

  }

  editTodo(todo: Todo){

  }

  createNewTodo(user: TodoUser){
    this.ts.createTodo(user.userId, this.todo.value, user.todos);
    this.newTodoForm = !this.newTodoForm;
  }

  newTodo(){
    this.newTodoForm = !this.newTodoForm;
  }

  deleteTodo(userId: string, index: number, todos: Todo[]){
    this.ts.deleteTodo(userId, index, todos)
  }

  async presentTodoFormModal(user: TodoUser) {
    const modal = await this.modalController.create({
      component: TodoFormComponent,
      componentProps: {newTodoInfo: this.newTodoInfo},
      cssClass: 'wallboard-register'
    });

    modal.onDidDismiss()
      .then((data) => {
        const todo: Todo = {
          id: '',
          userId: user.userId,
          title: data.data.title,
          desc: data.data.desc,
          date: data.data.date,
          public: data.data.public
        }
          this.ts.createNewTodo(todo)

      //  this.ts.createFullTodo(user, todo)
      })
    return await modal.present();
  }

  async presentEditTodoFormModal(user: TodoUser, editTodo: Todo) {
    const modal = await this.modalController.create({
      component: TodoFormComponent,
      componentProps: {newTodoInfo: this.newTodoInfo, editTodo},
      cssClass: 'wallboard-register'
    });

    modal.onDidDismiss()
      .then((data) => {
        const todo: Todo = {
          id: '',
          userId: user.userId,
          title: data.data.title,
          desc: data.data.desc,
          date: data.data.date,
          public: data.data.public
        }
          this.ts.createNewTodo(todo)

      //  this.ts.createFullTodo(user, todo)
      })
    return await modal.present();
  }

  async presentPublicTodoFormModal(user: TodoUser) {
    const modal = await this.modalController.create({
      component: PublicTodoListComponent,
      componentProps: {user: this.user$},
      cssClass: 'wallboard-public-todo'
    });

    modal.onDidDismiss()
      .then((data) => {
    /*    const todo: Todo = {
          id: '',
          userId: user.userId,
          title: data.data.title,
          desc: data.data.desc,
          date: data.data.date,
          public: data.data.public
        }
          this.ts.createNewTodo(todo)

      //  this.ts.createFullTodo(user, todo) */
      })
    return await modal.present();
  }

}
