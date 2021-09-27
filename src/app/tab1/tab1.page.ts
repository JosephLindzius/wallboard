import {Component, OnInit, ViewChild} from '@angular/core';
import {IonReorderGroup, ModalController} from "@ionic/angular";
import {Observable} from "rxjs";
import {TodoService} from "../services/todo.service";
import {Todo, User} from "../types/types";
import {UserService} from "../services/user.service";
import {FormControl} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TodoFormComponent} from "../components/todo-form/todo-form.component";



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
  user$: Observable<User[]>
  todos$: Observable<Todo[]>

  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(
    private readonly us: UserService,
    private ts: TodoService,
    private readonly fireAuth: AngularFireAuth,
    private modalController: ModalController
  ) { }

  ngOnInit (){
    this.fireAuth.currentUser
      .then((currentUser)=>{
        this.user$ = this.us.getUser(currentUser.uid)
        this.todos$ = this.ts.getAllTodosOfUser(currentUser.uid);
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
    console.log()
    this.ts.createTodo(user.userId, this.todo.value, user.todos);
    this.newTodoForm = !this.newTodoForm;
  }

  newTodo(){
    this.newTodoForm = !this.newTodoForm;
  }

  deleteTodo(userId: string, index: number, todos: Todo[]){
    this.ts.deleteTodo(userId, index, todos)
  }

  async presentTodoFormModal(user: User, todos: Todo[]) {
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

}
