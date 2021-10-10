import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';


import { Tab3PageRoutingModule } from './tab3-routing.module';
import {HeaderComponent} from "../components/header/header.component";
import {LogoutComponent} from "../components/logout/logout.component";
import {HeaderModule} from "../components/header/header.module";
import {ImagePopoverComponent} from "../components/image-popover/image-popover.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
    HeaderModule,

  ],
  declarations: [
    Tab3Page,
    ImagePopoverComponent
    ]
})
export class Tab3PageModule {}
