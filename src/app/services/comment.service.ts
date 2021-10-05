import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Comment} from "../types/types";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private fs: AngularFirestore) { }

  getTodoComments(postId: string){
    return this.fs.collection('comments').valueChanges().pipe(
      map((commmets: Comment[])=>{
        return commmets.filter((comment: Comment)=>comment.todoId === postId)
      })
    )
  }

  addTodoComment(comment: Comment){
    this.fs.collection('comments').add(comment).then((data)=>data.update({
      id: data.id
    }))
  }

  deleteTodoCOmment(comment: Comment) {
    this.fs.collection('comments').doc(comment.id).delete();
  }
}
