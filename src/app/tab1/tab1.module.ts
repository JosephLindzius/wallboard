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

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab1PageRoutingModule,
    AngularFireAuthModule
  ],
  declarations: [
    Tab1Page,
    HeaderComponent,
    LogoutComponent
  ]
})
export class Tab1PageModule {}
