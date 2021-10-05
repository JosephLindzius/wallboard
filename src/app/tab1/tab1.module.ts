import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab1Page } from './tab1.page';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import {HeaderComponent} from "../components/header/header.component";
import {LogoutComponent} from "../components/logout/logout.component";
import {FirebaseAuthentication} from "@ionic-native/firebase-authentication";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {TodoFormComponent} from "../components/todo-form/todo-form.component";
import {TodoDetailComponent} from "../components/todo-detail/todo-detail.component";
import {HeaderModule} from "../components/header/header.module";
import {PublicTodoListComponent} from "../components/public-todo-list/public-todo-list.component";
import {CompletedTodoListComponent} from "../components/completed-todo-list/completed-todo-list.component";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    AngularFireAuthModule,
    HeaderModule
  ],
  declarations: [
    Tab1Page,
    TodoFormComponent,
    TodoDetailComponent,
    PublicTodoListComponent,
    CompletedTodoListComponent
  ]
})
export class Tab1PageModule {}
