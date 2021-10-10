import { Injectable } from '@angular/core';

import {AngularFirestore, Query} from "@angular/fire/compat/firestore";
import {map} from "rxjs/operators";
import {Comment} from "../types/types";
import firebase from "firebase/compat/app";
import FieldValue = firebase.firestore.FieldValue;
import {where, query, collection, getDocs, onSnapshot} from "firebase/firestore"
import {from, Observable, of, Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private fs: AngularFirestore) { }

  getTodoComments(todoId: string): Observable<Comment[]>{
    //const commentsRef =  this.fs.collection('comments')
/*

    let comments = []
    const db = firebase.firestore()
    const commentQuery = query(collection(db, 'comments'), where("todoId", "==", todoId))
    onSnapshot(commentQuery, (snapshot)=>snapshot.forEach((_snapshot)=>comments.push(_snapshot.data())))  //this should return query and FE listens to it

    const commentsPromise = getDocs(commentQuery).then((snapshot)=>{
      snapshot.forEach((_snapshot)=>comments.push(_snapshot.data()))
      return comments
    })
    return from(commentsPromise)


    const comments = onSnapshot(commentQuery, (snapshot)=>{
      console.log(snapshot.docs.join())
      snapshot.docChanges().forEach((change)=>console.log(change.doc.data()))
    }) */
   // return of(comments);


       return this.fs.collection('comments', (ref) => ref.orderBy('creationDate')).valueChanges().pipe(
      map((commments: Comment[])=>{
        const userComments = commments.filter((comment: Comment)=>comment.todoId === todoId)
      //  userComments.sort()
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
