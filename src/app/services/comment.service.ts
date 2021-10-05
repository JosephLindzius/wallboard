import { Injectable } from '@angular/core';

import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Comment} from "../types/types";
import firebase from "firebase/compat/app";
import FieldValue = firebase.firestore.FieldValue;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private fs: AngularFirestore) { }

  getTodoComments(postId: string){
    return this.fs.collection('comments', (ref) => ref.orderBy('creationDate')).valueChanges().pipe(
      map((commments: Comment[])=>{
        const userComments = commments.filter((comment: Comment)=>comment.todoId === postId)
        userComments.sort()
        return userComments
      })
    )
  }

  addTodoComment(comment: Comment){
    this.fs.collection('comments').add(comment).then((data)=>data.update({
      id: data.id,
      creationDate: FieldValue.serverTimestamp()
    }))
  }

  deleteTodoCOmment(comment: Comment) {
    this.fs.collection('comments').doc(comment.id).delete();
  }
}
