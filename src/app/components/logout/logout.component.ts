import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";

@Component({
  selector: 'wb-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private fireAuth: AngularFireAuth) { }

  ngOnInit() {}

  logout(){
    this.fireAuth.signOut().then(()=>window.location.reload());
  }
}
