import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {RegisterInfo, Todo, TodoUser} from "../types/types";
import {map, take, tap} from "rxjs/operators";
import UserCredential = firebase.auth.UserCredential;
import FieldValue = firebase.firestore.FieldValue;
import firebase from "firebase/compat/app";




@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly fireStorage: AngularFirestore) { }

  addUser(registerInfo: RegisterInfo, user: UserCredential){
    const newUser: TodoUser = {
      name: registerInfo.name,
      todos: [],
      userId: user.user.uid,
      email: registerInfo.email
    }
    return this.fireStorage.collection('users').doc(user.user.uid).set(newUser).then(console.log)
  }

  addGoogleUser(user: UserCredential){
    const newUser: TodoUser = {
      name: user.user.displayName,
      todos: [],
      userId: user.user.uid,
      email: user.user.email
    }
   return this.fireStorage.collection('users').doc(user.user.uid).set(newUser).catch(console.error)
  }
  //admin only
  getUsers() {
    return this.fireStorage.collection('users').snapshotChanges()


   /*   .pipe(
      map((users) => {
        let user: TodoUser;
        const mappedUser = users.map((a:any) => {
          user = a.payload.doc.data();
          user.id = a.payload.doc.id;
          return user;
        })
        return mappedUser
      })
    ); */
  }

  getUserName(uid){
    return this.fireStorage.collection('users').doc<TodoUser>(uid).valueChanges()

  }

  getUser(uid: string) {
     return this.fireStorage.collection('users').doc<TodoUser>(uid).valueChanges()
  }

  getUserDetail(id: string){
    return this.fireStorage.collection('users').doc(id).snapshotChanges();
  }

  completeTodo(todo: Todo) {
    this.fireStorage.collection('users').doc(todo.userId).update({
     completed: FieldValue.arrayUnion(todo.id)
    })
  }

  addTodo(todo: Todo){
    this.fireStorage.collection('users').doc(todo.userId).update({
      todo: FieldValue.arrayUnion(todo.id)
    })
  }

}
