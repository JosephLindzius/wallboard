import {NgModule} from "@angular/core";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {LogoutComponent} from "./logout.component";

@NgModule({
  imports: [
    IonicModule,
    CommonModule],
  declarations: [
    LogoutComponent
  ],
  exports: [LogoutComponent]
})
export class LogoutModule {}
