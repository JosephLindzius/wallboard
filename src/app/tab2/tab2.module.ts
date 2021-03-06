import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';


import { Tab2PageRoutingModule } from './tab2-routing.module';
import {HeaderComponent} from "../components/header/header.component";
import {LogoutComponent} from "../components/logout/logout.component";
import {HeaderModule} from "../components/header/header.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    HeaderModule
  ],
  declarations: [
    Tab2Page
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab2PageModule {}
