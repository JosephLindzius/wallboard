import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'wb-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {

  constructor(private fireAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {}

  logout(){
    this.fireAuth.signOut().then(()=>this.router.navigate(['']));
  }
}
