import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {RegisterInfo, Todo, TodoUser} from "../types/types";
import {map, take, tap} from "rxjs/operators";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;


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
    return this.fireStorage.collection('users').snapshotChanges().pipe(
      map((users) => {
        let user: TodoUser;
        const mappedUser = users.map((a:any) => {
          user = a.payload.doc.data();
          user.id = a.payload.doc.id;
          return user;
        })
        return mappedUser
      })
    );
  }

  getUser(uid: string) {
      return this.fireStorage.collection('users').doc<TodoUser>(uid).valueChanges()
  }
}
