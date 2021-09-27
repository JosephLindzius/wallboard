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


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    AngularFireAuthModule,
  ],
  declarations: [
    Tab1Page,
    HeaderComponent,
    LogoutComponent,
    TodoFormComponent,
    TodoDetailComponent
  ]
})
export class Tab1PageModule {}
