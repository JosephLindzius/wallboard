import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common'
import {Comment, Todo, TodoUser} from "../../types/types";
import {Router} from "@angular/router";
import {TodoService} from "../../services/todo.service";
import {FormControl} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {CommentService} from "../../services/comment.service";
import {Observable} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import {AngularFirestoreDocument} from "@angular/fire/compat/firestore";

@Component({
  selector: 'wb-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {

  todo!: Todo;
  public isChecked: boolean = false;
  user!: TodoUser
  comments$: Observable<Comment[]>
  comment: FormControl = new FormControl('')
  userId: string

  userName!: Observable<unknown>

  constructor(private location: Location, private router: Router, private ts: TodoService, private us: UserService, private cs: CommentService) { }

  ngOnInit(): void {
    if (history.state.data) {
      this.todo = history.state.data.todo
      if(history.state.data.user){
        this.user = history.state.data.user
      //  this.userId = history.state.data.user
      }
      this.comments$ = this.cs.getTodoComments(this.todo.id)
    }
    if(this.todo === undefined){
      this.router.navigate(['home'])
    }
  }

  deleteComment(comment: Comment){
    this.cs.deleteTodoCOmment(comment)
  }
  update(todo){
      todo.completed = true
      this.ts.updateTodo(this.todo)
        .then(()=>this.us.completeTodo(this.todo))
        .then(()=>this.router.navigate(['home']))
  }

  goBack() {
    this.location.back();
  }

  submitComment(){
    if(this.comment !== null) {
      const comment: Comment = {
        id: "",
        todoId: this.todo.id,
        userId: this.user.userId || this.userId,
        comment: this.comment.value,
        userName: this.user.name
      }
      this.cs.addTodoComment(comment);
      this.comment.reset('')
    }
  }

}
