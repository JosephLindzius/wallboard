import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Observable} from "rxjs";
import {TodoService} from "../services/todo.service";
import {Todo, TodoUser} from "../types/types";
import {UserService} from "../services/user.service";
import {FormControl} from "@angular/forms";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {TodoFormComponent} from "../components/todo-form/todo-form.component";
import {PublicTodoListComponent} from "../components/public-todo-list/public-todo-list.component";
import {CompletedTodoListComponent} from "../components/completed-todo-list/completed-todo-list.component";
import {Router} from "@angular/router";



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

  constructor(
    private readonly us: UserService,
    private ts: TodoService,
    private readonly fireAuth: AngularFireAuth,
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit (){
    this.currentDate = Date.now();
    this.fireAuth.currentUser
      .then((currentUser)=>{
        this.user$ = this.us.getUser(currentUser.uid)
        this.todos$ = this.ts.getAllTodosOfUser(currentUser.uid);
      })
  }

  createNewTodo(user: TodoUser){
    this.ts.createTodo(user.userId, this.todo.value, user.todos);
    this.newTodoForm = !this.newTodoForm;
  }

  newTodo(){
    this.newTodoForm = !this.newTodoForm;
  }

  deleteTodo(todoId: string){
    this.ts.deleteTodo(todoId)
  }

  setColor(number: number){
    if(number <= 0) {
      return 'none'
    } else if (number > 0 && number <= 10) {
      return 'danger'
    } else if (number > 10 && number <= 20) {
      return 'warning'
    } else if (number > 20) {
      return 'secondary'
    }
    return ''
  }

  getDueDateColor(todoDate: string){
    const endTime = new Date(todoDate).getTime()
    const nowTime = new Date().getTime();
    const timeLeft = endTime - nowTime

    const endDate = new Date(todoDate).getDate()
    const nowDate = new Date().getDate();
    let daysLeft =  endDate - nowDate

    if(timeLeft < 0){
      return 'danger'
    }
    if(daysLeft < 1){
      return 'danger'
    }if(daysLeft >= 1 && daysLeft <= 5){
      return 'warning'
    }
    if(daysLeft > 5 && daysLeft <= 10){
      return 'secondary'
    }
    return 'primary'
  }


  goToDetail(todo: Todo, user: TodoUser){
    this.router.navigate(['tabs/tab1/todo-detail/', todo.id], {state: {data: {todo: todo, user: user}}})
  }

  async presentTodoFormModal(user: TodoUser) {
    const modal = await this.modalController.create({
      component: TodoFormComponent,
      componentProps: {newTodoInfo: this.newTodoInfo},
      cssClass: 'wallboard-register'
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data.data){
          const todo: Todo = {
            id: '',
            userId: user.userId,
            title: data.data.title,
            desc: data.data.desc,
            date: data.data.date,
            public: data.data.public,
            likes: data.data.likes
          }
          this.ts.createNewTodo(todo)
        }
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
          id: data.data.id,
          userId: user.userId,
          title: data.data.title,
          desc: data.data.desc,
          date: data.data.date,
          likes: data.data.public,
          public: data.data.public
        }
          this.ts.editNewFunctionTodo(todo)

      //  this.ts.createFullTodo(user, todo)
      })
    return await modal.present();
  }

  async presentPublicTodoFormModal(user: TodoUser) {
    const modal = await this.modalController.create({
      component: PublicTodoListComponent,
      componentProps: {user: user},
      cssClass: 'wallboard-public-todo'
    });

    modal.onDidDismiss()
      .then((data) => {
          if(data.data){
            this.router.navigate(['tabs/tab1/todo-detail/', data.data.id], {state: {data: {todo: data.data, user: user}}})
          }
      })
    return await modal.present();
  }

  async presentCompletedTodos(user: TodoUser) {
    const modal = await this.modalController.create({
      component: CompletedTodoListComponent,
      componentProps: {user: user},
      cssClass: 'wallboard-public-todo'
    });

    modal.onDidDismiss()
      .then((data) => {
        this.router.navigate(['tabs/tab1/todo-detail/', data.data.id], {state: {data: {todo: data.data, user: user}}})
      })
    return await modal.present();
  }

}
