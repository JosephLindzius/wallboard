import {NgModule} from "@angular/core";
import {HeaderComponent} from "./header.component";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {LogoutModule} from "../logout/logout.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    LogoutModule],
  declarations: [
    HeaderComponent
  ],
  exports: [HeaderComponent]
})
export class HeaderModule {}
